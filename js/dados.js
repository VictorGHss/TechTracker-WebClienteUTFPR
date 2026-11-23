/**
 * dados.js — TechTrack
 *
 * Responsabilidades:
 *   - Inicializar o objeto global window.TechTrack.
 *   - Definir a chave de armazenamento e a versão atual dos dados.
 *   - Criar a estrutura inicial vazia do armazenamento.
 *   - Validar a estrutura de um objeto recuperado do localStorage.
 *
 * Carregado PRIMEIRO entre os scripts JS, pois os demais dependem
 * do objeto TechTrack já existir.
 *
 * Relacionado às aulas: 7 (objetos e funções), 9.1 e 9.2 (JSON e Web Storage).
 */

// Cria o objeto global compartilhado, caso ainda não exista.
// Usar window.TechTrack evita conflitos de nomes com outras variáveis
// e deixa explícito que é um objeto disponível em todas as páginas.
window.TechTrack = window.TechTrack || {};

// ─────────────────────────────────────────────
// Constantes
// ─────────────────────────────────────────────

/** Chave usada para ler e gravar no localStorage. */
TechTrack.CHAVE_ARMAZENAMENTO = "techtrack:data:v1";

/**
 * Número de versão da estrutura de dados.
 * Se a estrutura mudar em versões futuras, este valor
 * será usado para detectar dados antigos.
 */
TechTrack.VERSAO_DADOS = 1;

// ─────────────────────────────────────────────
// Estrutura inicial
// ─────────────────────────────────────────────

/**
 * Cria e retorna a estrutura inicial de armazenamento.
 * Chamada quando não existe nenhum dado salvo ainda.
 *
 * A estrutura é um objeto com:
 *   - versao: número que identifica o formato dos dados.
 *   - atualizadoEm: data/hora da última gravação.
 *   - dados: objeto com as cinco coleções como arrays vazios.
 *
 * @returns {object} Estrutura inicial pronta para ser salva.
 */
TechTrack.criarEstruturaInicial = function () {
    return {
        versao: TechTrack.VERSAO_DADOS,
        atualizadoEm: new Date().toISOString(),
        dados: {
            equipamentos: [],
            manutencoes: [],
            locais: [],
            tecnicos: [],
            eventos: []
        }
    };
};

// ─────────────────────────────────────────────
// Validação estrutural
// ─────────────────────────────────────────────

/**
 * Verifica se um objeto recuperado do localStorage tem a estrutura
 * esperada pelo sistema.
 *
 * Esta validação protege o sistema contra dados corrompidos ou
 * gerados por uma versão diferente do código.
 *
 * Verificações realizadas (em ordem):
 *   1. O objeto existe e é um objeto (não nulo, não array).
 *   2. O campo versao existe e é igual à versão suportada.
 *   3. O campo atualizadoEm existe e parece um timestamp ISO 8601.
 *   4. O campo dados existe e é um objeto.
 *   5. As cinco coleções obrigatórias existem dentro de dados.
 *   6. Cada coleção é um array.
 *   7. Cada item nas coleções é um objeto com um campo id não vazio.
 *
 * @param {any} obj - O valor a ser validado.
 * @returns {{ valido: boolean, erro: string }} Resultado da validação.
 */
TechTrack.validarEstrutura = function (obj) {
    // 1. Deve ser um objeto não nulo e não array
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
        return { valido: false, erro: "O objeto armazenado não é válido." };
    }

    // 2. Versão deve existir e ser suportada
    if (obj.versao === undefined || obj.versao === null) {
        return { valido: false, erro: "Campo 'versao' ausente." };
    }
    if (obj.versao !== TechTrack.VERSAO_DADOS) {
        return {
            valido: false,
            erro: "Versão dos dados (" + obj.versao + ") não é suportada. Versão esperada: " + TechTrack.VERSAO_DADOS + "."
        };
    }

    // 3. atualizadoEm deve existir e ter formato de data ISO
    if (!obj.atualizadoEm || typeof obj.atualizadoEm !== "string") {
        return { valido: false, erro: "Campo 'atualizadoEm' ausente ou inválido." };
    }
    var dataTestada = new Date(obj.atualizadoEm);
    if (isNaN(dataTestada.getTime())) {
        return { valido: false, erro: "Campo 'atualizadoEm' não contém uma data válida: \"" + obj.atualizadoEm + "\"." };
    }

    // 4. dados deve existir e ser um objeto
    if (!obj.dados || typeof obj.dados !== "object" || Array.isArray(obj.dados)) {
        return { valido: false, erro: "Campo 'dados' ausente ou inválido." };
    }

    // 5 e 6. As cinco coleções devem existir e ser arrays
    var colecoes = ["equipamentos", "manutencoes", "locais", "tecnicos", "eventos"];
    for (var i = 0; i < colecoes.length; i++) {
        var nome = colecoes[i];
        if (obj.dados[nome] === undefined) {
            return { valido: false, erro: "Coleção obrigatória ausente: '" + nome + "'." };
        }
        if (!Array.isArray(obj.dados[nome])) {
            return { valido: false, erro: "A coleção '" + nome + "' deveria ser um array, mas é " + typeof obj.dados[nome] + "." };
        }
    }

    // 7. Cada item nas coleções deve ser um objeto com id não vazio
    for (var j = 0; j < colecoes.length; j++) {
        var nomeCol = colecoes[j];
        var colecao = obj.dados[nomeCol];
        for (var k = 0; k < colecao.length; k++) {
            var item = colecao[k];
            if (!item || typeof item !== "object" || Array.isArray(item)) {
                return {
                    valido: false,
                    erro: "Item " + k + " da coleção '" + nomeCol + "' não é um objeto válido."
                };
            }
            if (!item.id || typeof item.id !== "string" || item.id.trim() === "") {
                return {
                    valido: false,
                    erro: "Item " + k + " da coleção '" + nomeCol + "' não possui um identificador válido."
                };
            }
        }
    }

    return { valido: true, erro: "" };
};
