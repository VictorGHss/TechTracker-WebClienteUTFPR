# Guia de Apresentação — TechTrack

> Este documento foi escrito para **você**, aluno responsável pelo projeto.
> Leia com calma antes da apresentação. Ele explica o que o sistema faz, como foi construído e o que você precisa entender para explicar ao professor.
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
- Ver um painel com indicadores calculados automaticamente.
- Consultar o histórico de cada equipamento.
- Exportar e importar todos os dados como backup.

### Por que funciona sem servidor?

O navegador oferece tudo o que é necessário para este escopo. O `localStorage` guarda os dados entre sessões e o JavaScript cuida de toda a lógica. Isso elimina a necessidade de configurar um servidor e permite que o sistema rode em qualquer computador com um navegador moderno.

---

## 3. Tecnologias utilizadas e justificativas

| Tecnologia       | Para que serve no projeto                        | Por que foi escolhida                                     |
|------------------|--------------------------------------------------|-----------------------------------------------------------|
| **HTML5**        | Estrutura de todas as telas                      | Linguagem base da web, estudada nas aulas                 |
| **CSS3**         | Estilo visual: cores, layout, responsividade     | Flexbox e Grid foram estudados na disciplina              |
| **JavaScript**   | Toda a lógica: validações, cálculos, navegação   | Estudado na disciplina; é o suficiente para este escopo   |
| **localStorage** | Salvar os dados no navegador                     | Estudado na disciplina (Web Storage)                      |
| **JSON**         | Formato dos dados salvos e do arquivo de backup  | Estudado na disciplina                                    |
| **qrcode.js**    | Gerar QR Code para etiquetas (funcionalidade adicional) | Biblioteca pequena, sem dependências, incluída localmente |

### O que foi deliberadamente evitado e por quê

**React, Vue e Angular** são frameworks de interface criados para aplicações com muito estado dinâmico e equipes grandes. Para um sistema com páginas HTML diretas e operações simples de cadastro, JavaScript puro resolve com menos complexidade.

**Bootstrap e Tailwind** são frameworks CSS que geram o estilo automaticamente. O problema é que, ao usá-los, o código CSS real fica escondido — você não consegue explicar por que algo está posicionado de determinada forma. Para uma disciplina que ensina CSS, faz mais sentido escrever o estilo diretamente.

**CDNs e APIs externas** exigem conexão com internet. O projeto deve funcionar offline, então todas as dependências precisam estar incluídas localmente.

---

## 4. Organização dos arquivos

A estrutura do projeto foi pensada para ser simples e direta:

```
TechTrack/
│
├── index.html              # Dashboard (página inicial)
├── equipamentos.html       # Inventário e cadastro de equipamentos
├── equipamento.html        # Detalhes de um equipamento específico
├── manutencoes.html        # Gerenciamento de manutenções
├── cadastros.html          # Locais e técnicos (duas seções na mesma página)
├── relatorios.html         # Relatórios e backup
│
├── css/
│   └── style.css           # Todos os estilos: layout, componentes e responsividade
│
├── js/
│   ├── armazenamento.js    # Lê e salva dados no localStorage
│   ├── dados.js            # Define a estrutura inicial e inicializa os dados
│   ├── funcoes.js          # Funções auxiliares: formatar data, gerar ID, validar campos
│   ├── equipamentos.js     # Lógica de equipamentos: CRUD, validações e histórico
│   ├── manutencoes.js      # Lógica de manutenções: CRUD, validações e histórico
│   ├── cadastros.js        # Lógica de locais e técnicos
│   ├── dashboard.js        # Calcula e exibe os indicadores do painel
│   └── relatorios.js       # Gera relatórios e cuida do backup
│
├── assets/
│   └── imagens/            # Imagens e ícones do projeto
│
├── .gitignore
├── README.md
├── PROJECT_SPEC.md
└── GUIA_DE_APRESENTACAO.md
```

### Por que separar em arquivos?

Se toda a lógica ficasse em um único arquivo, ele teria centenas de linhas misturando equipamentos, manutenções, relatórios e tudo mais. Separar por responsabilidade faz com que, por exemplo, tudo relacionado a manutenções fique em `manutencoes.js`. Fica mais fácil encontrar o que precisa mudar, mais fácil de explicar e mais fácil de testar.

### Formulários embutidos nas páginas

Os formulários de cadastro e edição ficam dentro das próprias páginas de listagem — eles aparecem quando o usuário clica em "Novo" ou "Editar" e somem após salvar. Isso evita criar uma página HTML separada para cada formulário e simplifica a navegação.

---

## 5. Conteúdos das aulas aplicados

Esta seção mostra como cada conteúdo estudado na disciplina aparece no projeto.

| Conteúdo da aula                          | Onde aparece no TechTrack                                               |
|-------------------------------------------|-------------------------------------------------------------------------|
| Arquitetura da Web                        | Projeto funciona como site estático multipágina, sem servidor           |
| HTML e elementos textuais                 | Títulos, parágrafos e textos em todas as páginas                        |
| Listas, tabelas e formulários             | Tabelas de equipamentos, formulários de cadastro, listas do histórico   |
| Introdução ao CSS                         | Estilos base, cores, fontes e reset em `style.css`                      |
| Box Model, Display e Visibility           | Espaçamento de cards, visibilidade de formulários e mensagens           |
| Flexbox e Grid                            | Layout com menu lateral e área de conteúdo; grade de cards no dashboard |
| Posicionamento, Media Queries e Viewport  | Adaptação do layout para celulares, tablets e desktops                  |
| Introdução ao JavaScript, BOM e funções   | Funções utilitárias, `window.location` para navegar entre páginas       |
| DOM                                       | Renderização dinâmica de tabelas, formulários e indicadores             |
| Intervalos e eventos                      | `addEventListener` para cliques, envio de formulários e digitação       |
| JSON e orientação a objetos               | Estrutura de dados, `JSON.stringify` e `JSON.parse`                     |
| Web Storage, Promises, async e await      | `localStorage` para persistência; `async/await` na leitura de arquivos  |

> Ao mostrar cada funcionalidade durante a apresentação, mencione qual conteúdo da aula ela demonstra. Isso mostra que você compreendeu a aplicação prática do que foi estudado.

---

## 6. Explicação das funcionalidades

🔧 *Esta seção será preenchida conforme as funcionalidades forem implementadas. Para cada uma, serão explicados: o que faz, como funciona por dentro e como demonstrar ao professor.*

### 6.1 Dashboard

*A ser preenchido na etapa 07 — Dashboard e histórico.*

### 6.2 Equipamentos

*A ser preenchido na etapa 04 — CRUD de equipamentos.*

### 6.3 Manutenções

*A ser preenchido na etapa 06 — CRUD de manutenções.*

### 6.4 Locais e Técnicos

*A ser preenchido na etapa 05 — CRUD de locais e técnicos.*

### 6.5 Histórico

*A ser preenchido na etapa 07 — Dashboard e histórico.*

### 6.6 Relatórios e Backup

*A ser preenchido na etapa 08 — Relatórios e backup.*

### 6.7 QR Code

*A ser preenchido na etapa 09 — QR Code e etiquetas.*

---

## 7. Exemplos de código comentados

🔧 *Esta seção será preenchida com exemplos reais do código do projeto, à medida que as funcionalidades forem implementadas. Cada exemplo incluirá comentários explicando o que o código faz e qual conceito da aula ele demonstra.*

---

## 8. Funcionamento do localStorage e JSON

### O que é o localStorage?

O `localStorage` é uma funcionalidade do navegador que permite guardar informações de texto entre sessões. Diferente de uma variável JavaScript (que some quando você fecha a página), os dados no `localStorage` continuam lá até serem apagados manualmente ou pelo código.

### Como o TechTrack usa o localStorage?

Todos os dados do sistema — equipamentos, manutenções, locais, técnicos e histórico — ficam guardados em uma única entrada do `localStorage`, com a chave `techtrack:data:v1`.

O valor armazenado é uma string de texto no formato JSON. JSON é uma forma de representar objetos e arrays JavaScript como texto, que pode ser salvo e recuperado facilmente.

### A estrutura dos dados

```javascript
{
  versao: 1,
  atualizadoEm: "2025-01-01T00:00:00.000Z",
  dados: {
    equipamentos: [],
    manutencoes: [],
    locais: [],
    tecnicos: [],
    eventos: []
  }
}
```

### Como funciona na prática

🔧 *Exemplos de código reais serão adicionados quando `armazenamento.js` for implementado na etapa 03.*

O princípio geral é:

1. **Ler os dados:** pegar a string do localStorage e converter de volta para objeto JavaScript com `JSON.parse`.
2. **Modificar os dados:** trabalhar com o objeto normalmente (adicionar, editar, remover itens dos arrays).
3. **Salvar os dados:** converter o objeto para string com `JSON.stringify` e guardar no localStorage.

### Por que um único objeto?

Manter todos os dados em um único objeto facilita o backup. Ao exportar, basta pegar esse objeto e salvar como arquivo. Ao importar, basta validar e restaurar esse mesmo objeto. Também simplifica o código de leitura e escrita, pois há uma única função para ler e uma para salvar.

---

## 9. Manipulação do DOM e eventos

### O que é o DOM?

DOM significa *Document Object Model*. É a representação da página HTML como uma estrutura de objetos que o JavaScript consegue ler e modificar. Quando o sistema exibe uma tabela de equipamentos na tela, ele está criando elementos HTML via JavaScript e inserindo-os no DOM.

### Como o TechTrack usa o DOM?

🔧 *Exemplos reais serão adicionados conforme as funcionalidades forem implementadas.*

O projeto utiliza o DOM para:

- Renderizar tabelas com os dados lidos do localStorage.
- Mostrar e esconder formulários e mensagens de erro.
- Preencher campos de um formulário ao editar um registro existente.
- Atualizar os indicadores do dashboard sem precisar recarregar a página.

### Como funcionam os eventos?

Eventos são ações do usuário — clicar em um botão, enviar um formulário, digitar em um campo. O JavaScript "escuta" essas ações com o método `addEventListener` e executa uma função quando elas acontecem.

🔧 *Exemplos de código com `addEventListener` serão adicionados quando os formulários forem implementados nas etapas 04 a 06.*

---

## 10. Regras de negócio

As regras de negócio são as restrições e comportamentos que o sistema garante automaticamente. Conhecê-las é fundamental para explicar o projeto.

### RN-01 — Patrimônio único
Dois equipamentos não podem ter o mesmo número de patrimônio. Antes de salvar, o sistema verifica se já existe outro equipamento com o mesmo valor.

### RN-02 — Número de série único
O número de série é opcional, mas se preenchido, não pode se repetir entre equipamentos.

### RN-03 — Local obrigatório e válido
Todo equipamento precisa estar em um local. Não é possível cadastrar um equipamento sem selecionar um local que já esteja cadastrado no sistema.

### RN-04 — Restrição de manutenção para equipamento inativo ou descartado
Se um equipamento foi desativado ou descartado, o sistema não permite abrir uma nova manutenção para ele.

### RN-05 — Uma manutenção ativa por equipamento
Um equipamento não pode estar em duas manutenções ao mesmo tempo. Antes de permitir uma nova, o sistema verifica se já existe uma em andamento ou aberta.

### RN-06 — Técnico inativo não recebe manutenções
Se um técnico foi inativado, ele não pode receber novas atribuições de manutenção.

### RN-07 — Restrição de exclusão por relacionamento
O sistema não permite apagar um local que tenha equipamentos associados, nem um técnico que tenha manutenções associadas. Isso evita que dados fiquem sem referência válida.

### RN-08 — Situação operacional calculada
O sistema determina automaticamente se um equipamento está "operacional" ou "em manutenção" com base nas manutenções ativas. Esse valor nunca é preenchido manualmente — é sempre calculado.

### RN-09 — Manutenção atrasada
Uma manutenção com prazo definido que ainda não foi concluída e já passou da data limite é marcada automaticamente como atrasada.

### RN-10 — Garantia próxima do vencimento
Quando faltam 30 dias ou menos para a garantia de um equipamento vencer, o dashboard destaca esse equipamento como alerta.

---

## 11. Como o projeto é executado

### O que é um servidor estático local?

Quando você abre um arquivo HTML diretamente pelo sistema de arquivos (clicando duas vezes nele), o navegador usa o protocolo `file://`. Alguns navegadores restringem certas funcionalidades JavaScript nesse modo — por exemplo, leitura de arquivos locais pode se comportar de forma diferente.

Para evitar esses problemas, usa-se um **servidor estático local**: um programa simples que serve os arquivos do projeto como se fosse um site, mas rodando na sua própria máquina. Ele não processa nada no servidor — apenas entrega os arquivos HTML, CSS e JavaScript para o navegador. Todo o processamento ainda acontece no navegador.

### Como executar o TechTrack

🔧 *A ser detalhado quando a estrutura HTML estiver implementada (etapa 01).*

A forma recomendada é usar a extensão **Live Server** do VS Code (ou do Kiro IDE). Ela inicia um servidor estático local automaticamente ao abrir o projeto e atualiza a página quando um arquivo é salvo.

Passos gerais:
1. Abra a pasta do projeto no VS Code ou Kiro IDE.
2. Instale a extensão Live Server, se ainda não estiver instalada.
3. Clique com o botão direito no `index.html` e selecione "Open with Live Server".
4. O navegador abrirá o projeto em `http://localhost:5500` (ou porta similar).

**Importante:** o Live Server é apenas um servidor de arquivos. Ele não representa um backend, não processa dados e não conecta a um banco de dados. O TechTrack continua sendo uma aplicação 100% frontend.

---

## 12. Roteiro de demonstração

🔧 *O roteiro detalhado será elaborado quando as funcionalidades estiverem implementadas. Ele seguirá uma sequência lógica para demonstrar o sistema em funcionamento ao professor.*

### Sequência prevista

1. **Introdução** — apresentar o projeto e o problema que resolve.
2. **Cadastros auxiliares** — criar um local e um técnico responsável.
3. **Equipamentos** — cadastrar dois ou três equipamentos, mostrando as validações em ação.
4. **Dashboard** — mostrar os indicadores sendo calculados automaticamente.
5. **Manutenções** — abrir uma manutenção, mostrar a mudança na situação operacional do equipamento.
6. **Histórico** — mostrar os eventos registrados automaticamente.
7. **Relatórios** — exibir um relatório de equipamentos por categoria.
8. **Backup** — exportar os dados como JSON e importar de volta.
9. **QR Code** — gerar e baixar uma etiqueta. *(funcionalidade adicional)*

---

## 13. Conceitos para entender e explicar

Esta seção apresenta os conceitos técnicos mais importantes do projeto. O objetivo não é decorar respostas — é entender o suficiente para explicar com suas próprias palavras.

---

### Por que não usaram React ou Vue?

React e Vue resolvem problemas de aplicações com muita atualização de estado simultânea — como um feed de redes sociais ou um editor colaborativo. Para páginas HTML com operações simples de cadastro, JavaScript puro é suficiente e mais direto. Além disso, esses frameworks não foram estudados na disciplina.

---

### Por que não há um banco de dados?

Banco de dados exige um servidor rodando em algum lugar para receber e responder requisições. O TechTrack é uma aplicação frontend — todo o processamento acontece no navegador do usuário. Para o volume de dados de uma pequena empresa, o `localStorage` cumpre o papel de persistência sem essa complexidade.

---

### Como os dados não se perdem ao fechar o navegador?

O `localStorage` é diferente das variáveis JavaScript normais. Uma variável existe apenas enquanto a página está aberta. O `localStorage` guarda os dados no próprio navegador e eles continuam lá mesmo depois de fechar e reabrir — até que sejam apagados explicitamente.

---

### O que é o JSON.stringify e o JSON.parse?

O `localStorage` só consegue guardar texto. Os dados do sistema são objetos JavaScript (com arrays, números, booleanos etc.), que não podem ser guardados diretamente. O `JSON.stringify` converte um objeto para texto, permitindo salvá-lo. O `JSON.parse` faz o caminho inverso: converte o texto de volta para um objeto JavaScript para ser usado no código.

---

### Por que há uma versão na chave do localStorage (`v1`)?

Se a estrutura dos dados mudar em versões futuras do sistema, o código consegue detectar que os dados são de uma versão antiga e fazer a migração corretamente. Sem isso, dados antigos poderiam causar erros ou ser perdidos numa atualização.

---

### Por que um único objeto no localStorage em vez de uma chave por entidade?

Com um único objeto, exportar o backup é simples: basta pegar esse objeto e salvar como arquivo. Importar também é simples: validar e restaurar esse mesmo objeto. Se houvesse uma chave por entidade (uma para equipamentos, outra para manutenções etc.), seria necessário ler e escrever várias chaves ao mesmo tempo, e o backup exigiria lógica adicional para reunir tudo.

---

### O que é um servidor estático local e por que é diferente de um backend?

Um servidor estático local (como o Live Server) apenas entrega os arquivos — HTML, CSS e JavaScript — para o navegador. Ele não executa lógica, não acessa banco de dados e não processa dados. É equivalente a abrir o arquivo diretamente no navegador, mas sem as restrições do protocolo `file://`. Todo o processamento do TechTrack acontece no navegador, não no servidor.

---

### Por que o CSS não usa framework?

Usar Bootstrap ou Tailwind geraria o estilo automaticamente, mas o código CSS real ficaria escondido. Para uma disciplina que ensina CSS, faz mais sentido escrever o estilo diretamente — assim você consegue explicar por que um elemento está posicionado de determinada forma, qual propriedade controla o espaçamento e como o layout se adapta a diferentes tamanhos de tela.

---

## 14. Limitações e decisões técnicas

### Limitações conhecidas

| Limitação                           | Motivo                                                                |
|-------------------------------------|-----------------------------------------------------------------------|
| Dados ficam apenas no navegador     | Sem backend, não há sincronização entre dispositivos ou usuários      |
| Sem controle de acesso              | Fora do escopo; qualquer pessoa com acesso ao computador vê os dados  |
| Sem gráficos elaborados             | Relatórios usam tabelas; gráficos demandariam biblioteca extra        |
| Sem leitura de QR Code pela câmera  | Requereria acesso à câmera; fora do escopo desta versão               |
| Limite de ~5 MB no localStorage     | Suficiente para o uso previsto, mas não escalável                     |

### Decisões técnicas

| Decisão                         | Alternativa considerada        | Por que foi escolhida                                        |
|---------------------------------|--------------------------------|--------------------------------------------------------------|
| MPA (múltiplas páginas HTML)    | SPA (página única com JS)      | Mais simples, mais próxima das aulas, mais fácil de explicar |
| Formulários embutidos nas páginas | Páginas separadas por formulário | Menos arquivos, navegação mais direta                      |
| Um único arquivo CSS            | Múltiplos arquivos CSS         | Projeto de porte pequeno; um arquivo é mais simples de manter|
| Um único objeto no localStorage | Uma chave por entidade         | Facilita backup e importação; código mais simples            |
| CSS escrito manualmente         | Bootstrap ou Tailwind          | Exige compreensão real do CSS; exigência do escopo           |
| qrcode.js local                 | CDN ou API de QR Code          | Funciona offline; sem dependência externa                    |

---

## 15. Roadmap

| Etapa | Descrição                                        | Situação       |
|-------|--------------------------------------------------|----------------|
| 00    | Fundação e documentação                          | ✅ Concluída    |
| 00.1  | Alinhamento documental                           | ✅ Concluída    |
| 01    | Estrutura HTML e navegação                       | 🔧 Pendente    |
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

*Última atualização: Etapa 00.1 — Alinhamento documental.*
*Este documento será expandido a cada etapa de implementação.*
