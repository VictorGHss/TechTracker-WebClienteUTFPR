# PROJECT_SPEC — TechTrack

> Documento de referência técnica e funcional do projeto.
> Mantido e atualizado ao longo de todas as etapas de desenvolvimento.

---

## 1. Objetivo

O TechTrack é uma aplicação web para gerenciamento de equipamentos de informática e manutenções de TI em pequenas e médias empresas. O sistema permite cadastrar e acompanhar equipamentos, registrar ordens de manutenção, controlar localizações, gerenciar técnicos responsáveis e gerar relatórios operacionais.

---

## 2. Problema que resolve

Pequenas e médias empresas frequentemente controlam seus ativos de TI em planilhas ou de forma informal, o que dificulta rastrear o histórico de manutenções, identificar equipamentos com garantia prestes a vencer, localizar ativos e acompanhar custos. O TechTrack centraliza essas informações em uma interface simples e acessível.

---

## 3. Público-alvo

- Responsáveis de TI em pequenas e médias empresas.
- Técnicos de suporte que precisam registrar e acompanhar manutenções.
- Gestores que precisam de visibilidade sobre o parque de equipamentos.

---

## 4. Escopo

### Dentro do escopo

- Cadastro e gerenciamento de equipamentos.
- Registro e acompanhamento de manutenções.
- Gerenciamento de locais e técnicos responsáveis.
- Histórico automático de eventos relevantes.
- Relatórios e indicadores calculados a partir dos dados.
- Exportação e importação de dados via JSON (backup).
- Geração de QR Code para etiquetas de equipamentos.

### Fora do escopo

- Backend, servidor ou banco de dados externo.
- Autenticação e controle de acesso.
- Comunicação em tempo real.
- Leitura de QR Code pela câmera.
- Integrações com sistemas externos.
- Aplicativo mobile nativo.

---

## 5. Funcionalidades

As funcionalidades estão organizadas em três níveis de prioridade.

### Essenciais

- Dashboard com indicadores básicos.
- CRUD completo de equipamentos (cadastro, edição, exclusão e detalhes).
- CRUD completo de manutenções.
- CRUD de locais.
- CRUD de técnicos responsáveis.
- Relacionamentos entre as entidades.
- Validação dos formulários.
- Pesquisa e filtros nas listagens.
- Persistência em localStorage.
- Histórico automático dos principais eventos.

### Complementares

- Relatórios tabulares (inventário, categorias, localizações, manutenções, custos, garantias).
- Alertas de garantia próxima do vencimento e manutenção atrasada.
- Backup: exportação e importação de dados em JSON.
- Indicadores adicionais no dashboard.

### Adicionais

- Geração de QR Code individual para equipamentos.
- Download e impressão de etiquetas.

As funcionalidades adicionais não devem atrasar a conclusão das essenciais.

---

### Detalhamento das funcionalidades

#### 5.1 Dashboard (`index.html`)

- Contador de equipamentos totais.
- Contador de equipamentos operacionais.
- Contador de equipamentos em manutenção.
- Contador de manutenções abertas.
- Contador de manutenções atrasadas.
- Contador de garantias próximas do vencimento (critério: 30 dias).
- Lista de atividades recentes (últimos eventos do histórico).

Todos os indicadores são calculados dinamicamente a partir dos dados armazenados. Nenhum valor é guardado separadamente no localStorage.

#### 5.2 Equipamentos (`equipamentos.html` e `equipamento.html`)

- Cadastro com os campos: patrimônio, categoria, fabricante, modelo, número de série, data de aquisição, data de vencimento da garantia, localização e situação administrativa.
- Edição dos dados cadastrais.
- Exclusão com restrição: não permitida se houver manutenções ou histórico vinculado.
- Pesquisa por texto livre (patrimônio, modelo, fabricante, número de série).
- Filtros por categoria, localização e situação.
- Página de detalhes com dados completos, histórico do equipamento e manutenções associadas.
- Situação operacional calculada automaticamente (ver regras de negócio).
- Formulários embutidos nas próprias páginas — sem páginas separadas para formulários.

#### 5.3 Manutenções (`manutencoes.html`)

- Cadastro com os campos: equipamento associado, técnico responsável, tipo, prioridade, descrição, prazo e custo.
- Edição dos dados.
- Transições de estado: aberta → em andamento → concluída / cancelada.
- Restrições de criação e edição (ver regras de negócio).
- Formulários embutidos na própria página.

#### 5.4 Cadastros Auxiliares (`cadastros.html`)

**Locais:**
- Cadastro, edição e exclusão de locais.
- Exclusão restrita quando há equipamentos associados.

**Técnicos:**
- Cadastro, edição e inativação de técnicos.
- Exclusão restrita quando há manutenções associadas.

Ambos os cadastros ficam na mesma página, em seções separadas.

#### 5.5 Histórico

- Registro automático dos seguintes eventos:
  - Cadastro de equipamento.
  - Edição de dados relevantes do equipamento.
  - Transferência de localização do equipamento.
  - Alteração de situação administrativa do equipamento.
  - Abertura de manutenção.
  - Conclusão de manutenção.
  - Cancelamento de manutenção.
- O histórico geral aparece como atividades recentes no dashboard.
- O histórico individual de cada equipamento aparece na página de detalhes.

#### 5.6 Relatórios e Backup (`relatorios.html`)

**Relatórios:**
- Inventário completo de equipamentos.
- Equipamentos por categoria.
- Equipamentos por localização.
- Manutenções por situação.
- Custos de manutenção.
- Garantias (vencidas, próximas do vencimento e vigentes).

Todos em formato de tabelas e indicadores numéricos. Gráficos elaborados não são necessários.

**Backup (seção na mesma página):**
- Exportação de todos os dados em um único arquivo JSON.
- Importação de arquivo JSON com validação prévia da estrutura.
- Preservação dos dados atuais em caso de falha na importação.
- Confirmação explícita antes de substituir os dados existentes.

#### 5.7 QR Code (funcionalidade adicional)

- Geração de QR Code individual para cada equipamento, acessível pela página de detalhes.
- Exibição do QR Code com dados de identificação do equipamento.
- Opção de baixar a imagem ou imprimir a etiqueta.
- Implementado com biblioteca local incorporada (sem CDN).

---

## 6. Entidades

### Equipamento

| Campo                    | Tipo      | Obrigatório | Descrição                                                      |
|--------------------------|-----------|-------------|----------------------------------------------------------------|
| `id`                     | string    | sim         | Identificador único gerado pelo sistema                        |
| `patrimonio`             | string    | sim         | Número de patrimônio — único no sistema                        |
| `categoria`              | string    | sim         | Categoria: `desktop`, `notebook`, `impressora`, `servidor`, `outro` |
| `fabricante`             | string    | sim         | Nome do fabricante                                             |
| `modelo`                 | string    | sim         | Modelo do equipamento                                          |
| `numeroSerie`            | string    | não         | Número de série — único quando informado                       |
| `dataAquisicao`          | string    | sim         | Data de aquisição (YYYY-MM-DD)                                 |
| `dataGarantia`           | string    | não         | Data de vencimento da garantia (YYYY-MM-DD)                    |
| `localId`                | string    | sim         | ID do local associado                                          |
| `situacaoAdministrativa` | string    | sim         | `ativo`, `inativo` ou `descartado`                             |
| `criadoEm`               | string    | sim         | Timestamp de criação (ISO 8601)                                |
| `atualizadoEm`           | string    | sim         | Timestamp da última atualização (ISO 8601)                     |

> A situação operacional não é armazenada. É calculada em tempo de execução a partir de `situacaoAdministrativa` e das manutenções ativas.

### Manutenção

| Campo           | Tipo    | Obrigatório | Descrição                                                       |
|-----------------|---------|-------------|-----------------------------------------------------------------|
| `id`            | string  | sim         | Identificador único gerado pelo sistema                         |
| `equipamentoId` | string  | sim         | ID do equipamento associado                                     |
| `tecnicoId`     | string  | sim         | ID do técnico responsável                                       |
| `tipo`          | string  | sim         | `preventiva`, `corretiva`, `instalacao` ou `outro`              |
| `prioridade`    | string  | sim         | `baixa`, `media`, `alta` ou `critica`                           |
| `descricao`     | string  | sim         | Descrição do problema ou serviço                                |
| `prazo`         | string  | não         | Data limite (YYYY-MM-DD)                                        |
| `custo`         | number  | não         | Custo estimado ou real                                          |
| `estado`        | string  | sim         | `aberta`, `em_andamento`, `concluida` ou `cancelada`            |
| `criadoEm`      | string  | sim         | Timestamp de criação (ISO 8601)                                 |
| `atualizadoEm`  | string  | sim         | Timestamp da última atualização (ISO 8601)                      |

### Local

| Campo       | Tipo   | Obrigatório | Descrição                                      |
|-------------|--------|-------------|------------------------------------------------|
| `id`        | string | sim         | Identificador único gerado pelo sistema        |
| `nome`      | string | sim         | Nome do local (ex: Sala 101, Lab. de TI)       |
| `descricao` | string | não         | Descrição ou observações sobre o local         |
| `criadoEm`  | string | sim         | Timestamp de criação (ISO 8601)                |

### Técnico

| Campo      | Tipo    | Obrigatório | Descrição                                      |
|------------|---------|-------------|------------------------------------------------|
| `id`       | string  | sim         | Identificador único gerado pelo sistema        |
| `nome`     | string  | sim         | Nome completo do técnico                       |
| `contato`  | string  | não         | E-mail ou telefone de contato                  |
| `ativo`    | boolean | sim         | Indica se o técnico está ativo                 |
| `criadoEm` | string  | sim         | Timestamp de criação (ISO 8601)                |

### Evento Histórico

| Campo          | Tipo   | Obrigatório | Descrição                                              |
|----------------|--------|-------------|--------------------------------------------------------|
| `id`           | string | sim         | Identificador único gerado pelo sistema                |
| `tipo`         | string | sim         | Tipo do evento (ver lista abaixo)                      |
| `equipamentoId`| string | não         | ID do equipamento relacionado (quando aplicável)       |
| `manutencaoId` | string | não         | ID da manutenção relacionada (quando aplicável)        |
| `descricao`    | string | sim         | Descrição legível do evento                            |
| `dados`        | object | não         | Informações adicionais do evento (valores antes/depois)|
| `criadoEm`     | string | sim         | Timestamp do evento (ISO 8601)                         |

**Tipos de evento:**
- `equipamento_cadastrado`
- `equipamento_editado`
- `equipamento_transferido`
- `equipamento_situacao_alterada`
- `manutencao_aberta`
- `manutencao_atualizada`
- `manutencao_concluida`
- `manutencao_cancelada`

---

## 7. Relacionamentos

```
Local        (1) ── (N) Equipamento
Equipamento  (1) ── (N) Manutenção
Técnico      (1) ── (N) Manutenção
Equipamento  (1) ── (N) Evento Histórico
Manutenção   (1) ── (N) Evento Histórico
```

---

## 8. Regras de Negócio

### RN-01 — Patrimônio único
Não é permitido cadastrar dois equipamentos com o mesmo número de patrimônio.

### RN-02 — Número de série único
Quando informado, o número de série não pode ser duplicado entre equipamentos.

### RN-03 — Local obrigatório e válido
Todo equipamento deve estar associado a um local cadastrado e existente no sistema.

### RN-04 — Restrição de manutenção para equipamento inativo ou descartado
Não é permitido abrir nova manutenção para equipamento com `situacaoAdministrativa` igual a `inativo` ou `descartado`.

### RN-05 — Uma manutenção ativa por equipamento
Um equipamento não pode ter duas manutenções com estado `aberta` ou `em_andamento` simultaneamente.

### RN-06 — Técnico inativo não recebe manutenções
Não é permitido atribuir uma nova manutenção a um técnico com `ativo = false`.

### RN-07 — Restrição de exclusão por relacionamento
- Não é permitido excluir um local que possua equipamentos associados.
- Não é permitido excluir um técnico que possua manutenções associadas.
- Não é permitido excluir um equipamento que possua manutenções ou histórico associado. Neste caso, `situacaoAdministrativa` deve ser alterada para `descartado`.

### RN-08 — Situação operacional calculada
A situação operacional do equipamento é derivada das seguintes condições:

| Situação Administrativa | Manutenção Ativa? | Situação Operacional |
|-------------------------|-------------------|----------------------|
| `ativo`                 | Não               | `operacional`        |
| `ativo`                 | Sim               | `em_manutencao`      |
| `inativo`               | Qualquer          | `inativo`            |
| `descartado`            | Qualquer          | `descartado`         |

### RN-09 — Manutenção atrasada
Uma manutenção com estado `aberta` ou `em_andamento` cuja data de prazo seja anterior à data atual é considerada atrasada.

### RN-10 — Garantia próxima do vencimento
Uma garantia é considerada próxima do vencimento quando a data de vencimento estiver dentro dos próximos 30 dias a partir da data atual.

---

## 9. Páginas

| Página              | Arquivo             | Conteúdo                                                        |
|---------------------|---------------------|-----------------------------------------------------------------|
| Dashboard           | `index.html`        | Indicadores calculados e atividades recentes                    |
| Equipamentos        | `equipamentos.html` | Inventário com pesquisa, filtros e formulário embutido          |
| Detalhe             | `equipamento.html`  | Dados completos, histórico e manutenções do equipamento         |
| Manutenções         | `manutencoes.html`  | Lista de manutenções com formulário embutido                    |
| Cadastros           | `cadastros.html`    | Gerenciamento de locais e técnicos (mesma página, duas seções)  |
| Relatórios e Backup | `relatorios.html`   | Relatórios tabulares e seção de exportação/importação           |

Os formulários de cadastro e edição ficam embutidos nas próprias páginas (como seções ou painéis que aparecem e desaparecem), sem páginas HTML separadas para cada formulário.

---

## 10. Fluxos Principais

### Cadastro de equipamento
1. Usuário acessa "Equipamentos" e abre o formulário de cadastro na mesma página.
2. Preenche os campos obrigatórios e seleciona um local cadastrado.
3. Sistema valida unicidade do patrimônio e do número de série.
4. Sistema salva o equipamento e registra o evento `equipamento_cadastrado`.
5. Formulário fecha e a lista de equipamentos é atualizada.

### Abertura de manutenção
1. Usuário acessa "Manutenções" e abre o formulário na mesma página.
2. Seleciona o equipamento (deve estar ativo e sem manutenção ativa).
3. Seleciona o técnico responsável (deve estar ativo).
4. Preenche tipo, prioridade, descrição e prazo.
5. Sistema valida as regras RN-04, RN-05 e RN-06.
6. Sistema salva a manutenção com estado `aberta` e registra `manutencao_aberta`.

### Conclusão de manutenção
1. Usuário localiza a manutenção na lista e altera o estado para `concluida`.
2. Pode informar o custo final.
3. Sistema registra `manutencao_concluida` e recalcula a situação operacional do equipamento.

### Exportação de backup
1. Usuário acessa "Relatórios" e vai até a seção de Backup.
2. Clica em "Exportar".
3. Sistema gera um arquivo JSON com todos os dados e disponibiliza para download.

### Importação de backup
1. Usuário seleciona um arquivo JSON na seção de Backup.
2. Sistema valida a estrutura antes de qualquer alteração.
3. Sistema solicita confirmação explícita.
4. Se o arquivo for inválido, os dados atuais são preservados e o usuário é informado.
5. Se confirmado, os dados são substituídos pelos dados importados.

---

## 11. Tecnologias

| Tecnologia     | Uso                                            | Justificativa                                       |
|----------------|------------------------------------------------|-----------------------------------------------------|
| HTML5          | Estrutura de todas as páginas                  | Linguagem base da web, estudada na disciplina       |
| CSS3           | Estilização e layout responsivo                | Flexbox, Grid e Media Queries estudados na disciplina |
| JavaScript     | Lógica, manipulação do DOM e persistência      | Estudado na disciplina                              |
| localStorage   | Armazenamento local dos dados                  | Estudado na disciplina (Web Storage)                |
| JSON           | Formato de dados e backup                      | Estudado na disciplina                              |
| qrcode.js      | Geração de QR Code (funcionalidade adicional)  | Biblioteca pequena, incorporada localmente          |

**Sem frameworks CSS, sem frameworks JavaScript, sem CDNs, sem backend.**

---

## 12. Arquitetura

### Estrutura de pastas

```
TechTrack/
│
├── index.html              # Dashboard
├── equipamentos.html       # Inventário e cadastro de equipamentos
├── equipamento.html        # Detalhes de um equipamento
├── manutencoes.html        # Gerenciamento de manutenções
├── cadastros.html          # Locais e técnicos
├── relatorios.html         # Relatórios e backup
│
├── css/
│   └── style.css           # Estilos globais, layout e componentes
│
├── js/
│   ├── armazenamento.js    # Leitura e escrita no localStorage
│   ├── dados.js            # Estrutura e inicialização dos dados
│   ├── funcoes.js          # Funções utilitárias (formatar data, gerar ID etc.)
│   ├── equipamentos.js     # Lógica de equipamentos (CRUD, validações, histórico)
│   ├── manutencoes.js      # Lógica de manutenções (CRUD, validações, histórico)
│   ├── cadastros.js        # Lógica de locais e técnicos
│   ├── dashboard.js        # Cálculo e renderização dos indicadores
│   └── relatorios.js       # Geração dos relatórios e backup
│
├── assets/
│   └── imagens/            # Imagens e ícones do projeto
│
├── .gitignore
├── README.md
├── PROJECT_SPEC.md
└── GUIA_DE_APRESENTACAO.md
```

Arquivos adicionais como `historico.js`, `backup.js` ou `qrcode.js` poderão ser criados quando suas responsabilidades justificarem a separação. Evitar dividir funcionalidades simples em muitos arquivos.

### Decisões de arquitetura

- **MPA (múltiplas páginas HTML):** cada funcionalidade principal tem sua própria página HTML. É a abordagem mais próxima do que foi estudado na disciplina e mais fácil de compreender.
- **Formulários embutidos:** os formulários de cadastro e edição ficam dentro das próprias páginas de listagem, aparecendo e desaparecendo conforme necessário. Evita criar páginas adicionais para cada formulário.
- **Um arquivo CSS:** toda a estilização fica em `css/style.css`, facilitando a leitura e manutenção para um projeto deste porte.
- **Scripts com `defer`:** os arquivos JavaScript serão carregados com o atributo `defer` quando isso facilitar a compreensão do código e evitar problemas de ordem de execução.
- **Sem ES Modules nem ferramentas de build:** não são necessários para este escopo e adicionariam complexidade desnecessária.

---

## 13. Persistência

### Chave do localStorage
```
techtrack:data:v1
```

### Estrutura do objeto armazenado

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

### Regras de persistência
- Todos os dados ficam em um único objeto JSON, sob uma única chave no localStorage.
- Nenhum indicador calculado é armazenado. Todos são derivados em tempo de execução.
- O campo `versao` permite futura migração de estrutura sem perda de dados.
- O backup exporta exatamente este objeto, sem transformações adicionais.

---

## 14. Restrições

- Sem backend, servidor ou banco de dados externo.
- Sem frameworks CSS (Bootstrap, Tailwind etc.).
- Sem frameworks JavaScript (React, Vue, Angular etc.).
- Sem ES Modules ou ferramentas de build (Vite, Webpack etc.) sem justificativa concreta.
- Sem CDNs ou dependências externas carregadas em tempo de execução.
- Sem autenticação de usuários.
- Os dados ficam restritos ao navegador do usuário.
- O localStorage possui limite de aproximadamente 5 MB por origem.

---

## 15. Requisitos Funcionais

### Essenciais

| ID    | Descrição                                                                          |
|-------|------------------------------------------------------------------------------------|
| RF-01 | O sistema deve permitir cadastrar, editar e excluir equipamentos.                  |
| RF-02 | O sistema deve garantir unicidade do patrimônio e do número de série.              |
| RF-03 | O sistema deve calcular e exibir a situação operacional de cada equipamento.       |
| RF-04 | O sistema deve permitir cadastrar, editar e alterar o estado de manutenções.       |
| RF-05 | O sistema deve impedir manutenções em equipamentos inativos ou descartados.        |
| RF-06 | O sistema deve impedir duas manutenções ativas para o mesmo equipamento.           |
| RF-07 | O sistema deve impedir atribuição de manutenções a técnicos inativos.              |
| RF-08 | O sistema deve registrar automaticamente eventos históricos para ações relevantes. |
| RF-09 | O sistema deve exibir indicadores calculados no dashboard.                         |
| RF-10 | O sistema deve permitir pesquisa e filtros nas listagens de equipamentos.          |

### Complementares

| ID    | Descrição                                                                          |
|-------|------------------------------------------------------------------------------------|
| RF-11 | O sistema deve identificar manutenções atrasadas.                                  |
| RF-12 | O sistema deve identificar garantias próximas do vencimento.                       |
| RF-13 | O sistema deve gerar relatórios tabulares a partir dos dados armazenados.          |
| RF-14 | O sistema deve exportar todos os dados em formato JSON.                            |
| RF-15 | O sistema deve importar dados de um arquivo JSON com validação prévia.             |

### Adicionais

| ID    | Descrição                                                                          |
|-------|------------------------------------------------------------------------------------|
| RF-16 | O sistema deve gerar QR Code para equipamentos e permitir download ou impressão.   |

---

## 16. Requisitos Não Funcionais

| ID     | Descrição                                                                                |
|--------|------------------------------------------------------------------------------------------|
| RNF-01 | A aplicação deve funcionar como site estático, sem servidor de aplicação.                |
| RNF-02 | A aplicação deve ser responsiva: celulares (~360px), tablets (~768px) e desktops.        |
| RNF-03 | A interface deve ser simples, clara e compatível com o nível da disciplina.              |
| RNF-04 | Nenhuma dependência externa deve ser carregada em tempo de execução.                     |
| RNF-05 | O código deve ser organizado em arquivos separados por responsabilidade.                 |
| RNF-06 | O código deve ser legível e comentado para facilitar a compreensão pelo aluno.           |
| RNF-07 | Os dados devem persistir entre sessões do navegador via localStorage.                    |
| RNF-08 | A aplicação deve preservar os dados existentes em caso de importação inválida.           |

---

## 17. Critérios de Aceitação

- [ ] Dashboard exibe todos os indicadores corretos baseados nos dados reais.
- [ ] Não é possível cadastrar dois equipamentos com o mesmo patrimônio.
- [ ] Não é possível abrir manutenção para equipamento inativo ou descartado.
- [ ] Não é possível ter duas manutenções ativas para o mesmo equipamento.
- [ ] A situação operacional do equipamento muda automaticamente com a manutenção.
- [ ] O histórico registra automaticamente todos os eventos previstos.
- [ ] A exportação gera um arquivo JSON com todos os dados.
- [ ] A importação com arquivo inválido não altera os dados existentes.
- [ ] QR Code é gerado e pode ser baixado para qualquer equipamento. *(funcionalidade adicional)*
- [ ] A aplicação funciona sem conexão com internet.
- [ ] A aplicação é utilizável em celulares a partir de 360px de largura.

---

## 18. Roadmap

| Etapa | Descrição                                        | Situação       |
|-------|--------------------------------------------------|----------------|
| 00    | Fundação e documentação                          | ✅ Concluída    |
| 00.1  | Alinhamento documental                           | ✅ Concluída    |
| 01    | Estrutura HTML e navegação                       | ✅ Concluída    |
| 02    | Identidade visual e CSS responsivo               | ✅ Concluída    |
| 03    | Modelagem de dados e localStorage                | 🔧 Pendente    |
| 04    | CRUD de equipamentos                             | 🔧 Pendente    |
| 05    | CRUD de locais e técnicos                        | 🔧 Pendente    |
| 06    | CRUD de manutenções                              | 🔧 Pendente    |
| 07    | Dashboard e histórico                            | 🔧 Pendente    |
| 08    | Relatórios e backup                              | 🔧 Pendente    |
| 09    | QR Code e etiquetas                              | 🔧 Pendente    |
| 10    | Testes, refinamento e preparação da apresentação | 🔧 Pendente    |

---

## 19. Notas técnicas da Etapa 01

### Servidor estático local

As páginas HTML referenciam arquivos em `css/style.css` e `js/*.js` que ainda não existem (criados nas etapas 02 e 03). Para executar o projeto durante o desenvolvimento, recomenda-se um servidor estático local como a extensão **Live Server** do VS Code.

Um servidor estático apenas serve arquivos do disco para o navegador — não processa dados, não conecta a banco de dados e não representa um backend ou servidor de aplicação. O TechTrack continua sendo 100% frontend: todo o processamento acontece no navegador.

### Decisões técnicas da Etapa 01

- **Formulários com `disabled`:** os campos e botões de formulário foram incluídos na estrutura HTML com o atributo `disabled`. Isso deixa a estrutura preparada para as etapas de CRUD sem criar a falsa impressão de que funcionam agora.
- **Tabelas com `hidden`:** as tabelas de dados ficam ocultas por padrão (`hidden`). O estado vazio (`<p class="estado-vazio">`) é exibido enquanto não há dados. O JavaScript alternará entre os dois conforme necessário.
- **`aria-current="page"` em `equipamento.html`:** esta página pertence à seção Equipamentos, então o item Equipamentos recebe `aria-current="page"` na navegação. A localização exata é indicada pelo breadcrumb com `aria-current="location"`.
- **Scripts com `defer`:** todos os arquivos JavaScript são carregados com `defer`, o que garante que o HTML esteja completamente parseado antes da execução dos scripts.

---

## 20. Notas técnicas da Etapa 02

### Arquivo CSS criado

`css/style.css` — arquivo único com 12 seções comentadas, 971 linhas, 23 KB.

### Estrutura de pastas atualizada

```
TechTrack/
│
├── index.html
├── equipamentos.html
├── equipamento.html
├── manutencoes.html
├── cadastros.html
├── relatorios.html
│
├── css/
│   └── style.css        ← criado na Etapa 02
│
├── js/                  ← criado a partir da Etapa 03
│   └── ...
│
└── assets/
    └── imagens/
```

### Decisões visuais

- **Navegação lateral escura** (`#1E293B`): contraste alto com os links claros (`#CBD5E1`), link ativo destacado em azul (`#2563EB`) com borda lateral esquerda.
- **Fundo de página em cinza claro** (`#F1F5F9`): superfícies brancas (`#FFFFFF`) se destacam naturalmente sobre o fundo, criando hierarquia visual sem bordas pesadas.
- **Cards de indicadores em azul suave** (`#EFF6FF`): distinguem visualmente os indicadores do fundo das seções sem usar cores saturadas.
- **Alertas em amarelo suave** (`#FFFBEB`): diferenciação visual das manutenções atrasadas e garantias vencendo.
- **Badges de situação e prioridade** preparados para uso pelo JavaScript nas etapas futuras (`.badge-operacional`, `.badge-critica` etc.).
- **Tabelas com rolagem horizontal interna** via `.tabela-wrapper { overflow-x: auto }`: evita quebra de layout em telas pequenas.
- **`[hidden]` com `!important`**: garante que elementos ocultos permaneçam assim mesmo com outras regras CSS de exibição.

### Breakpoints implementados

| Breakpoint | Faixa | Comportamento |
|---|---|---|
| Desktop | ≥ 1024px | Nav lateral sticky (240px), layout em duas colunas |
| Tablet | 768px – 1023px | Nav lateral estreita (200px), espaçamentos reduzidos |
| Mobile | ≤ 767px | Nav horizontal no topo, cards em 2 colunas, listas em 1 coluna |
| Mobile pequeno | ≤ 400px | Cards em 1 coluna, links da nav menores |

*Última atualização: Etapa 02 — Identidade visual e CSS responsivo.*
