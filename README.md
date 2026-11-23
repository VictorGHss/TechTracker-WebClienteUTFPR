# TechTrack

Sistema web de gerenciamento de equipamentos de informática e manutenções de TI.

---

## Objetivo acadêmico

Projeto desenvolvido para a disciplina de **Desenvolvimento Web** da **UTFPR**.

O objetivo é construir uma aplicação web funcional, organizada e com boa apresentação, aplicando os conteúdos estudados na disciplina: HTML5, CSS3, JavaScript, DOM, eventos, localStorage e JSON.

---

## Tecnologias

- HTML5
- CSS3 (Flexbox, Grid, Media Queries)
- JavaScript puro
- localStorage (Web Storage)
- JSON

Sem frameworks, sem backend, sem dependências externas.
A biblioteca qrcode.js será incluída localmente na etapa de QR Code.

---

## Estrutura de diretórios

```
TechTrack/
│
├── index.html              # Dashboard (página inicial)
├── equipamentos.html       # Inventário e cadastro de equipamentos
├── equipamento.html        # Detalhes de um equipamento
├── manutencoes.html        # Gerenciamento de manutenções
├── cadastros.html          # Locais e técnicos
├── relatorios.html         # Relatórios e backup
│
├── css/
│   └── style.css           # Estilos globais, layout e responsividade
│
├── js/
│   ├── armazenamento.js    # Leitura e escrita no localStorage
│   ├── dados.js            # Estrutura e inicialização dos dados
│   ├── funcoes.js          # Funções utilitárias
│   ├── equipamentos.js     # Lógica de equipamentos
│   ├── manutencoes.js      # Lógica de manutenções
│   ├── cadastros.js        # Lógica de locais e técnicos
│   ├── dashboard.js        # Indicadores do painel
│   └── relatorios.js       # Relatórios e backup
│
└── assets/
    └── imagens/
```

---

## Módulos

| Módulo              | Página               | Descrição                                                        |
|---------------------|----------------------|------------------------------------------------------------------|
| Dashboard           | `index.html`         | Indicadores calculados automaticamente e atividades recentes     |
| Equipamentos        | `equipamentos.html`  | Inventário com pesquisa, filtros e formulário de cadastro/edição |
| Detalhe             | `equipamento.html`   | Dados completos, histórico e manutenções do equipamento          |
| Manutenções         | `manutencoes.html`   | Lista e formulário de manutenções                                |
| Cadastros           | `cadastros.html`     | Gerenciamento de locais e técnicos responsáveis                  |
| Relatórios e Backup | `relatorios.html`    | Relatórios tabulares, exportação e importação de dados           |

---

## Prioridades das funcionalidades

**Essenciais:** dashboard, CRUD de equipamentos, manutenções, locais, técnicos, histórico, pesquisa, filtros e persistência.

**Complementares:** relatórios tabulares, alertas de garantia e atraso, backup JSON.

**Adicionais:** geração de QR Code e download de etiquetas.

---

## Roadmap

| Etapa | Descrição                                        | Situação       |
|-------|--------------------------------------------------|----------------|
| 00    | Fundação e documentação                          | ✅ Concluída    |
| 00.1  | Alinhamento documental                           | ✅ Concluída    |
| 01    | Estrutura HTML e navegação                       | ✅ Concluída    |
| 02    | Identidade visual e CSS responsivo               | 🔧 Pendente    |
| 03    | Modelagem de dados e localStorage                | 🔧 Pendente    |
| 04    | CRUD de equipamentos                             | 🔧 Pendente    |
| 05    | CRUD de locais e técnicos                        | 🔧 Pendente    |
| 06    | CRUD de manutenções                              | 🔧 Pendente    |
| 07    | Dashboard e histórico                            | 🔧 Pendente    |
| 08    | Relatórios e backup                              | 🔧 Pendente    |
| 09    | QR Code e etiquetas                              | 🔧 Pendente    |
| 10    | Testes, refinamento e preparação da apresentação | 🔧 Pendente    |

---

## Como executar

A aplicação é um site estático — não há servidor de aplicação, banco de dados ou processamento fora do navegador.

A forma recomendada é usar um servidor estático local, como a extensão **Live Server** do VS Code:

1. Abra a pasta do projeto no VS Code ou Kiro IDE.
2. Clique com o botão direito em `index.html`.
3. Selecione **"Open with Live Server"**.
4. O navegador abrirá o projeto em `http://localhost:5500` (ou porta similar).

> O Live Server apenas serve os arquivos para o navegador. Ele não representa um backend nem processa dados. O TechTrack continua sendo 100% frontend.

A abertura direta via `file://` (clicando duas vezes no arquivo) pode funcionar na maioria dos navegadores, mas o comportamento do localStorage pode variar. Recomenda-se o servidor estático local para evitar inconsistências.

> **Nota:** nas etapas atuais, as páginas HTML existem mas o CSS e o JavaScript ainda não foram criados. A aparência e as funcionalidades serão adicionadas nas etapas 02 em diante.

---

## Documentação

| Arquivo                    | Conteúdo                                                        |
|----------------------------|-----------------------------------------------------------------|
| `PROJECT_SPEC.md`          | Especificação técnica e funcional completa                      |
| `GUIA_DE_APRESENTACAO.md`  | Guia didático para o aluno estudar e apresentar o projeto       |

---

## Repositório

[github.com/VictorGHss/TechTracker-WebClienteUTFPR](https://github.com/VictorGHss/TechTracker-WebClienteUTFPR)
