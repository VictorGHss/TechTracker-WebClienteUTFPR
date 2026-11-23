/**
 * cadastros.js — TechTrack
 *
 * Responsabilidades:
 *   - CRUD completo de locais (cadastrar, editar, excluir).
 *   - CRUD completo de técnicos (cadastrar, editar, excluir).
 *   - Ativação e inativação de técnicos.
 *   - Renderização das tabelas de locais e técnicos.
 *   - Exibição de mensagens de feedback.
 *   - Validação dos campos obrigatórios.
 *   - Verificação de vínculos antes de excluir.
 *
 * Carregado APÓS dados.js, funcoes.js e armazenamento.js.
 * Utiliza exclusivamente TechTrack.carregarDados() e TechTrack.salvarDados().
 *
 * Relacionado às aulas: 3 (formulários HTML), 7 (DOM e eventos),
 *   8.1 e 8.2 (manipulação do DOM), 9.1 e 9.2 (JSON e Web Storage).
 */

window.TechTrack = window.TechTrack || {};

// ─────────────────────────────────────────────
// Inicialização
// ─────────────────────────────────────────────

/**
 * Inicializa a página ao carregar o DOM.
 * Carrega os dados, renderiza as tabelas e registra os eventos.
 */
document.addEventListener("DOMContentLoaded", function () {
    // Registrar eventos dos botões e formulários
    document.getElementById("btn-novo-local").addEventListener("click", abrirFormularioNovoLocal);
    document.getElementById("btn-cancelar-local").addEventListener("click", fecharFormularioLocal);
    document.getElementById("form-local").addEventListener("submit", salvarLocal);

    document.getElementById("btn-novo-tecnico").addEventListener("click", abrirFormularioNovoTecnico);
    document.getElementById("btn-cancelar-tecnico").addEventListener("click", fecharFormularioTecnico);
    document.getElementById("form-tecnico").addEventListener("submit", salvarTecnico);

    // Renderizar tabelas com os dados existentes
    renderizarLocais();
    renderizarTecnicos();
});

// ─────────────────────────────────────────────
// Auxiliares de feedback e formulário
// ─────────────────────────────────────────────

/**
 * Exibe uma mensagem de feedback em um elemento da página.
 * Remove a mensagem automaticamente após alguns segundos.
 *
 * @param {string} idElemento - ID do elemento <p> de feedback.
 * @param {string} texto - Mensagem a exibir.
 * @param {string} tipo - "sucesso", "erro" ou "aviso".
 */
function exibirFeedback(idElemento, texto, tipo) {
    var el = document.getElementById(idElemento);
    if (!el) { return; }

    // Limpa classes anteriores e define a nova
    el.className = "mensagem-feedback " + tipo;
    // textContent evita que o texto seja interpretado como HTML
    el.textContent = texto;
    el.hidden = false;

    // Remove automaticamente após 5 segundos
    clearTimeout(el._timeoutFeedback);
    el._timeoutFeedback = setTimeout(function () {
        el.hidden = true;
        el.textContent = "";
        el.className = "mensagem-feedback";
    }, 5000);
}

/**
 * Exibe uma mensagem de erro inline em um campo específico.
 *
 * @param {string} idErro - ID do elemento <span> de erro do campo.
 * @param {string} texto - Mensagem de erro.
 */
function exibirErroCampo(idErro, texto) {
    var el = document.getElementById(idErro);
    if (!el) { return; }
    el.textContent = texto;
}

/**
 * Limpa a mensagem de erro de um campo.
 *
 * @param {string} idErro - ID do elemento <span> de erro.
 */
function limparErroCampo(idErro) {
    var el = document.getElementById(idErro);
    if (!el) { return; }
    el.textContent = "";
}

// ─────────────────────────────────────────────
// LOCAIS — Renderização
// ─────────────────────────────────────────────

/**
 * Lê os dados do localStorage e atualiza a tabela de locais.
 * Alterna entre estado vazio e tabela preenchida.
 */
function renderizarLocais() {
    var dados;
    try {
        dados = TechTrack.carregarDados();
    } catch (erro) {
        exibirFeedback("feedback-locais", "Erro ao carregar locais: " + erro.mensagem, "erro");
        return;
    }

    var locais = dados.dados.locais;
    var msgVazia = document.getElementById("msg-sem-locais");
    var wrapper = document.getElementById("wrapper-tabela-locais");
    var corpo = document.getElementById("corpo-tabela-locais");

    // Limpar linhas anteriores
    corpo.innerHTML = "";

    if (locais.length === 0) {
        msgVazia.hidden = false;
        wrapper.hidden = true;
        return;
    }

    msgVazia.hidden = true;
    wrapper.hidden = false;

    // Criar uma linha da tabela para cada local
    for (var i = 0; i < locais.length; i++) {
        var local = locais[i];

        // Contar equipamentos vinculados a este local
        var qtdEquipamentos = 0;
        for (var j = 0; j < dados.dados.equipamentos.length; j++) {
            if (dados.dados.equipamentos[j].localId === local.id) {
                qtdEquipamentos++;
            }
        }

        var linha = criarLinhaLocal(local, qtdEquipamentos);
        corpo.appendChild(linha);
    }
}

/**
 * Cria e retorna um elemento <tr> para um local.
 *
 * @param {object} local - Objeto local com id, nome, descricao.
 * @param {number} qtdEquipamentos - Número de equipamentos associados.
 * @returns {HTMLElement} Linha da tabela.
 */
function criarLinhaLocal(local, qtdEquipamentos) {
    var tr = document.createElement("tr");

    // Coluna: nome
    var tdNome = document.createElement("td");
    tdNome.textContent = local.nome;
    tr.appendChild(tdNome);

    // Coluna: descrição
    var tdDescricao = document.createElement("td");
    tdDescricao.textContent = local.descricao || "—";
    tr.appendChild(tdDescricao);

    // Coluna: quantidade de equipamentos
    var tdEquipamentos = document.createElement("td");
    tdEquipamentos.textContent = qtdEquipamentos;
    tr.appendChild(tdEquipamentos);

    // Coluna: ações
    var tdAcoes = document.createElement("td");
    var divAcoes = document.createElement("div");
    divAcoes.className = "acoes-linha";

    var btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.className = "btn-secundario";
    btnEditar.textContent = "Editar";
    // Captura o id no fechamento da função para evitar problema de closure em loop
    (function (idLocal) {
        btnEditar.addEventListener("click", function () {
            editarLocal(idLocal);
        });
    }(local.id));

    var btnExcluir = document.createElement("button");
    btnExcluir.type = "button";
    btnExcluir.className = "btn-perigo";
    btnExcluir.textContent = "Excluir";
    (function (idLocal) {
        btnExcluir.addEventListener("click", function () {
            excluirLocal(idLocal);
        });
    }(local.id));

    divAcoes.appendChild(btnEditar);
    divAcoes.appendChild(btnExcluir);
    tdAcoes.appendChild(divAcoes);
    tr.appendChild(tdAcoes);

    return tr;
}

// ─────────────────────────────────────────────
// LOCAIS — Formulário
// ─────────────────────────────────────────────

/**
 * Abre o formulário para cadastrar um novo local.
 * Limpa os campos e ajusta o título.
 */
function abrirFormularioNovoLocal() {
    document.getElementById("local-id").value = "";
    document.getElementById("local-nome").value = "";
    document.getElementById("local-descricao").value = "";
    limparErroCampo("local-nome-erro");

    document.getElementById("titulo-form-local").textContent = "Cadastrar local";
    document.getElementById("btn-salvar-local").textContent = "Salvar";

    var painel = document.getElementById("painel-formulario-local");
    painel.hidden = false;
    document.getElementById("local-nome").focus();
}

/**
 * Fecha o formulário de local sem salvar.
 */
function fecharFormularioLocal() {
    document.getElementById("painel-formulario-local").hidden = true;
    limparErroCampo("local-nome-erro");
}

// ─────────────────────────────────────────────
// LOCAIS — Salvar (cadastrar e editar)
// ─────────────────────────────────────────────

/**
 * Trata o envio do formulário de local.
 * Decide se é cadastro novo ou edição com base no campo #local-id.
 *
 * @param {Event} evento - Evento submit do formulário.
 */
function salvarLocal(evento) {
    // Impede o envio tradicional do formulário (que recarregaria a página)
    evento.preventDefault();

    var nome = document.getElementById("local-nome").value.trim();

    // Validação
    if (nome === "") {
        exibirErroCampo("local-nome-erro", "O nome do local é obrigatório.");
        document.getElementById("local-nome").focus();
        return;
    }
    limparErroCampo("local-nome-erro");

    var descricao = document.getElementById("local-descricao").value.trim();
    var idExistente = document.getElementById("local-id").value;

    // Carregar dados atuais
    var dados;
    try {
        dados = TechTrack.carregarDados();
    } catch (erro) {
        exibirFeedback("feedback-locais", "Erro ao carregar dados: " + erro.mensagem, "erro");
        return;
    }

    if (idExistente) {
        // Edição: encontrar o local e atualizar os campos editáveis
        var encontrado = false;
        for (var i = 0; i < dados.dados.locais.length; i++) {
            if (dados.dados.locais[i].id === idExistente) {
                dados.dados.locais[i].nome = nome;
                dados.dados.locais[i].descricao = descricao;
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
            exibirFeedback("feedback-locais", "Local não encontrado. Recarregue a página.", "erro");
            return;
        }
    } else {
        // Cadastro: criar novo objeto local
        var novoLocal = {
            id: TechTrack.gerarId(),
            nome: nome,
            descricao: descricao,
            criadoEm: TechTrack.obterDataHoraAtual()
        };
        dados.dados.locais.push(novoLocal);
    }

    // Salvar
    try {
        TechTrack.salvarDados(dados);
    } catch (erro) {
        exibirFeedback("feedback-locais", "Erro ao salvar: " + erro.mensagem, "erro");
        return;
    }

    fecharFormularioLocal();
    renderizarLocais();

    var mensagem = idExistente ? "Local atualizado com sucesso." : "Local cadastrado com sucesso.";
    exibirFeedback("feedback-locais", mensagem, "sucesso");
}

// ─────────────────────────────────────────────
// LOCAIS — Editar
// ─────────────────────────────────────────────

/**
 * Preenche o formulário com os dados de um local existente para edição.
 *
 * @param {string} id - Identificador do local.
 */
function editarLocal(id) {
    var dados;
    try {
        dados = TechTrack.carregarDados();
    } catch (erro) {
        exibirFeedback("feedback-locais", "Erro ao carregar dados: " + erro.mensagem, "erro");
        return;
    }

    var local = null;
    for (var i = 0; i < dados.dados.locais.length; i++) {
        if (dados.dados.locais[i].id === id) {
            local = dados.dados.locais[i];
            break;
        }
    }

    if (!local) {
        exibirFeedback("feedback-locais", "Local não encontrado.", "erro");
        return;
    }

    document.getElementById("local-id").value = local.id;
    document.getElementById("local-nome").value = local.nome;
    document.getElementById("local-descricao").value = local.descricao || "";
    limparErroCampo("local-nome-erro");

    document.getElementById("titulo-form-local").textContent = "Editar local";
    document.getElementById("btn-salvar-local").textContent = "Atualizar";

    var painel = document.getElementById("painel-formulario-local");
    painel.hidden = false;
    document.getElementById("local-nome").focus();
}

// ─────────────────────────────────────────────
// LOCAIS — Excluir
// ─────────────────────────────────────────────

/**
 * Exclui um local após verificar vínculos com equipamentos.
 * Bloqueia a exclusão se houver equipamentos associados.
 * Solicita confirmação antes de excluir.
 *
 * @param {string} id - Identificador do local.
 */
function excluirLocal(id) {
    var dados;
    try {
        dados = TechTrack.carregarDados();
    } catch (erro) {
        exibirFeedback("feedback-locais", "Erro ao carregar dados: " + erro.mensagem, "erro");
        return;
    }

    // Verificar se existe algum equipamento com este localId (RN-07)
    var equipamentosVinculados = 0;
    for (var i = 0; i < dados.dados.equipamentos.length; i++) {
        if (dados.dados.equipamentos[i].localId === id) {
            equipamentosVinculados++;
        }
    }

    if (equipamentosVinculados > 0) {
        var plural = equipamentosVinculados === 1 ? "equipamento associado" : "equipamentos associados";
        exibirFeedback(
            "feedback-locais",
            "Não é possível excluir este local: ele possui " + equipamentosVinculados + " " + plural + ". " +
            "Transfira os equipamentos para outro local antes de excluir.",
            "aviso"
        );
        return;
    }

    // Encontrar o nome do local para exibir na confirmação
    var nomeLocal = "";
    for (var j = 0; j < dados.dados.locais.length; j++) {
        if (dados.dados.locais[j].id === id) {
            nomeLocal = dados.dados.locais[j].nome;
            break;
        }
    }

    // Solicitar confirmação antes de excluir
    var confirmado = window.confirm("Excluir o local \"" + nomeLocal + "\"? Esta ação não pode ser desfeita.");
    if (!confirmado) { return; }

    // Remover do array: filtrar todos exceto o que tem o id informado
    dados.dados.locais = dados.dados.locais.filter(function (local) {
        return local.id !== id;
    });

    try {
        TechTrack.salvarDados(dados);
    } catch (erro) {
        exibirFeedback("feedback-locais", "Erro ao salvar: " + erro.mensagem, "erro");
        return;
    }

    fecharFormularioLocal();
    renderizarLocais();
    exibirFeedback("feedback-locais", "Local excluído com sucesso.", "sucesso");
}

// ─────────────────────────────────────────────
// TÉCNICOS — Renderização
// ─────────────────────────────────────────────

/**
 * Lê os dados do localStorage e atualiza a tabela de técnicos.
 */
function renderizarTecnicos() {
    var dados;
    try {
        dados = TechTrack.carregarDados();
    } catch (erro) {
        exibirFeedback("feedback-tecnicos", "Erro ao carregar técnicos: " + erro.mensagem, "erro");
        return;
    }

    var tecnicos = dados.dados.tecnicos;
    var msgVazia = document.getElementById("msg-sem-tecnicos");
    var wrapper = document.getElementById("wrapper-tabela-tecnicos");
    var corpo = document.getElementById("corpo-tabela-tecnicos");

    corpo.innerHTML = "";

    if (tecnicos.length === 0) {
        msgVazia.hidden = false;
        wrapper.hidden = true;
        return;
    }

    msgVazia.hidden = true;
    wrapper.hidden = false;

    for (var i = 0; i < tecnicos.length; i++) {
        var tecnico = tecnicos[i];

        // Contar manutenções associadas a este técnico
        var qtdManutencoes = 0;
        for (var j = 0; j < dados.dados.manutencoes.length; j++) {
            if (dados.dados.manutencoes[j].tecnicoId === tecnico.id) {
                qtdManutencoes++;
            }
        }

        var linha = criarLinhaTecnico(tecnico, qtdManutencoes);
        corpo.appendChild(linha);
    }
}

/**
 * Cria e retorna um elemento <tr> para um técnico.
 *
 * @param {object} tecnico - Objeto técnico.
 * @param {number} qtdManutencoes - Número de manutenções associadas.
 * @returns {HTMLElement} Linha da tabela.
 */
function criarLinhaTecnico(tecnico, qtdManutencoes) {
    var tr = document.createElement("tr");

    // Coluna: nome
    var tdNome = document.createElement("td");
    tdNome.textContent = tecnico.nome;
    tr.appendChild(tdNome);

    // Coluna: contato
    var tdContato = document.createElement("td");
    tdContato.textContent = tecnico.contato || "—";
    tr.appendChild(tdContato);

    // Coluna: situação
    var tdSituacao = document.createElement("td");
    tdSituacao.textContent = tecnico.ativo ? "Ativo" : "Inativo";
    tr.appendChild(tdSituacao);

    // Coluna: manutenções
    var tdManutencoes = document.createElement("td");
    tdManutencoes.textContent = qtdManutencoes;
    tr.appendChild(tdManutencoes);

    // Coluna: ações
    var tdAcoes = document.createElement("td");
    var divAcoes = document.createElement("div");
    divAcoes.className = "acoes-linha";

    var btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.className = "btn-secundario";
    btnEditar.textContent = "Editar";
    (function (idTecnico) {
        btnEditar.addEventListener("click", function () {
            editarTecnico(idTecnico);
        });
    }(tecnico.id));

    // Botão de ativar/inativar
    var btnSituacao = document.createElement("button");
    btnSituacao.type = "button";
    btnSituacao.className = tecnico.ativo ? "btn-secundario" : "";
    btnSituacao.textContent = tecnico.ativo ? "Inativar" : "Ativar";
    (function (idTecnico) {
        btnSituacao.addEventListener("click", function () {
            alterarSituacaoTecnico(idTecnico);
        });
    }(tecnico.id));

    var btnExcluir = document.createElement("button");
    btnExcluir.type = "button";
    btnExcluir.className = "btn-perigo";
    btnExcluir.textContent = "Excluir";
    (function (idTecnico) {
        btnExcluir.addEventListener("click", function () {
            excluirTecnico(idTecnico);
        });
    }(tecnico.id));

    divAcoes.appendChild(btnEditar);
    divAcoes.appendChild(btnSituacao);
    divAcoes.appendChild(btnExcluir);
    tdAcoes.appendChild(divAcoes);
    tr.appendChild(tdAcoes);

    return tr;
}

// ─────────────────────────────────────────────
// TÉCNICOS — Formulário
// ─────────────────────────────────────────────

/**
 * Abre o formulário para cadastrar um novo técnico.
 */
function abrirFormularioNovoTecnico() {
    document.getElementById("tecnico-id").value = "";
    document.getElementById("tecnico-nome").value = "";
    document.getElementById("tecnico-contato").value = "";
    limparErroCampo("tecnico-nome-erro");

    document.getElementById("titulo-form-tecnico").textContent = "Cadastrar técnico";
    document.getElementById("btn-salvar-tecnico").textContent = "Salvar";

    var painel = document.getElementById("painel-formulario-tecnico");
    painel.hidden = false;
    document.getElementById("tecnico-nome").focus();
}

/**
 * Fecha o formulário de técnico sem salvar.
 */
function fecharFormularioTecnico() {
    document.getElementById("painel-formulario-tecnico").hidden = true;
    limparErroCampo("tecnico-nome-erro");
}

// ─────────────────────────────────────────────
// TÉCNICOS — Salvar (cadastrar e editar)
// ─────────────────────────────────────────────

/**
 * Trata o envio do formulário de técnico.
 *
 * @param {Event} evento - Evento submit do formulário.
 */
function salvarTecnico(evento) {
    evento.preventDefault();

    var nome = document.getElementById("tecnico-nome").value.trim();

    if (nome === "") {
        exibirErroCampo("tecnico-nome-erro", "O nome do técnico é obrigatório.");
        document.getElementById("tecnico-nome").focus();
        return;
    }
    limparErroCampo("tecnico-nome-erro");

    var contato = document.getElementById("tecnico-contato").value.trim();
    var idExistente = document.getElementById("tecnico-id").value;

    var dados;
    try {
        dados = TechTrack.carregarDados();
    } catch (erro) {
        exibirFeedback("feedback-tecnicos", "Erro ao carregar dados: " + erro.mensagem, "erro");
        return;
    }

    if (idExistente) {
        // Edição: atualizar nome e contato, preservar id, criadoEm e ativo
        var encontrado = false;
        for (var i = 0; i < dados.dados.tecnicos.length; i++) {
            if (dados.dados.tecnicos[i].id === idExistente) {
                dados.dados.tecnicos[i].nome = nome;
                dados.dados.tecnicos[i].contato = contato;
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
            exibirFeedback("feedback-tecnicos", "Técnico não encontrado. Recarregue a página.", "erro");
            return;
        }
    } else {
        // Cadastro: novo técnico começa sempre como ativo
        var novoTecnico = {
            id: TechTrack.gerarId(),
            nome: nome,
            contato: contato,
            ativo: true,
            criadoEm: TechTrack.obterDataHoraAtual()
        };
        dados.dados.tecnicos.push(novoTecnico);
    }

    try {
        TechTrack.salvarDados(dados);
    } catch (erro) {
        exibirFeedback("feedback-tecnicos", "Erro ao salvar: " + erro.mensagem, "erro");
        return;
    }

    fecharFormularioTecnico();
    renderizarTecnicos();

    var mensagem = idExistente ? "Técnico atualizado com sucesso." : "Técnico cadastrado com sucesso.";
    exibirFeedback("feedback-tecnicos", mensagem, "sucesso");
}

// ─────────────────────────────────────────────
// TÉCNICOS — Editar
// ─────────────────────────────────────────────

/**
 * Preenche o formulário com os dados de um técnico existente para edição.
 *
 * @param {string} id - Identificador do técnico.
 */
function editarTecnico(id) {
    var dados;
    try {
        dados = TechTrack.carregarDados();
    } catch (erro) {
        exibirFeedback("feedback-tecnicos", "Erro ao carregar dados: " + erro.mensagem, "erro");
        return;
    }

    var tecnico = null;
    for (var i = 0; i < dados.dados.tecnicos.length; i++) {
        if (dados.dados.tecnicos[i].id === id) {
            tecnico = dados.dados.tecnicos[i];
            break;
        }
    }

    if (!tecnico) {
        exibirFeedback("feedback-tecnicos", "Técnico não encontrado.", "erro");
        return;
    }

    document.getElementById("tecnico-id").value = tecnico.id;
    document.getElementById("tecnico-nome").value = tecnico.nome;
    document.getElementById("tecnico-contato").value = tecnico.contato || "";
    limparErroCampo("tecnico-nome-erro");

    document.getElementById("titulo-form-tecnico").textContent = "Editar técnico";
    document.getElementById("btn-salvar-tecnico").textContent = "Atualizar";

    var painel = document.getElementById("painel-formulario-tecnico");
    painel.hidden = false;
    document.getElementById("tecnico-nome").focus();
}

// ─────────────────────────────────────────────
// TÉCNICOS — Ativação e inativação
// ─────────────────────────────────────────────

/**
 * Alterna a situação ativo/inativo de um técnico.
 *
 * Regras aplicadas:
 * - Inativar técnico com manutenção aberta ou em andamento é bloqueado (RN-06).
 * - Reativar é sempre permitido.
 *
 * @param {string} id - Identificador do técnico.
 */
function alterarSituacaoTecnico(id) {
    var dados;
    try {
        dados = TechTrack.carregarDados();
    } catch (erro) {
        exibirFeedback("feedback-tecnicos", "Erro ao carregar dados: " + erro.mensagem, "erro");
        return;
    }

    var tecnico = null;
    for (var i = 0; i < dados.dados.tecnicos.length; i++) {
        if (dados.dados.tecnicos[i].id === id) {
            tecnico = dados.dados.tecnicos[i];
            break;
        }
    }

    if (!tecnico) {
        exibirFeedback("feedback-tecnicos", "Técnico não encontrado.", "erro");
        return;
    }

    // Verificar se está tentando inativar (ativo → inativo)
    if (tecnico.ativo) {
        // Verificar manutenções em aberto ou em andamento (RN-06)
        var estadosAtivos = ["aberta", "em_andamento"];
        for (var j = 0; j < dados.dados.manutencoes.length; j++) {
            var man = dados.dados.manutencoes[j];
            if (man.tecnicoId === id && estadosAtivos.indexOf(man.estado) !== -1) {
                exibirFeedback(
                    "feedback-tecnicos",
                    "Não é possível inativar \"" + tecnico.nome + "\": o técnico possui manutenções em aberto ou em andamento.",
                    "aviso"
                );
                return;
            }
        }

        var confirmado = window.confirm("Inativar o técnico \"" + tecnico.nome + "\"? Ele não poderá receber novas manutenções.");
        if (!confirmado) { return; }

        tecnico.ativo = false;
    } else {
        // Reativar: sempre permitido
        tecnico.ativo = true;
    }

    try {
        TechTrack.salvarDados(dados);
    } catch (erro) {
        exibirFeedback("feedback-tecnicos", "Erro ao salvar: " + erro.mensagem, "erro");
        return;
    }

    renderizarTecnicos();
    var msg = tecnico.ativo ? "Técnico reativado." : "Técnico inativado.";
    exibirFeedback("feedback-tecnicos", msg, "sucesso");
}

// ─────────────────────────────────────────────
// TÉCNICOS — Excluir
// ─────────────────────────────────────────────

/**
 * Exclui um técnico após verificar vínculos com manutenções.
 * Bloqueia a exclusão se existir qualquer manutenção associada (RN-07).
 *
 * @param {string} id - Identificador do técnico.
 */
function excluirTecnico(id) {
    var dados;
    try {
        dados = TechTrack.carregarDados();
    } catch (erro) {
        exibirFeedback("feedback-tecnicos", "Erro ao carregar dados: " + erro.mensagem, "erro");
        return;
    }

    // Verificar se existe qualquer manutenção com este tecnicoId (RN-07)
    var manutencoesVinculadas = 0;
    for (var i = 0; i < dados.dados.manutencoes.length; i++) {
        if (dados.dados.manutencoes[i].tecnicoId === id) {
            manutencoesVinculadas++;
        }
    }

    if (manutencoesVinculadas > 0) {
        var plural = manutencoesVinculadas === 1 ? "manutenção associada" : "manutenções associadas";
        exibirFeedback(
            "feedback-tecnicos",
            "Não é possível excluir este técnico: ele possui " + manutencoesVinculadas + " " + plural + ".",
            "aviso"
        );
        return;
    }

    // Encontrar o nome para a confirmação
    var nomeTecnico = "";
    for (var j = 0; j < dados.dados.tecnicos.length; j++) {
        if (dados.dados.tecnicos[j].id === id) {
            nomeTecnico = dados.dados.tecnicos[j].nome;
            break;
        }
    }

    var confirmado = window.confirm("Excluir o técnico \"" + nomeTecnico + "\"? Esta ação não pode ser desfeita.");
    if (!confirmado) { return; }

    dados.dados.tecnicos = dados.dados.tecnicos.filter(function (t) {
        return t.id !== id;
    });

    try {
        TechTrack.salvarDados(dados);
    } catch (erro) {
        exibirFeedback("feedback-tecnicos", "Erro ao salvar: " + erro.mensagem, "erro");
        return;
    }

    fecharFormularioTecnico();
    renderizarTecnicos();
    exibirFeedback("feedback-tecnicos", "Técnico excluído com sucesso.", "sucesso");
}
