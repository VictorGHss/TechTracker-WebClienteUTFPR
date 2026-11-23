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

### 6.1 Estrutura HTML e navegação ✅ Etapa 01

#### O que é HTML semântico?

HTML semântico significa usar o elemento certo para cada finalidade. O HTML tem elementos que descrevem o significado do conteúdo, não apenas a aparência. Isso ajuda o navegador, leitores de tela e outros desenvolvedores a entenderem para que serve cada parte da página.

Comparação:

```html
<!-- Sem semântica: só diz que é um bloco -->
<div class="cabecalho">...</div>

<!-- Com semântica: diz exatamente que é um cabeçalho -->
<header>...</header>
```

#### Os elementos semânticos do TechTrack

Todas as páginas do projeto compartilham a mesma estrutura básica:

```html
<nav>      <!-- Navegação lateral: links para as páginas do sistema -->
<header>   <!-- Cabeçalho da página: título e descrição da seção -->
<main>     <!-- Conteúdo principal: tabelas, formulários, indicadores -->
<section>  <!-- Seção dentro do main: agrupa conteúdo relacionado -->
<footer>   <!-- Rodapé: informação institucional do projeto -->
```

**Por que não usar `<div>` para tudo?**
`<div>` é genérico — não diz nada sobre o conteúdo. `<nav>` diz que é uma área de navegação. `<main>` diz que é o conteúdo principal. Usar o elemento certo é uma boa prática que torna o código mais legível e mais acessível.

#### Como a navegação foi implementada

A navegação é um elemento `<nav>` com uma lista `<ul>` de links. Em vez de repetir código diferente em cada página, todas as páginas compartilham exatamente a mesma estrutura de navegação. O link da página atual recebe o atributo `aria-current="page"`, que indica para leitores de tela que aquele item corresponde à página em que o usuário está.

Trecho real do `index.html`:

```html
<nav id="nav-principal" aria-label="Navegação principal">
  <ul class="nav-lista">
    <li class="nav-item">
      <a href="index.html" class="nav-link" aria-current="page">
        Dashboard
      </a>
    </li>
    <li class="nav-item">
      <a href="equipamentos.html" class="nav-link">
        Equipamentos
      </a>
    </li>
    <!-- ... demais links ... -->
  </ul>
</nav>
```

**O que é `aria-current="page"`?**
É um atributo de acessibilidade. `aria` significa *Accessible Rich Internet Applications*. O valor `"page"` indica que aquele link aponta para a página atual. O CSS usará isso na próxima etapa para destacar visualmente o item ativo.

#### Como funcionam os links entre páginas

O TechTrack usa múltiplas páginas HTML. Navegar entre elas é simples: cada link `<a href="...">` aponta para o arquivo HTML correspondente. Os caminhos são relativos — não precisam de servidor nem de endereço absoluto.

```html
<!-- Da index.html para a página de equipamentos -->
<a href="equipamentos.html">Equipamentos</a>

<!-- Da equipamentos.html de volta para a index -->
<a href="index.html">Dashboard</a>
```

Quando o usuário clica em um link, o navegador carrega o arquivo HTML correspondente do mesmo diretório.

#### Tabelas HTML

As páginas de listagem (equipamentos, manutenções, locais, técnicos) usam tabelas para exibir os dados. Uma tabela HTML bem estruturada tem:

- `<table>`: o elemento raiz da tabela
- `<thead>`: agrupa a linha de cabeçalho
- `<tbody>`: agrupa as linhas de dados
- `<tr>`: uma linha da tabela
- `<th scope="col">`: célula de cabeçalho de coluna
- `<td>`: célula de dado

Trecho real do `equipamentos.html`:

```html
<table id="tabela-equipamentos">
  <thead>
    <tr>
      <th scope="col">Patrimônio</th>
      <th scope="col">Equipamento</th>
      <th scope="col">Categoria</th>
      <th scope="col">Localização</th>
      <th scope="col">Situação</th>
      <th scope="col">Ações</th>
    </tr>
  </thead>
  <tbody id="corpo-tabela-equipamentos">
    <!-- Linhas inseridas pelo JavaScript -->
  </tbody>
</table>
```

**Por que `scope="col"`?** Indica que aquele `<th>` é o cabeçalho de uma coluna. Isso ajuda leitores de tela a relacionar cada célula de dado com seu cabeçalho correto.

#### Por que usar múltiplas páginas?

O TechTrack é uma MPA — *Multi-Page Application*. Cada funcionalidade tem sua própria página HTML. Isso é mais próximo do modelo que foi estudado na disciplina: cada arquivo HTML é uma página completa, com seu próprio cabeçalho, conteúdo e rodapé. O navegador carrega uma nova página a cada navegação.

A alternativa seria uma SPA (*Single-Page Application*), onde há apenas um HTML e o JavaScript troca o conteúdo sem recarregar. Isso exigiria mais JavaScript e seria mais difícil de explicar para a disciplina.

#### Conteúdo das aulas relacionado (aulas 2 e 3)

| Conceito da aula                   | Onde aparece no TechTrack                            |
|------------------------------------|------------------------------------------------------|
| Elementos textuais (h1–h3, p)      | Títulos das páginas, descrições das seções           |
| Elementos estruturais (header, nav, main, footer) | Estrutura de todas as 6 páginas       |
| Listas (ul, li)                    | Navegação, indicadores do dashboard, histórico       |
| Tabelas (table, thead, tbody, th)  | Equipamentos, manutenções, locais, técnicos          |
| Formulários (input, select, label) | Campos de busca e filtros (preparados, ainda inativos)|
| Atributos de acessibilidade        | `aria-label`, `aria-current`, `aria-labelledby`      |

---

### 6.2 Identidade visual e CSS ✅ Etapa 02

#### O que é CSS?

CSS significa *Cascading Style Sheets* — Folhas de Estilo em Cascata. É a linguagem que define a aparência do HTML: cores, tamanhos, espaçamentos, posições e comportamento visual.

Enquanto o HTML define **o que** existe na página, o CSS define **como** isso aparece.

Exemplo direto do projeto:

```css
/* Define a cor de fundo da página e a fonte */
body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: var(--cor-fundo);
  color: var(--cor-texto);
}
```

#### Variáveis CSS (`:root`)

Para não repetir as mesmas cores e tamanhos em vários lugares, o TechTrack usa variáveis CSS. Elas são definidas uma vez em `:root` e usadas em todo o arquivo com `var(--nome)`.

```css
:root {
  --cor-azul:       #2563EB;
  --cor-fundo:      #F1F5F9;
  --cor-superficie: #FFFFFF;
  --espaco-md:      1rem;    /* 16px */
}

/* Uso: */
.nav-link[aria-current="page"] {
  background-color: var(--cor-azul);
  color: #FFFFFF;
}
```

**Por que usar variáveis?** Se precisar mudar a cor azul do sistema, basta alterar em um lugar — `:root` — e a mudança se aplica em todo o CSS automaticamente.

#### Box Model

Todo elemento HTML é uma caixa com quatro camadas:

```
+---------------------------+
|        margin             |  ← espaço externo (fora da borda)
|  +---------------------+  |
|  |      border         |  |  ← borda
|  |  +---------------+  |  |
|  |  |    padding    |  |  |  ← espaço interno (entre borda e conteúdo)
|  |  |  +---------+  |  |  |
|  |  |  | conteúdo|  |  |  |
|  |  |  +---------+  |  |  |
|  |  +---------------+  |  |
|  +---------------------+  |
+---------------------------+
```

No TechTrack, `box-sizing: border-box` faz com que o `padding` e a `border` sejam incluídos dentro da largura declarada — sem isso, adicionar padding aumentaria o tamanho do elemento além do esperado.

#### Flexbox — como foi usado

Flexbox organiza elementos em uma linha ou coluna, distribuindo o espaço entre eles. O TechTrack usa Flexbox em três lugares principais:

**1. Layout geral da página (nav + conteúdo lado a lado):**

```css
body {
  display: flex;        /* Ativa o Flexbox */
  min-height: 100vh;    /* Ocupa toda a altura da tela */
}

.pagina-wrapper {
  flex: 1;   /* Ocupa todo o espaço restante após a nav */
}
```

**2. Navegação lateral (itens empilhados em coluna):**

```css
#nav-principal {
  display: flex;
  flex-direction: column;  /* Logo em cima, links embaixo */
  width: 240px;
  position: sticky;        /* Fica fixo ao rolar a página */
  height: 100vh;
}
```

**3. Barra de ações (pesquisa + filtros + botão em linha):**

```css
#barra-acoes {
  display: flex;
  flex-wrap: wrap;       /* Quebra linha se não couber */
  align-items: flex-end; /* Alinha tudo pela base */
  gap: var(--espaco-md);
}
```

#### Grid — como foi usado

CSS Grid organiza elementos em grades bidimensionais (linhas e colunas). O TechTrack usa Grid nos cards de indicadores e nos dados de detalhes do equipamento.

**Cards de indicadores do dashboard:**

```css
.lista-indicadores {
  display: grid;
  /* Cria colunas automáticas: cada uma com no mínimo 160px,
     e o restante do espaço é dividido igualmente */
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--espaco-md);
}
```

**Dados de detalhes do equipamento (rótulo + valor):**

```css
.lista-dados {
  display: grid;
  grid-template-columns: 1fr 2fr;  /* Rótulo ocupa 1 parte, valor ocupa 2 */
  gap: var(--espaco-sm) var(--espaco-md);
}
```

#### Media Queries — como funcionam

Media Queries permitem aplicar estilos diferentes dependendo do tamanho da tela. O TechTrack tem três breakpoints:

```css
/* Tablet: tela até 1023px */
@media (max-width: 1023px) {
  :root {
    --nav-largura: 200px; /* Nav um pouco mais estreita */
  }
  #conteudo-principal {
    padding: var(--espaco-md) var(--espaco-lg); /* Menos espaço lateral */
  }
}

/* Celular: tela até 767px */
@media (max-width: 767px) {
  body {
    flex-direction: column; /* Nav vai para cima, conteúdo fica abaixo */
  }
  #nav-principal {
    width: 100%;
    height: auto;
    position: static; /* Sai do sticky */
  }
  .nav-lista {
    display: flex;    /* Links viram linha horizontal */
    flex-wrap: wrap;
  }
}
```

**Como o layout se adapta ao celular:** a nav lateral (que fica à esquerda no desktop) vira uma barra horizontal no topo. Os cards de indicadores, que ficam em 3 colunas no desktop, passam para 2 colunas. As listas de dados passam de 2 para 1 coluna.

#### Como as classes CSS são aplicadas ao HTML

No HTML, cada elemento recebe um `class` ou `id`. No CSS, escrevemos regras que selecionam esses elementos.

```html
<!-- HTML: elemento com classe "card-indicador" -->
<li class="card-indicador">
  <span class="indicador-valor">—</span>
  <span class="indicador-label">Total cadastrado</span>
</li>
```

```css
/* CSS: regra que estiliza qualquer elemento com essa classe */
.card-indicador {
  background-color: var(--cor-azul-suave);
  border: 1px solid var(--cor-borda);
  border-radius: 6px;         /* Cantos arredondados */
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
```

#### Agrupamento dos filtros com `.campo-filtro`

Para que label e select de cada filtro se comportem como uma unidade, o HTML de `equipamentos.html` usa uma `<div class="campo-filtro">` em volta de cada par:

```html
<div class="acoes-filtros">
  <div class="campo-filtro">
    <label for="filtro-categoria">Categoria</label>
    <select id="filtro-categoria" disabled>...</select>
  </div>
  <div class="campo-filtro">
    <label for="filtro-situacao">Situação</label>
    <select id="filtro-situacao" disabled>...</select>
  </div>
  <div class="campo-filtro">
    <label for="filtro-local">Localização</label>
    <select id="filtro-local" disabled>...</select>
  </div>
</div>
```

```css
/* Três filtros em colunas iguais no desktop */
.acoes-filtros {
  display: grid;
  grid-template-columns: repeat(3, minmax(130px, 1fr));
}

/* Cada .campo-filtro empilha label e select em coluna */
.campo-filtro {
  display: flex;
  flex-direction: column;
  gap: var(--espaco-xs);
}
```

#### `auto-fit` nos cards do dashboard

```css
/* auto-fit colapsa colunas vazias, mantendo os cards agrupados à esquerda */
.lista-indicadores {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 220px));
  gap: var(--espaco-md);
}
```

**Diferença entre `auto-fill` e `auto-fit`:** `auto-fill` cria colunas vazias mesmo sem conteúdo, esticando os cards. `auto-fit` colapsa as colunas extras, deixando os cards com tamanho máximo de 220px e agrupados à esquerda.

| Conceito da aula | Onde aparece no TechTrack |
|---|---|
| Introdução ao CSS — seletores, propriedades | Todas as 971 linhas do `style.css` |
| Box Model — margin, padding, border | Reset com `box-sizing`, espaçamentos com `--espaco-*` |
| Display — block, flex, grid | Layout da página, cards, barra de ações |
| Flexbox | Nav lateral, layout body, barra de ações |
| Grid | Cards de indicadores, lista de dados |
| Pseudo-classes — :hover, :focus, :disabled | Links, botões, campos de formulário |
| Variáveis CSS | Paleta centralizada em `:root` |
| Media Queries e Viewport | Breakpoints de 1023px, 767px e 400px |

### 6.3 Modelagem de dados e localStorage ✅ Etapa 03

#### O que são objetos JavaScript?

Um objeto JavaScript é uma coleção de propriedades. Cada propriedade tem um nome e um valor. O valor pode ser um texto, um número, um booleano, outro objeto ou até uma função.

No TechTrack, cada equipamento é representado como um objeto:

```javascript
// Um equipamento é um objeto com vários campos
var equipamento = {
    id: "m2bexkr4g05k9p",
    patrimonio: "TT-0001",
    categoria: "notebook",
    fabricante: "Dell",
    modelo: "Latitude 5420",
    numeroSerie: "ABC123",
    dataAquisicao: "2025-02-10",
    dataGarantia: "2027-02-10",
    localId: "m2bexkr4g09z1x",
    situacaoAdministrativa: "ativo",
    criadoEm: "2026-11-23T18:30:00.000Z",
    atualizadoEm: "2026-11-23T18:30:00.000Z"
};

// Acessar um campo:
console.log(equipamento.patrimonio);   // "TT-0001"
console.log(equipamento.categoria);   // "notebook"
```

#### O que são arrays?

Um array é uma lista ordenada de valores. No TechTrack, cada coleção de registros é um array de objetos.

```javascript
// Um array vazio — ainda sem equipamentos cadastrados
var equipamentos = [];

// Um array com dois equipamentos
var equipamentos = [
    { id: "abc", patrimonio: "TT-0001", ... },
    { id: "def", patrimonio: "TT-0002", ... }
];

// Acessar pelo índice (começa em zero):
console.log(equipamentos[0].patrimonio);  // "TT-0001"
console.log(equipamentos.length);         // 2
```

#### Como as cinco entidades foram estruturadas

O sistema trabalha com cinco tipos de registro, cada um com seus próprios campos:

| Entidade | Campos obrigatórios principais |
|---|---|
| Equipamento | id, patrimonio, categoria, fabricante, modelo, dataAquisicao, localId, situacaoAdministrativa |
| Manutenção | id, equipamentoId, tecnicoId, tipo, prioridade, descricao, estado |
| Local | id, nome |
| Técnico | id, nome, ativo |
| Evento histórico | id, tipo, descricao |

Todos os registros têm um campo `id` que os identifica de forma única, e todos têm `criadoEm` com o momento em que foram criados.

#### Como os identificadores relacionam os registros

Os registros se relacionam por referência de id — um equipamento guarda o `localId` do local onde está instalado, e uma manutenção guarda o `equipamentoId` e o `tecnicoId` associados.

```javascript
// Local cadastrado:
var local = { id: "loc01", nome: "Sala de Servidores" };

// Equipamento que aponta para esse local:
var equipamento = { id: "eq01", patrimonio: "TT-0001", localId: "loc01", ... };

// Para exibir o nome do local do equipamento, o código buscará
// o local cujo id seja igual ao localId do equipamento.
```

Essa abordagem é chamada de relacionamento por referência e é equivalente a uma chave estrangeira em banco de dados.

---

#### O que é JSON?

JSON significa *JavaScript Object Notation* — é um formato de texto para representar objetos e arrays JavaScript. JSON é amplamente usado para trocar dados entre sistemas e para armazená-los em arquivos de texto.

**Para que serve `JSON.stringify`?**

Converte um objeto JavaScript em uma string de texto no formato JSON. É usado para salvar os dados no localStorage, que só aceita texto.

```javascript
var equipamento = { id: "abc", patrimonio: "TT-0001", categoria: "notebook" };

// Converte o objeto para texto JSON
var texto = JSON.stringify(equipamento);

console.log(texto);
// '{"id":"abc","patrimonio":"TT-0001","categoria":"notebook"}'
// ^ tudo virou uma string — pode ser armazenada no localStorage
```

**Para que serve `JSON.parse`?**

Faz o caminho inverso: converte uma string de texto no formato JSON de volta para um objeto JavaScript. É usado ao recuperar os dados do localStorage.

```javascript
var texto = '{"id":"abc","patrimonio":"TT-0001","categoria":"notebook"}';

// Converte o texto de volta para objeto
var equipamento = JSON.parse(texto);

console.log(equipamento.patrimonio);  // "TT-0001"
console.log(equipamento.categoria);  // "notebook"
```

**Por que o localStorage precisa de strings?**

O localStorage é um mecanismo de armazenamento de texto — ele só consegue guardar e devolver strings. Um objeto JavaScript não pode ser guardado diretamente porque não é texto. `JSON.stringify` resolve isso: transforma o objeto em uma representação textual padronizada, e `JSON.parse` desfaz essa transformação ao recuperar os dados.

---

#### O que é o localStorage?

O `localStorage` é uma API do navegador que permite guardar pares de chave e valor como texto. Diferente das variáveis JavaScript normais, os dados no `localStorage` continuam existindo mesmo depois de fechar a aba ou o navegador — até que sejam apagados explicitamente.

**Diferença entre variáveis e armazenamento persistente:**

```javascript
// Variável comum: existe apenas enquanto a página está aberta
var nome = "Carlos";
// Fechar o navegador → "Carlos" desaparece

// localStorage: persiste entre sessões
localStorage.setItem("nome", "Carlos");
// Fechar o navegador → abrir de novo → "Carlos" ainda está lá
var nome = localStorage.getItem("nome");  // "Carlos"
```

**Como funcionam `getItem` e `setItem`:**

```javascript
// Salvar um valor — setItem(chave, valor)
localStorage.setItem("techtrack:data:v1", textoJson);

// Recuperar um valor — getItem(chave)
var texto = localStorage.getItem("techtrack:data:v1");
// Se a chave não existir, getItem retorna null

// Remover — removeItem(chave)
localStorage.removeItem("techtrack:data:v1");
```

**Como os dados permanecem após atualizar ou fechar a página:**

O `localStorage` é gerenciado pelo navegador e armazenado no disco do computador, não na memória da aba. Por isso, recarregar a página ou fechar o navegador não apaga os dados. Eles só são removidos se o código chamar `removeItem` / `clear`, se o usuário limpar os dados do navegador, ou se a origem (domínio) for diferente.

---

#### Para que serve cada arquivo JavaScript?

O código JavaScript do TechTrack é dividido em três arquivos, cada um com uma responsabilidade clara:

| Arquivo | Responsabilidade |
|---|---|
| `dados.js` | Define a estrutura dos dados, cria o objeto global TechTrack, valida a estrutura recuperada do storage |
| `funcoes.js` | Funções auxiliares simples: gerar identificador único, obter data/hora atual |
| `armazenamento.js` | Lê e grava no localStorage, converte entre objeto e JSON, trata erros de leitura e gravação |

#### Como funciona o objeto compartilhado TechTrack

Como os três arquivos são carregados separadamente pelo navegador, eles precisam de um ponto de encontro para compartilhar funções. Esse ponto é o objeto `window.TechTrack`.

`window` é o objeto global do navegador — tudo que for colocado nele está acessível em qualquer parte do código JavaScript da página.

```javascript
// Em dados.js (carregado primeiro):
window.TechTrack = window.TechTrack || {};
// Se TechTrack já existir, mantém. Se não, cria um objeto vazio.

TechTrack.CHAVE_ARMAZENAMENTO = "techtrack:data:v1";
TechTrack.validarEstrutura = function (obj) { ... };

// Em funcoes.js (carregado segundo):
window.TechTrack = window.TechTrack || {};
// TechTrack já existe — apenas adiciona as funções deste arquivo

TechTrack.gerarId = function () { ... };

// Em armazenamento.js (carregado terceiro):
// TechTrack.validarEstrutura e TechTrack.gerarId já estão disponíveis
TechTrack.carregarDados = function () {
    // pode chamar TechTrack.validarEstrutura() porque dados.js já foi carregado
    var resultado = TechTrack.validarEstrutura(objeto);
};
```

A linha `window.TechTrack = window.TechTrack || {}` em cada arquivo é uma proteção: se por algum motivo a ordem de carregamento for alterada, o objeto não será recriado do zero — o que já estava nele será preservado.

#### Como os scripts são carregados com `defer`

O atributo `defer` no `<script>` instrui o navegador a baixar o arquivo sem pausar a renderização do HTML, executando-o somente depois que o HTML inteiro for analisado.

```html
<!-- Sem defer: o navegador para de renderizar o HTML para executar o script -->
<script src="js/dados.js"></script>

<!-- Com defer: o HTML é renderizado normalmente; o script executa por último -->
<script src="js/dados.js" defer></script>
```

Com `defer`, todos os scripts são executados na ordem em que aparecem no HTML, após o documento estar pronto. Por isso a ordem das tags `<script>` importa:

```html
<script src="js/dados.js" defer></script>        <!-- 1º: cria TechTrack -->
<script src="js/funcoes.js" defer></script>      <!-- 2º: adiciona gerarId, obterDataHoraAtual -->
<script src="js/armazenamento.js" defer></script> <!-- 3º: adiciona carregarDados, salvarDados -->
```

Se `armazenamento.js` fosse carregado antes de `dados.js`, a chamada a `TechTrack.validarEstrutura()` dentro de `armazenamento.js` falharia porque a função ainda não teria sido definida.

---

#### Por que não usamos async/await nas operações do localStorage?

O `localStorage` é **síncrono**: `getItem` e `setItem` executam imediatamente e retornam o resultado na mesma linha de código, sem esperar por nenhuma operação de rede ou disco. Não há nada a aguardar — a operação termina antes da próxima linha começar.

```javascript
// Síncrono — retorna imediatamente, sem await
var texto = localStorage.getItem("techtrack:data:v1");
console.log(texto); // já tem o valor aqui

// async/await seria necessário aqui:
var resposta = await fetch("https://api.exemplo.com/dados");
// ^ precisa aguardar a resposta da rede, que pode demorar
```

`async/await` será usado futuramente quando o TechTrack implementar a leitura de arquivos para o backup — porque ler um arquivo do disco do usuário é uma operação genuinamente assíncrona.

---

#### Demonstração pelo console do navegador

Abra qualquer página do TechTrack no navegador (via Live Server), pressione **F12** para abrir as ferramentas do desenvolvedor e clique na aba **Console**. Cole os comandos abaixo um a um para verificar o funcionamento:

**1. Verificar se o TechTrack foi carregado:**
```javascript
// Deve exibir o objeto com todas as funções
console.log(window.TechTrack);
```

**2. Inicializar ou recuperar os dados:**
```javascript
var dados = TechTrack.carregarDados();
console.log(dados);
// Exibe o objeto com versao, atualizadoEm e os cinco arrays
```

**3. Inspecionar a chave no localStorage:**
```javascript
// Exibe o texto JSON bruto armazenado
console.log(localStorage.getItem("techtrack:data:v1"));
```

**4. Converter o JSON de volta para objeto:**
```javascript
var texto = localStorage.getItem("techtrack:data:v1");
var objeto = JSON.parse(texto);
console.log(objeto.dados.equipamentos); // []
```

**5. Salvar os dados e verificar a atualização do timestamp:**
```javascript
var dados = TechTrack.carregarDados();
console.log("Antes:", dados.atualizadoEm);

TechTrack.salvarDados(dados);
console.log("Depois:", dados.atualizadoEm);
// O segundo timestamp é mais recente que o primeiro
```

**6. Gerar identificadores e verificar unicidade:**
```javascript
var id1 = TechTrack.gerarId();
var id2 = TechTrack.gerarId();
console.log(id1, id2);
console.log("São diferentes?", id1 !== id2); // true
```

**7. Testar a rejeição de estrutura inválida:**
```javascript
try {
    TechTrack.salvarDados({ versao: 1 }); // falta dados e atualizadoEm
} catch (erro) {
    console.log("Erro capturado:", erro.tipo);
    console.log("Mensagem:", erro.mensagem);
}
```

**8. Verificar os dados na aba Application:**

Na mesma janela do DevTools, clique em **Application** (ou **Armazenamento**) → **Local Storage** → origem da página. Você verá a chave `techtrack:data:v1` e seu valor JSON completo.

#### Por que leitura e escrita são verificadas separadamente?

Imagine um caderno quase cheio. Você ainda consegue **ler** o que está escrito nele — mas não consegue **escrever** mais nada porque as páginas acabaram.

O localStorage funciona da mesma forma. Quando ele está cheio:

- `getItem` continua funcionando — os dados existentes ainda podem ser lidos.
- `setItem` lança um erro chamado `QuotaExceededError` — não é possível gravar mais nada.

Na versão anterior do código, `carregarDados()` testava a disponibilidade tentando escrever uma chave temporária antes de ler. Se o storage estivesse cheio, essa escrita falhava e impedia a leitura — mesmo que os dados ainda estivessem lá.

A versão corrigida separa as responsabilidades:

```javascript
// carregarDados() — testa APENAS se localStorage existe, sem escrever nada
var storage = null;
try {
    storage = window.localStorage;   // acessar a propriedade já é suficiente
    if (!storage) {
        throw new TypeError("window.localStorage não existe.");
    }
} catch (erroAcesso) {
    // SecurityError: iframe restrito ou contexto sem permissão
    throw { tipo: "localStorage_indisponivel", ... };
}

// A leitura acontece separadamente, sem nenhuma escrita antes
try {
    conteudoTexto = storage.getItem(TechTrack.CHAVE_ARMAZENAMENTO);
} catch (erroLeitura) {
    throw { tipo: "erro_leitura", ... };
}
```

```javascript
// salvarDados() — tenta escrever e trata o erro diretamente
try {
    storage.setItem(TechTrack.CHAVE_ARMAZENAMENTO, textoJson);
} catch (erroGravacao) {
    // Identifica limite excedido pelo nome ou código do erro,
    // não pela mensagem textual (que varia entre navegadores)
    var ehLimiteExcedido = (
        erroGravacao.name === "QuotaExceededError" ||
        erroGravacao.name === "NS_ERROR_DOM_QUOTA_REACHED" ||
        erroGravacao.code === 22
    );

    if (ehLimiteExcedido) {
        throw { tipo: "limite_armazenamento", ... };
    }
    throw { tipo: "erro_gravacao", ... };
}
```

**Por que verificar `name` e `code` em vez da mensagem do erro?**

A mensagem de texto de um erro (`erroGravacao.message`) varia entre navegadores — Chrome, Firefox e Safari escrevem textos diferentes. O `name` e o `code` seguem padrões definidos pela especificação W3C, o que torna a verificação confiável independentemente do navegador. `code === 22` cobre navegadores mais antigos que usam o código numérico antes de o nome ter sido padronizado.

**O que acontece quando o storage está cheio e há dados salvos?**

| Operação | Resultado |
|---|---|
| `carregarDados()` | Funciona — lê e retorna os dados existentes normalmente |
| `salvarDados()` | Falha — lança `{ tipo: "limite_armazenamento", ... }` |
| Dados existentes | Preservados — nenhum dado é apagado automaticamente |

| Conceito da aula | Onde aparece na Etapa 03 |
|---|---|
| Objetos JavaScript (aula 7) | Estrutura de equipamento, manutenção, local, técnico e evento |
| Arrays (aula 7) | Cinco coleções dentro de `dados` |
| Funções (aula 7) | `gerarId`, `obterDataHoraAtual`, `validarEstrutura`, `carregarDados`, `salvarDados` |
| JSON (aula 9.1) | `JSON.stringify` ao salvar, `JSON.parse` ao carregar |
| Web Storage (aula 9.2) | `localStorage.getItem` e `localStorage.setItem` |
| `defer` (aula 7) | Ordem de carregamento dos três scripts em todas as páginas |

---

### 6.4 Equipamentos

*A ser preenchido na etapa 04 — CRUD de equipamentos.*

### 6.5 Manutenções

*A ser preenchido na etapa 06 — CRUD de manutenções.*

### 6.6 Locais e Técnicos

*A ser preenchido na etapa 05 — CRUD de locais e técnicos.*

### 6.7 Histórico

*A ser preenchido na etapa 07 — Dashboard e histórico.*

### 6.8 Relatórios e Backup

*A ser preenchido na etapa 08 — Relatórios e backup.*

### 6.9 QR Code

*A ser preenchido na etapa 09 — QR Code e etiquetas.*

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
| 01    | Estrutura HTML e navegação                       | ✅ Concluída    |
| 02    | Identidade visual e CSS responsivo               | ✅ Concluída    |
| 03    | Modelagem de dados e localStorage                | ✅ Concluída   |
| 03.1  | Refinamento do armazenamento local               | ✅ Concluída   |
| 04    | CRUD de equipamentos                             | 🔧 Pendente    |
| 05    | CRUD de locais e técnicos                        | 🔧 Pendente    |
| 06    | CRUD de manutenções                              | 🔧 Pendente    |
| 07    | Dashboard e histórico                            | 🔧 Pendente    |
| 08    | Relatórios e backup                              | 🔧 Pendente    |
| 09    | QR Code e etiquetas                              | 🔧 Pendente    |
| 10    | Testes, refinamento e preparação da apresentação | 🔧 Pendente    |

---

*Última atualização: Etapa 03.1 — Refinamento do armazenamento local.*
*Este documento será expandido a cada etapa de implementação.*
