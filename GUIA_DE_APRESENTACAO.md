# Guia de Apresentação — TechTrack

> Este documento foi escrito para **você**, aluno responsável pelo projeto.
> Leia com calma antes da apresentação. Ele explica o que o sistema faz, como foi construído e como você deve demonstrá-lo ao professor.
>
> **Este guia é atualizado a cada etapa de desenvolvimento.**
> As seções marcadas com `🔧 Em construção` serão preenchidas conforme as funcionalidades forem implementadas.

---

## 1. Apresentação do TechTrack

O **TechTrack** é um sistema web de gerenciamento de equipamentos de informática e manutenções de TI. Ele foi desenvolvido como projeto acadêmico para a disciplina de Desenvolvimento Web da UTFPR.

A ideia surgiu de um problema real: empresas pequenas frequentemente controlam computadores, impressoras e outros equipamentos em planilhas ou até mesmo em papel. Isso dificulta saber quais equipamentos estão em manutenção, quando uma garantia vai vencer ou qual foi o custo das manutenções do ano.

O TechTrack resolve isso com uma interface simples, rodando direto no navegador, sem precisar de servidor, banco de dados ou internet.

**Resumo em uma frase:** o TechTrack é um sistema de controle de ativos de TI que funciona completamente no navegador, salvando os dados localmente.

---

## 2. Objetivo e problema resolvido

### O problema

Imagine uma empresa com 50 computadores. Sem um sistema:

- Ninguém sabe quantos estão em manutenção agora.
- Não há como saber se a garantia de um equipamento ainda é válida.
- O histórico de reparos se perde.
- Não é possível saber quanto foi gasto em manutenções.

### A solução

O TechTrack permite:

- Cadastrar todos os equipamentos com seus dados completos.
- Registrar ordens de manutenção e acompanhar seu andamento.
- Ver um painel com indicadores em tempo real.
- Consultar o histórico de cada equipamento.
- Exportar e importar todos os dados como backup.

### Por que funciona sem servidor?

Para um projeto acadêmico com escopo controlado, o navegador oferece tudo o que é necessário. O `localStorage` armazena os dados entre sessões, e o JavaScript cuida de toda a lógica. Isso elimina a complexidade de configurar um servidor e permite que o sistema rode em qualquer computador com um navegador.

---

## 3. Tecnologias utilizadas e justificativas

| Tecnologia       | Para que serve no projeto                        | Por que foi escolhida                                   |
|------------------|--------------------------------------------------|---------------------------------------------------------|
| **HTML5**        | Estrutura de todas as telas                      | Linguagem base da web, estudada nas aulas               |
| **CSS3**         | Estilo visual: cores, layout, responsividade     | Flexbox e Grid foram estudados na disciplina            |
| **JavaScript**   | Toda a lógica: validações, cálculos, navegação   | Estudado na disciplina; é o único necessário aqui       |
| **localStorage** | Salvar os dados no navegador                     | Estudado na disciplina (Web Storage)                    |
| **JSON**         | Formato dos dados salvos e do arquivo de backup  | Estudado na disciplina                                  |
| **qrcode.js**    | Gerar QR Code para etiquetas de equipamentos     | Biblioteca pequena, sem dependências, incluída localmente |

### O que foi deliberadamente evitado

- **React, Vue, Angular:** frameworks de interface que adicionam complexidade desnecessária para este escopo e que não foram estudados na disciplina.
- **Bootstrap, Tailwind:** frameworks CSS que escondem o funcionamento real do estilo e dificultariam a explicação do código.
- **Node.js / backend:** desnecessário para uma aplicação que funciona completamente no cliente.
- **CDNs:** o projeto deve funcionar sem internet. Todas as dependências estão incluídas localmente.

---

## 4. Organização dos arquivos

A estrutura do projeto foi pensada para separar responsabilidades de forma clara:

```
TechTracker/
├── index.html                  # Ponto de entrada da aplicação
├── css/
│   ├── reset.css               # Zera os estilos padrão do navegador
│   ├── base.css                # Variáveis de cor, tipografia e estilos globais
│   ├── layout.css              # Menu lateral, cabeçalho e área de conteúdo
│   └── components.css          # Cards, tabelas, formulários e botões
├── js/
│   ├── storage.js              # Lê e salva dados no localStorage
│   ├── data.js                 # Define a estrutura inicial dos dados
│   ├── utils.js                # Funções auxiliares (formatar data, gerar ID etc.)
│   ├── events.js               # Registra eventos no histórico automaticamente
│   ├── equipment.js            # Lógica de equipamentos
│   ├── maintenance.js          # Lógica de manutenções
│   ├── location.js             # Lógica de locais
│   ├── responsible.js          # Lógica de técnicos responsáveis
│   ├── history.js              # Consulta e exibe o histórico
│   ├── dashboard.js            # Calcula os indicadores do painel
│   ├── reports.js              # Gera os relatórios
│   ├── backup.js               # Exporta e importa dados
│   ├── qrcode.js               # Integração com a biblioteca de QR Code
│   └── app.js                  # Inicialização geral da aplicação
├── pages/
│   ├── dashboard.html          # Painel com indicadores
│   ├── equipments.html         # Lista de equipamentos
│   ├── equipment-detail.html   # Detalhes de um equipamento
│   ├── equipment-form.html     # Formulário de cadastro/edição
│   ├── maintenances.html       # Lista de manutenções
│   ├── maintenance-form.html   # Formulário de manutenção
│   ├── locations.html          # Gerenciamento de locais
│   ├── responsibles.html       # Gerenciamento de técnicos
│   ├── history.html            # Histórico de eventos
│   ├── reports.html            # Relatórios
│   └── backup.html             # Backup e restauração
├── lib/
│   └── qrcode.min.js           # Biblioteca de QR Code (incluída localmente)
├── .gitignore
├── README.md
├── PROJECT_SPEC.md
└── GUIA_DE_APRESENTACAO.md
```

### Por que separar em arquivos?

Imagine que toda a lógica estivesse em um único arquivo com 3.000 linhas. Seria impossível encontrar o que precisa mudar. Separar por responsabilidade faz com que, por exemplo, tudo relacionado a manutenções esteja em `maintenance.js`, facilitando manutenção e explicação.

---

## 5. Conteúdos das aulas aplicados

Esta seção mostra como cada conteúdo estudado na disciplina aparece no projeto.

| Conteúdo da aula                              | Onde aparece no TechTrack                                               |
|-----------------------------------------------|-------------------------------------------------------------------------|
| Arquitetura da Web                            | Projeto funciona como site estático, sem servidor                       |
| HTML e elementos textuais                     | Títulos, parágrafos e textos em todas as páginas                        |
| Listas, tabelas e formulários                 | Tabelas de equipamentos, formulários de cadastro, listas do histórico   |
| Introdução ao CSS                             | Estilos base, cores, fontes e reset                                     |
| Box Model, Display e Visibility               | Espaçamento de cards, visibilidade de modais e mensagens                |
| Flexbox e Grid                                | Layout do menu lateral + conteúdo, grades de cards do dashboard         |
| Posicionamento, Media Queries e Viewport      | Menu responsivo, adaptação para diferentes tamanhos de tela             |
| Introdução ao JavaScript, BOM e funções       | Funções utilitárias, `window.location` para navegação entre páginas     |
| DOM                                           | Renderização dinâmica das tabelas, formulários e indicadores            |
| Intervalos e eventos                          | Listeners de clique, submit de formulários, eventos de teclado          |
| JSON e orientação a objetos                   | Estrutura de dados, serialização com `JSON.stringify` e `JSON.parse`    |
| Web Storage, Promises, async e await          | `localStorage` para persistência; `async/await` na leitura de arquivos |

> **Dica para a apresentação:** ao mostrar cada funcionalidade, mencione qual conteúdo da aula ela demonstra. Isso mostra que você compreendeu a aplicação prática do que foi estudado.

---

## 6. Explicação das funcionalidades

🔧 *Esta seção será preenchida conforme as funcionalidades forem implementadas. Para cada uma, serão explicados: o que faz, como funciona por dentro e como demonstrar ao professor.*

### 6.1 Dashboard

*A ser preenchido na etapa de implementação do Dashboard.*

### 6.2 Equipamentos

*A ser preenchido na etapa de implementação dos Equipamentos.*

### 6.3 Manutenções

*A ser preenchido na etapa de implementação das Manutenções.*

### 6.4 Locais e Técnicos

*A ser preenchido na etapa de implementação dos Cadastros Auxiliares.*

### 6.5 Histórico

*A ser preenchido na etapa de implementação do Histórico.*

### 6.6 Relatórios

*A ser preenchido na etapa de implementação dos Relatórios.*

### 6.7 Backup

*A ser preenchido na etapa de implementação do Backup.*

### 6.8 QR Code

*A ser preenchido na etapa de implementação do QR Code.*

---

## 7. Exemplos de código comentados

🔧 *Esta seção será preenchida com exemplos reais do código do projeto, à medida que as funcionalidades forem implementadas. Cada exemplo incluirá comentários explicando linha a linha o que o código faz e qual conceito da aula ele demonstra.*

---

## 8. Funcionamento do localStorage e JSON

### O que é o localStorage?

O `localStorage` é uma funcionalidade do navegador que permite guardar informações de texto entre sessões. Diferente de uma variável JavaScript (que some quando você fecha a página), os dados no `localStorage` continuam lá até serem apagados manualmente ou pelo código.

### Como o TechTrack usa o localStorage?

Todos os dados do sistema — equipamentos, manutenções, locais, técnicos e histórico — ficam guardados em uma única entrada do `localStorage`, com a chave `techtrack:data:v1`.

O valor armazenado é uma string de texto no formato JSON. JSON é uma forma de representar objetos JavaScript como texto, que pode ser salvo e recuperado facilmente.

### A estrutura dos dados

```json
{
  "equipments": [],
  "maintenances": [],
  "locations": [],
  "responsibles": [],
  "events": []
}
```

### Como funciona na prática

🔧 *Exemplos de código reais serão adicionados quando `storage.js` for implementado.*

Mas o princípio é:

1. **Ler os dados:** converter a string JSON de volta para um objeto JavaScript com `JSON.parse`.
2. **Modificar os dados:** trabalhar com o objeto normalmente (adicionar, editar, remover itens).
3. **Salvar os dados:** converter o objeto de volta para string com `JSON.stringify` e salvar no localStorage.

### Por que um único objeto?

Manter todos os dados em um único objeto facilita a exportação (backup) e importação. Ao exportar, basta pegar esse objeto e salvar como arquivo. Ao importar, basta validar e restaurar esse mesmo objeto.

---

## 9. Manipulação do DOM e eventos

### O que é o DOM?

DOM significa *Document Object Model*. É a representação da página HTML como uma árvore de objetos que o JavaScript consegue ler e modificar. Quando o sistema exibe uma tabela de equipamentos na tela, ele está criando elementos HTML via JavaScript e inserindo-os no DOM.

### Como o TechTrack usa o DOM?

🔧 *Exemplos reais serão adicionados conforme as funcionalidades forem implementadas.*

O projeto utiliza o DOM para:

- Renderizar tabelas com os dados lidos do localStorage.
- Exibir e esconder elementos (como mensagens de erro e modais de confirmação).
- Preencher formulários com dados de um equipamento ao editar.
- Atualizar os indicadores do dashboard sem recarregar a página.

### Como funcionam os eventos?

Eventos são ações do usuário (clicar em um botão, enviar um formulário, digitar em um campo) que o JavaScript "escuta" e responde. O método `addEventListener` é o principal mecanismo para isso.

🔧 *Exemplos de código com `addEventListener` serão adicionados quando os formulários forem implementados.*

---

## 10. Regras de negócio

As regras de negócio são as restrições e comportamentos que o sistema deve garantir. Conhecê-las é fundamental para explicar o projeto ao professor.

### RN-01 — Patrimônio único
Dois equipamentos não podem ter o mesmo número de patrimônio. Antes de salvar, o sistema verifica se já existe outro equipamento com o mesmo valor.

### RN-02 — Número de série único
Quando informado, o número de série também deve ser único. O campo é opcional, mas se preenchido, não pode se repetir.

### RN-03 — Local obrigatório e válido
Todo equipamento precisa estar em um local. Não é possível cadastrar um equipamento sem selecionar um local cadastrado.

### RN-04 — Restrição de manutenção para equipamento inativo ou descartado
Se um equipamento foi desativado ou descartado, não faz sentido abrir uma manutenção para ele. O sistema bloqueia isso automaticamente.

### RN-05 — Uma manutenção ativa por equipamento
Um equipamento não pode estar em duas manutenções ao mesmo tempo. O sistema verifica se já existe uma manutenção aberta ou em andamento antes de permitir uma nova.

### RN-06 — Técnico inativo não recebe manutenções
Se um técnico foi inativado (saiu da empresa, por exemplo), ele não pode receber novas atribuições.

### RN-07 — Restrição de exclusão por relacionamento
O sistema não permite apagar um local que tenha equipamentos, nem um técnico que tenha manutenções associadas. Isso evita que dados fiquem "soltos" no sistema sem referência válida.

### RN-08 — Situação operacional calculada
O sistema determina automaticamente se um equipamento está "operacional" ou "em manutenção" baseado no estado das manutenções ativas. Isso não é preenchido manualmente — é sempre calculado.

### RN-09 — Manutenção atrasada
Uma manutenção com prazo definido que ainda não foi concluída e já passou da data limite é marcada automaticamente como atrasada.

### RN-10 — Garantia próxima do vencimento
Quando faltam 30 dias ou menos para a garantia de um equipamento vencer, o dashboard destaca esse equipamento nos alertas.

---

## 11. Roteiro de demonstração

🔧 *O roteiro detalhado será elaborado quando as funcionalidades estiverem implementadas. Ele seguirá uma sequência lógica para demonstrar o sistema em funcionamento ao professor.*

### Sequência prevista

1. **Introdução** — apresentar o projeto e o problema que resolve.
2. **Cadastros auxiliares** — criar um local e um técnico responsável.
3. **Equipamentos** — cadastrar dois ou três equipamentos, mostrando as validações.
4. **Dashboard** — mostrar os indicadores sendo calculados automaticamente.
5. **Manutenções** — abrir uma manutenção, mostrar a mudança de situação operacional.
6. **Histórico** — mostrar os eventos registrados automaticamente.
7. **Relatórios** — exibir um relatório de equipamentos por categoria.
8. **Backup** — exportar os dados como JSON e importar de volta.
9. **QR Code** — gerar e baixar uma etiqueta.

---

## 12. Possíveis perguntas do professor e respostas

🔧 *Esta seção será expandida conforme o projeto for desenvolvido. Abaixo estão as perguntas relacionadas às decisões arquiteturais já tomadas.*

---

**Por que não usaram React ou Vue?**

Porque o escopo do projeto não exige. React e Vue são ferramentas para aplicações de grande porte com muita atualização de estado. Para um sistema com múltiplas páginas HTML e operações simples de CRUD, JavaScript puro é suficiente, mais simples e compatível com o que foi estudado na disciplina.

---

**Por que não há um banco de dados?**

O projeto é um sistema frontend, sem backend. O `localStorage` cumpre o papel de persistência para os dados deste escopo. Um banco de dados exigiria um servidor, o que adicionaria complexidade desnecessária ao projeto acadêmico.

---

**Como os dados não se perdem ao fechar o navegador?**

O `localStorage` persiste os dados entre sessões. Diferente das variáveis JavaScript, que existem apenas enquanto a página está aberta, o `localStorage` guarda os dados no próprio navegador até serem apagados explicitamente.

---

**Por que usam uma única chave no localStorage em vez de uma por entidade?**

Um único objeto facilita o backup (exportação e importação de todos os dados de uma vez) e simplifica o código de leitura e escrita. O custo é praticamente zero para o volume de dados deste sistema.

---

**O que acontece se o localStorage estiver cheio?**

O `localStorage` tem limite de aproximadamente 5 MB por origem (domínio). Para um controle de equipamentos de pequena empresa, esse limite seria atingido com centenas de milhares de registros — muito além do uso real. Se atingido, o navegador lança um erro, que o sistema trata informando o usuário.

---

**Por que não usar CDN para a biblioteca de QR Code?**

Porque o projeto deve funcionar sem internet. Toda dependência está incluída localmente para garantir que o sistema funcione mesmo offline.

---

**O que é o JSON.stringify e o JSON.parse?**

`JSON.stringify` converte um objeto JavaScript em texto (string JSON) para ser salvo. `JSON.parse` faz o caminho inverso: converte o texto de volta para um objeto JavaScript para ser usado no código. O localStorage só consegue guardar texto, então essa conversão é necessária.

---

**Por que há uma versão na chave do localStorage (`v1`)?**

A versão permite que, se a estrutura dos dados mudar em versões futuras do sistema, seja possível detectar e migrar dados antigos sem perdê-los. É uma boa prática que adiciona zero complexidade ao código atual.

---

## 13. Limitações e decisões técnicas

Esta seção documenta as limitações conhecidas e as escolhas que foram feitas conscientemente.

### Limitações

| Limitação                        | Motivo                                                                |
|----------------------------------|-----------------------------------------------------------------------|
| Dados ficam apenas no navegador  | Sem backend, não há sincronização entre dispositivos ou usuários      |
| Sem controle de acesso           | Fora do escopo; qualquer pessoa com acesso ao computador vê os dados  |
| Sem histórico de edições detalhado de campos individuais | Registra o evento, mas não rastreia campo a campo o que mudou |
| Sem gráficos elaborados          | Relatórios usam tabelas; gráficos demandariam biblioteca extra        |
| Sem leitura de QR Code           | Requereria acesso à câmera; fora do escopo desta versão               |
| Limite de ~5 MB no localStorage  | Suficiente para o uso previsto, mas não escalável                     |

### Decisões técnicas

| Decisão                          | Alternativa considerada       | Por que foi escolhida                                   |
|----------------------------------|-------------------------------|----------------------------------------------------------|
| Múltiplas páginas HTML (MPA)     | Single Page Application (SPA) | Mais simples, mais próxima das aulas, mais fácil de explicar |
| Um único objeto no localStorage  | Uma chave por entidade        | Facilita backup e importação; código mais simples        |
| CSS manual sem framework         | Bootstrap ou Tailwind         | Exige compreensão real do CSS; exigência do escopo       |
| qrcode.js local                  | CDN ou API de QR Code         | Garantia de funcionamento offline                        |
| JavaScript organizado por módulos | Código em um único arquivo   | Manutenibilidade e clareza, essenciais para apresentação |

---

*Última atualização: Etapa 00 — Fundação e documentação.*
*Este documento será expandido a cada etapa de implementação.*
