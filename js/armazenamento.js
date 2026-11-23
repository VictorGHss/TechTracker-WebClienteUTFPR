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
 */

window.TechTrack = window.TechTrack || {};

// ─────────────────────────────────────────────
// Leitura
// ─────────────────────────────────────────────

/**
 * Carrega os dados do localStorage e os retorna como objeto JavaScript.
 *
 * Fluxo de execução:
 *   1. Verifica se o localStorage está disponível.
 *   2. Busca o conteúdo da chave "techtrack:data:v1".
 *   3. Se não existir conteúdo, cria e salva a estrutura inicial.
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
    // 1. Verificar se o localStorage está disponível
    if (!TechTrack._localStorageDisponivel()) {
        throw {
            tipo: "localStorage_indisponivel",
            mensagem: "O localStorage não está disponível neste ambiente. Verifique se o navegador suporta Web Storage e se não está em modo privado com restrições.",
            conteudoOriginal: null
        };
    }

    var conteudoTexto = null;

    // 2. Buscar o conteúdo salvo
    try {
        conteudoTexto = localStorage.getItem(TechTrack.CHAVE_ARMAZENAMENTO);
    } catch (erroLeitura) {
        throw {
            tipo: "erro_leitura",
            mensagem: "Não foi possível ler os dados do localStorage. Detalhe: " + erroLeitura.message,
            conteudoOriginal: null
        };
    }

    // 3. Se não existir nenhum conteúdo, inicializar com estrutura vazia
    if (conteudoTexto === null || conteudoTexto === undefined || conteudoTexto === "") {
        var estruturaInicial = TechTrack.criarEstruturaInicial();
        // Salva a estrutura para que futuras leituras já a encontrem
        TechTrack.salvarDados(estruturaInicial);
        return estruturaInicial;
    }

    // 4. Converter o texto JSON em objeto JavaScript
    var objeto = null;
    try {
        objeto = JSON.parse(conteudoTexto);
    } catch (erroJson) {
        // JSON corrompido: informa o problema sem sobrescrever os dados
        throw {
            tipo: "json_invalido",
            mensagem: "O conteúdo salvo no localStorage não é um JSON válido e não pode ser lido. " +
                      "Os dados originais foram PRESERVADOS. Detalhe técnico: " + erroJson.message,
            conteudoOriginal: conteudoTexto
        };
    }

    // 5. Validar a estrutura recuperada
    var resultado = TechTrack.validarEstrutura(objeto);
    if (!resultado.valido) {
        throw {
            tipo: "estrutura_invalida",
            mensagem: "Os dados recuperados do localStorage têm uma estrutura incompatível com esta versão do sistema. " +
                      "Os dados originais foram PRESERVADOS. Motivo: " + resultado.erro,
            conteudoOriginal: conteudoTexto
        };
    }

    // 6. Retornar o objeto validado
    return objeto;
};

// ─────────────────────────────────────────────
// Gravação
// ─────────────────────────────────────────────

/**
 * Valida e salva o objeto de dados no localStorage.
 *
 * Fluxo de execução:
 *   1. Verifica se o localStorage está disponível.
 *   2. Valida a estrutura do objeto recebido.
 *   3. Atualiza o campo atualizadoEm com o momento atual.
 *   4. Converte o objeto para texto JSON com JSON.stringify.
 *   5. Salva o texto no localStorage.
 *   6. Retorna o objeto salvo.
 *
 * @param {object} dados - Objeto completo com a estrutura do sistema.
 * @returns {object} O objeto salvo (com atualizadoEm atualizado).
 * @throws {object} Descrição do erro encontrado.
 */
TechTrack.salvarDados = function (dados) {
    // 1. Verificar se o localStorage está disponível
    if (!TechTrack._localStorageDisponivel()) {
        throw {
            tipo: "localStorage_indisponivel",
            mensagem: "O localStorage não está disponível neste ambiente.",
            conteudoOriginal: null
        };
    }

    // 2. Validar a estrutura antes de qualquer alteração
    var resultado = TechTrack.validarEstrutura(dados);
    if (!resultado.valido) {
        throw {
            tipo: "estrutura_invalida",
            mensagem: "Não é possível salvar: a estrutura fornecida é inválida. Motivo: " + resultado.erro,
            conteudoOriginal: null
        };
    }

    // 3. Atualizar o campo de data/hora da última gravação
    dados.atualizadoEm = TechTrack.obterDataHoraAtual();

    // 4. Converter o objeto JavaScript para texto JSON
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

    // 5. Salvar no localStorage
    try {
        localStorage.setItem(TechTrack.CHAVE_ARMAZENAMENTO, textoJson);
    } catch (erroGravacao) {
        // O erro mais comum aqui é quota excedida (~5 MB por origem)
        var mensagemErro = erroGravacao.message || "";
        var ehLimiteExcedido = (
            mensagemErro.toLowerCase().indexOf("quota") !== -1 ||
            mensagemErro.toLowerCase().indexOf("storage") !== -1 ||
            erroGravacao.name === "QuotaExceededError" ||
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

        throw {
            tipo: "erro_gravacao",
            mensagem: "Não foi possível gravar os dados no localStorage. Detalhe: " + erroGravacao.message,
            conteudoOriginal: null
        };
    }

    // 6. Retornar o objeto salvo
    return dados;
};

// ─────────────────────────────────────────────
// Auxiliar interno
// ─────────────────────────────────────────────

/**
 * Verifica se o localStorage está disponível e funcional.
 *
 * Alguns ambientes (modo privado de certos navegadores, iframes com
 * restrições, Node.js) não oferecem localStorage. Esta função testa
 * a disponibilidade escrevendo e apagando uma chave temporária.
 *
 * @returns {boolean} true se o localStorage estiver disponível.
 */
TechTrack._localStorageDisponivel = function () {
    try {
        var chavesTeste = "__techtrack_teste__";
        localStorage.setItem(chavesTeste, "1");
        localStorage.removeItem(chavesTeste);
        return true;
    } catch (e) {
        return false;
    }
};
