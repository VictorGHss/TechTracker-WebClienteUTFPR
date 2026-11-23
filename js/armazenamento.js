/**
 * armazenamento.js — TechTrack
 *
 * Responsabilidades:
 *   - Ler dados do localStorage (carregarDados).
 *   - Gravar dados no localStorage (salvarDados).
 *   - Converter entre objetos JavaScript e JSON.
 *   - Tratar erros de leitura, escrita e estrutura inválida.
 *
 * Carregado APÓS dados.js e funcoes.js, pois depende de:
 *   - TechTrack.CHAVE_ARMAZENAMENTO
 *   - TechTrack.criarEstruturaInicial()
 *   - TechTrack.validarEstrutura()
 *   - TechTrack.obterDataHoraAtual()
 *
 * Relacionado às aulas: 9.1 e 9.2 (JSON e Web Storage).
 *
 * POR QUE NÃO USAMOS async/await AQUI?
 * O localStorage é síncrono: getItem e setItem executam imediatamente
 * e retornam o resultado na mesma linha. Não há operação de rede nem
 * leitura de arquivo — tudo acontece na memória do navegador. Por isso,
 * não há necessidade de Promises ou async/await. O uso de async/await
 * será demonstrado futuramente na leitura de arquivos para o backup,
 * onde a operação é genuinamente assíncrona.
 *
 * POR QUE LEITURA E ESCRITA SÃO VERIFICADAS SEPARADAMENTE?
 * Um localStorage cheio impede novas gravações (setItem lança
 * QuotaExceededError), mas os dados já armazenados continuam
 * acessíveis via getItem. Se a verificação de disponibilidade
 * tentasse escrever antes de ler, bloquearia a leitura mesmo quando
 * ela ainda é possível. Por isso, carregarDados() testa apenas o
 * acesso de leitura, e salvarDados() lida diretamente com os erros
 * de escrita no momento em que eles ocorrem.
 */

window.TechTrack = window.TechTrack || {};

// ─────────────────────────────────────────────
// Leitura
// ─────────────────────────────────────────────

/**
 * Carrega os dados do localStorage e os retorna como objeto JavaScript.
 *
 * Fluxo de execução:
 *   1. Tenta acessar window.localStorage — detecta indisponibilidade
 *      (SecurityError em iframes restritos, TypeError em ambientes sem
 *      Web Storage) sem realizar nenhuma escrita.
 *   2. Busca o conteúdo da chave "techtrack:data:v1" via getItem.
 *   3. Se não existir conteúdo, cria a estrutura inicial e tenta salvá-la.
 *      Se a gravação inicial falhar (storage cheio), retorna a estrutura
 *      em memória e propaga o aviso.
 *   4. Converte o texto JSON em objeto com JSON.parse.
 *   5. Valida a estrutura recuperada.
 *   6. Retorna o objeto pronto para uso.
 *
 * Em caso de erro, lança um objeto com:
 *   { tipo, mensagem, conteudoOriginal }
 * para que o código chamador possa informar o usuário
 * sem apagar os dados acidentalmente.
 *
 * @returns {object} Dados completos do sistema.
 * @throws {object} Descrição do erro encontrado.
 */
TechTrack.carregarDados = function () {
    // 1. Verificar acesso ao localStorage sem realizar nenhuma escrita.
    //    Apenas acessar a propriedade window.localStorage já lança
    //    SecurityError quando o contexto proíbe Web Storage.
    var storage = null;
    try {
        storage = window.localStorage;
        if (!storage) {
            throw new TypeError("window.localStorage não existe neste ambiente.");
        }
    } catch (erroAcesso) {
        throw {
            tipo: "localStorage_indisponivel",
            mensagem: "Não foi possível acessar o localStorage. " +
                      "Verifique se o navegador suporta Web Storage e se não está em um contexto restrito. " +
                      "Detalhe: " + erroAcesso.message,
            conteudoOriginal: null
        };
    }

    // 2. Buscar o conteúdo salvo via getItem.
    //    Erros aqui indicam problema de leitura, não de escrita.
    var conteudoTexto = null;
    try {
        conteudoTexto = storage.getItem(TechTrack.CHAVE_ARMAZENAMENTO);
    } catch (erroLeitura) {
        throw {
            tipo: "erro_leitura",
            mensagem: "Não foi possível ler os dados do localStorage. Detalhe: " + erroLeitura.message,
            conteudoOriginal: null
        };
    }

    // 3. Se não existir nenhum conteúdo, inicializar com estrutura vazia.
    //    A tentativa de gravação pode falhar se o storage estiver cheio;
    //    nesse caso, a estrutura inicial é retornada mesmo assim (em memória),
    //    e o erro de gravação é propagado para o chamador.
    if (conteudoTexto === null || conteudoTexto === undefined || conteudoTexto === "") {
        var estruturaInicial = TechTrack.criarEstruturaInicial();
        TechTrack.salvarDados(estruturaInicial); // pode lançar erro de escrita
        return estruturaInicial;
    }

    // 4. Converter o texto JSON em objeto JavaScript.
    var objeto = null;
    try {
        objeto = JSON.parse(conteudoTexto);
    } catch (erroJson) {
        // JSON corrompido: informa o problema sem sobrescrever os dados.
        throw {
            tipo: "json_invalido",
            mensagem: "O conteúdo salvo no localStorage não é um JSON válido e não pode ser lido. " +
                      "Os dados originais foram PRESERVADOS. Detalhe técnico: " + erroJson.message,
            conteudoOriginal: conteudoTexto
        };
    }

    // 5. Validar a estrutura recuperada.
    var resultado = TechTrack.validarEstrutura(objeto);
    if (!resultado.valido) {
        throw {
            tipo: "estrutura_invalida",
            mensagem: "Os dados recuperados do localStorage têm uma estrutura incompatível com esta versão do sistema. " +
                      "Os dados originais foram PRESERVADOS. Motivo: " + resultado.erro,
            conteudoOriginal: conteudoTexto
        };
    }

    // 6. Retornar o objeto validado.
    return objeto;
};

// ─────────────────────────────────────────────
// Gravação
// ─────────────────────────────────────────────

/**
 * Valida e salva o objeto de dados no localStorage.
 *
 * Fluxo de execução:
 *   1. Tenta acessar window.localStorage.
 *   2. Valida a estrutura do objeto recebido.
 *   3. Atualiza o campo atualizadoEm com o momento atual.
 *   4. Converte o objeto para texto JSON com JSON.stringify.
 *   5. Tenta salvar via setItem — identifica QuotaExceededError
 *      pelos campos name e code do erro, sem inspecionar a mensagem.
 *   6. Retorna o objeto salvo.
 *
 * @param {object} dados - Objeto completo com a estrutura do sistema.
 * @returns {object} O objeto salvo (com atualizadoEm atualizado).
 * @throws {object} Descrição do erro encontrado.
 */
TechTrack.salvarDados = function (dados) {
    // 1. Verificar acesso ao localStorage sem escrita prévia.
    var storage = null;
    try {
        storage = window.localStorage;
        if (!storage) {
            throw new TypeError("window.localStorage não existe neste ambiente.");
        }
    } catch (erroAcesso) {
        throw {
            tipo: "localStorage_indisponivel",
            mensagem: "Não foi possível acessar o localStorage para gravação. Detalhe: " + erroAcesso.message,
            conteudoOriginal: null
        };
    }

    // 2. Validar a estrutura antes de qualquer alteração.
    var resultado = TechTrack.validarEstrutura(dados);
    if (!resultado.valido) {
        throw {
            tipo: "estrutura_invalida",
            mensagem: "Não é possível salvar: a estrutura fornecida é inválida. Motivo: " + resultado.erro,
            conteudoOriginal: null
        };
    }

    // 3. Atualizar o campo de data/hora da última gravação.
    dados.atualizadoEm = TechTrack.obterDataHoraAtual();

    // 4. Converter o objeto JavaScript para texto JSON.
    var textoJson = null;
    try {
        textoJson = JSON.stringify(dados);
    } catch (erroStringify) {
        throw {
            tipo: "erro_serializacao",
            mensagem: "Não foi possível converter os dados para JSON. Detalhe: " + erroStringify.message,
            conteudoOriginal: null
        };
    }

    // 5. Salvar no localStorage.
    //    QuotaExceededError é identificado pelo nome do erro (padrão W3C)
    //    ou pelo código numérico 22 (compatibilidade com navegadores antigos).
    //    Erros de permissão/contexto têm name diferente (SecurityError, etc.)
    //    e são reportados separadamente.
    try {
        storage.setItem(TechTrack.CHAVE_ARMAZENAMENTO, textoJson);
    } catch (erroGravacao) {
        var ehLimiteExcedido = (
            erroGravacao.name === "QuotaExceededError" ||
            erroGravacao.name === "NS_ERROR_DOM_QUOTA_REACHED" ||
            erroGravacao.code === 22
        );

        if (ehLimiteExcedido) {
            throw {
                tipo: "limite_armazenamento",
                mensagem: "O limite de armazenamento do localStorage foi atingido (~5 MB). " +
                          "Exporte um backup e limpe os dados para continuar.",
                conteudoOriginal: null
            };
        }

        // Erro de permissão, contexto restrito ou outro erro de gravação.
        throw {
            tipo: "erro_gravacao",
            mensagem: "Não foi possível gravar os dados no localStorage. Detalhe: " + erroGravacao.message,
            conteudoOriginal: null
        };
    }

    // 6. Retornar o objeto salvo.
    return dados;
};
