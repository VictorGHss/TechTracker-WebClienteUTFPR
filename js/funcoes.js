/**
 * funcoes.js — TechTrack
 *
 * Responsabilidades:
 *   - Funções auxiliares simples reutilizadas pelos demais módulos.
 *   - Geração de identificadores únicos.
 *   - Obtenção da data e hora atual no formato ISO 8601.
 *
 * Carregado APÓS dados.js (que cria o objeto TechTrack)
 * e ANTES de armazenamento.js.
 *
 * Relacionado às aulas: 7 (funções e objetos JavaScript).
 */

// Garante que o objeto global existe (proteção extra caso a ordem dos
// scripts seja alterada acidentalmente).
window.TechTrack = window.TechTrack || {};

// ─────────────────────────────────────────────
// Geração de identificadores
// ─────────────────────────────────────────────

/**
 * Gera um identificador único em formato de string.
 *
 * Combina dois valores:
 *   - Date.now(): número de milissegundos desde 01/01/1970.
 *     Garante que dois IDs gerados em momentos diferentes sejam distintos.
 *   - Math.random(): número decimal entre 0 e 1 (ex: 0.7483921...).
 *     Reduz a chance de colisão quando dois IDs são gerados no mesmo milissegundo.
 *
 * O resultado é convertido para uma string hexadecimal com toString(36),
 * que usa os dígitos 0-9 e as letras a-z. O "." é removido para que
 * o ID seja uma string simples sem pontuação.
 *
 * Exemplo de resultado: "m2bexkr4g0.5k9p"  →  "m2bexkr4g05k9p"
 *
 * @returns {string} Identificador único.
 */
TechTrack.gerarId = function () {
    var parte1 = Date.now().toString(36);           // ex: "m2bexkr4g"
    var parte2 = Math.random().toString(36).slice(2); // ex: "5k9pzt83"
    return parte1 + parte2;
};

// ─────────────────────────────────────────────
// Data e hora
// ─────────────────────────────────────────────

/**
 * Retorna a data e hora atuais no formato ISO 8601.
 *
 * O formato ISO 8601 é o padrão internacional para representar
 * datas e horas como texto. Ele é compatível com JSON.parse,
 * JSON.stringify e com o campo <input type="date"> do HTML.
 *
 * Exemplo de retorno: "2026-11-23T18:30:00.000Z"
 *   - 2026-11-23  → data no formato YYYY-MM-DD
 *   - T           → separador entre data e hora
 *   - 18:30:00    → hora, minuto e segundo
 *   - .000        → milissegundos
 *   - Z           → fuso UTC (horário universal)
 *
 * @returns {string} Timestamp atual em formato ISO 8601.
 */
TechTrack.obterDataHoraAtual = function () {
    return new Date().toISOString();
};
