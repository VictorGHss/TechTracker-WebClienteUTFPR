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
- Exportação e importação de dados via JSON.
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

### 5.1 Dashboard

- Contador de equipamentos totais.
- Contador de equipamentos operacionais.
- Contador de equipamentos em manutenção.
- Contador de manutenções abertas.
- Contador de manutenções atrasadas.
- Contador de garantias próximas do vencimento (critério: 30 dias).
- Lista de atividades recentes (últimos eventos do histórico).

Todos os indicadores são calculados dinamicamente a partir dos dados armazenados.

### 5.2 Equipamentos

- Cadastro com os campos: patrimônio, categoria, fabricante, modelo, número de série, data de aquisição, data de vencimento da garantia, localização e situação administrativa.
- Edição dos dados cadastrais.
- Exclusão com restrição: não permitida se houver manutenções ou histórico vinculado.
- Pesquisa por texto livre (patrimônio, modelo, fabricante, número de série).
- Filtros por categoria, localização e situação.
- Tela de detalhes com dados completos, histórico e manutenções associadas.
- Situação operacional calculada automaticamente (ver regras de negócio).

### 5.3 Manutenções

- Cadastro com os campos: equipamento associado, técnico responsável, tipo, prioridade, descrição, prazo e custo estimado.
- Edição dos dados.
- Transições de estado: aberta → em andamento → concluída / cancelada.
- Restrições de criação e edição (ver regras de negócio).

### 5.4 Cadastros Auxiliares

#### Locais
- Cadastro, edição e exclusão de locais.
- Exclusão restrita quando há equipamentos associados.

#### Técnicos Responsáveis
- Cadastro, edição e inativação de técnicos.
- Exclusão restrita quando há manutenções associadas.

### 5.5 Histórico

- Registro automático dos seguintes eventos:
  - Cadastro de equipamento.
  - Edição de dados relevantes do equipamento.
  - Transferência de localização do equipamento.
  - Alteração de situação administrativa do equipamento.
  - Abertura de manutenção.
  - Conclusão de manutenção.
  - Cancelamento de manutenção.
- Consulta do histórico geral e por equipamento.

### 5.6 Relatórios

- Inventário completo de equipamentos.
- Equipamentos por categoria.
- Equipamentos por localização.
- Manutenções por situação.
- Custos de manutenção por período.
- Relatório de garantias (vencidas, próximas do vencimento e vigentes).

Todos os relatórios são apresentados em tabelas e indicadores numéricos. Gráficos elaborados não são necessários.

### 5.7 Backup

- Exportação de todos os dados em um único arquivo JSON.
- Importação de arquivo JSON com validação prévia da estrutura.
- Preservação dos dados atuais em caso de falha na importação.
- Confirmação explícita antes de substituir os dados existentes.

### 5.8 QR Code

- Geração de QR Code individual para cada equipamento.
- Exibição do QR Code com dados de identificação do equipamento.
- Opção de baixar a imagem ou imprimir a etiqueta.
- Implementado com biblioteca local (sem CDN).

---

## 6. Entidades

### Equipamento (`equipment`)

| Campo              | Tipo    | Obrigatório | Descrição                                                   |
|--------------------|---------|-------------|-------------------------------------------------------------|
| `id`               | string  | sim         | Identificador único gerado pelo sistema (UUID ou similar)   |
| `patrimonio`       | string  | sim         | Número de patrimônio — único no sistema                     |
| `categoria`        | string  | sim         | Categoria do equipamento (ex: desktop, notebook, impressora)|
| `fabricante`       | string  | sim         | Nome do fabricante                                          |
| `modelo`           | string  | sim         | Modelo do equipamento                                       |
| `numeroSerie`      | string  | não         | Número de série — único quando informado                    |
| `dataAquisicao`    | string  | sim         | Data de aquisição (formato ISO 8601: YYYY-MM-DD)            |
| `dataGarantia`     | string  | não         | Data de vencimento da garantia (formato ISO 8601)           |
| `localId`          | string  | sim         | ID do local associado                                       |
| `situacaoAdmin`    | string  | sim         | Situação administrativa: `ativo`, `inativo`, `descartado`   |
| `situacaoOper`     | string  | calculado   | Situação operacional calculada (ver regras)                 |
| `criadoEm`         | string  | sim         | Timestamp de criação                                        |
| `atualizadoEm`     | string  | sim         | Timestamp da última atualização                             |

### Manutenção (`maintenance`)

| Campo              | Tipo    | Obrigatório | Descrição                                                   |
|--------------------|---------|-------------|-------------------------------------------------------------|
| `id`               | string  | sim         | Identificador único gerado pelo sistema                     |
| `equipmentId`      | string  | sim         | ID do equipamento associado                                 |
| `responsibleId`    | string  | sim         | ID do técnico responsável                                   |
| `tipo`             | string  | sim         | Tipo: `preventiva`, `corretiva`, `instalacao`, `outro`      |
| `prioridade`       | string  | sim         | Prioridade: `baixa`, `media`, `alta`, `critica`             |
| `descricao`        | string  | sim         | Descrição do problema ou serviço                            |
| `prazo`            | string  | não         | Data limite (formato ISO 8601)                              |
| `custo`            | number  | não         | Custo estimado ou real                                      |
| `estado`           | string  | sim         | Estado: `aberta`, `em_andamento`, `concluida`, `cancelada`  |
| `criadoEm`         | string  | sim         | Timestamp de criação                                        |
| `atualizadoEm`     | string  | sim         | Timestamp da última atualização                             |

### Local (`location`)

| Campo              | Tipo    | Obrigatório | Descrição                                                   |
|--------------------|---------|-------------|-------------------------------------------------------------|
| `id`               | string  | sim         | Identificador único gerado pelo sistema                     |
| `nome`             | string  | sim         | Nome do local (ex: Sala 101, Laboratório de TI)             |
| `descricao`        | string  | não         | Descrição ou observações sobre o local                      |
| `criadoEm`         | string  | sim         | Timestamp de criação                                        |

### Técnico Responsável (`responsible`)

| Campo              | Tipo    | Obrigatório | Descrição                                                   |
|--------------------|---------|-------------|-------------------------------------------------------------|
| `id`               | string  | sim         | Identificador único gerado pelo sistema                     |
| `nome`             | string  | sim         | Nome completo do técnico                                    |
| `contato`          | string  | não         | E-mail ou telefone de contato                               |
| `ativo`            | boolean | sim         | Indica se o técnico está ativo                              |
| `criadoEm`         | string  | sim         | Timestamp de criação                                        |

### Evento Histórico (`event`)

| Campo              | Tipo    | Obrigatório | Descrição                                                   |
|--------------------|---------|-------------|-------------------------------------------------------------|
| `id`               | string  | sim         | Identificador único gerado pelo sistema                     |
| `tipo`             | string  | sim         | Tipo do evento (ver lista de tipos)                         |
| `equipmentId`      | string  | não         | ID do equipamento relacionado (quando aplicável)            |
| `maintenanceId`    | string  | não         | ID da manutenção relacionada (quando aplicável)             |
| `descricao`        | string  | sim         | Descrição legível do evento                                 |
| `dados`            | object  | não         | Dados adicionais do evento (ex: valores anterior e novo)    |
| `criadoEm`         | string  | sim         | Timestamp do evento                                         |

**Tipos de evento disponíveis:**
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
Local (1) ──────────── (N) Equipamento
Equipamento (1) ──────── (N) Manutenção
Técnico (1) ─────────── (N) Manutenção
Equipamento (1) ──────── (N) Evento Histórico
Manutenção (1) ──────── (N) Evento Histórico
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
Não é permitido abrir nova manutenção para equipamento com situação administrativa `inativo` ou `descartado`.

### RN-05 — Uma manutenção ativa por equipamento
Um equipamento não pode possuir duas manutenções com estado `aberta` ou `em_andamento` simultaneamente.

### RN-06 — Técnico inativo não recebe manutenções
Não é permitido atribuir uma nova manutenção a um técnico com `ativo = false`.

### RN-07 — Restrição de exclusão por relacionamento
- Não é permitido excluir um local que possua equipamentos associados.
- Não é permitido excluir um técnico que possua manutenções associadas.
- Não é permitido excluir um equipamento que possua manutenções ou histórico associado. Neste caso, a situação administrativa deverá ser alterada para `descartado`.

### RN-08 — Situação operacional calculada
A situação operacional do equipamento é derivada das seguintes condições:

| Situação Administrativa | Manutenção Ativa?  | Situação Operacional |
|-------------------------|--------------------|----------------------|
| `ativo`                 | Não                | `operacional`        |
| `ativo`                 | Sim                | `em_manutencao`      |
| `inativo`               | Qualquer           | `inativo`            |
| `descartado`            | Qualquer           | `descartado`         |

### RN-09 — Manutenção atrasada
Uma manutenção com estado `aberta` ou `em_andamento` cuja data de prazo seja anterior à data atual é considerada atrasada.

### RN-10 — Garantia próxima do vencimento
Uma garantia é considerada próxima do vencimento quando a data de vencimento estiver dentro dos próximos 30 dias a partir da data atual.

---

## 9. Telas

| Tela                   | Descrição                                                      |
|------------------------|----------------------------------------------------------------|
| Dashboard              | Visão geral com indicadores e atividades recentes              |
| Lista de Equipamentos  | Tabela com pesquisa e filtros                                  |
| Detalhes do Equipamento| Dados completos, histórico e manutenções do equipamento        |
| Formulário Equipamento | Cadastro e edição de equipamento                               |
| Lista de Manutenções   | Tabela com filtros por estado e prioridade                     |
| Formulário Manutenção  | Cadastro e edição de manutenção                                |
| Locais                 | Listagem, cadastro e edição de locais                          |
| Técnicos               | Listagem, cadastro e edição de técnicos responsáveis           |
| Histórico              | Lista cronológica de todos os eventos registrados              |
| Relatórios             | Relatórios tabulares e indicadores                             |
| Backup                 | Exportação e importação de dados                               |

---

## 10. Fluxos Principais

### Cadastro de equipamento
1. Usuário acessa "Equipamentos" → "Novo Equipamento".
2. Preenche os campos obrigatórios.
3. Seleciona um local cadastrado.
4. Sistema valida unicidade do patrimônio e do número de série.
5. Sistema salva o equipamento e registra evento `equipamento_cadastrado`.
6. Usuário é redirecionado para a lista ou detalhes do equipamento.

### Abertura de manutenção
1. Usuário acessa "Manutenções" → "Nova Manutenção" ou parte dos detalhes do equipamento.
2. Seleciona o equipamento (deve estar ativo e sem manutenção ativa).
3. Seleciona o técnico responsável (deve estar ativo).
4. Preenche tipo, prioridade, descrição e prazo.
5. Sistema valida as regras RN-04, RN-05 e RN-06.
6. Sistema salva a manutenção com estado `aberta` e registra evento `manutencao_aberta`.

### Conclusão de manutenção
1. Usuário acessa a manutenção desejada.
2. Atualiza o estado para `concluida`.
3. Pode informar o custo final.
4. Sistema registra evento `manutencao_concluida` e recalcula a situação operacional do equipamento.

### Exportação de backup
1. Usuário acessa "Backup" → "Exportar".
2. Sistema gera um objeto JSON com todas as coleções.
3. Arquivo é disponibilizado para download com nome `techtrack-backup-YYYY-MM-DD.json`.

### Importação de backup
1. Usuário seleciona um arquivo JSON.
2. Sistema valida a estrutura do arquivo antes de qualquer alteração.
3. Sistema solicita confirmação explícita do usuário.
4. Em caso de estrutura inválida, os dados atuais são preservados e o usuário é informado.
5. Em caso de confirmação, os dados atuais são substituídos pelos dados importados.

---

## 11. Tecnologias

| Tecnologia     | Uso                                              | Justificativa                                         |
|----------------|--------------------------------------------------|-------------------------------------------------------|
| HTML5          | Estrutura de todas as páginas                    | Linguagem base da web, estudada na disciplina         |
| CSS3           | Estilização e layout                             | Estudado na disciplina (Flexbox, Grid, Media Queries) |
| JavaScript     | Lógica, manipulação do DOM e persistência        | Estudado na disciplina                                |
| localStorage   | Armazenamento local dos dados                    | Estudado na disciplina (Web Storage)                  |
| JSON           | Formato de dados e backup                        | Estudado na disciplina                                |
| qrcode.js      | Geração de QR Code (biblioteca local)            | Biblioteca pequena, sem dependências, incorporada     |

**Nenhuma dependência de CDN, servidor ou API externa é utilizada.**

---

## 12. Arquitetura prevista

```
TechTracker/
├── index.html                  # Página principal (SPA ou entrada)
├── css/
│   ├── reset.css               # Reset básico de estilos
│   ├── base.css                # Estilos globais, variáveis CSS, tipografia
│   ├── layout.css              # Estrutura: menu lateral, cabeçalho, conteúdo
│   └── components.css          # Cards, tabelas, formulários, botões, badges
├── js/
│   ├── storage.js              # Leitura e escrita no localStorage
│   ├── data.js                 # Inicialização e estrutura dos dados
│   ├── utils.js                # Funções utilitárias (formatação, validação, ID)
│   ├── events.js               # Registro automático de eventos históricos
│   ├── equipment.js            # Lógica de equipamentos
│   ├── maintenance.js          # Lógica de manutenções
│   ├── location.js             # Lógica de locais
│   ├── responsible.js          # Lógica de técnicos responsáveis
│   ├── history.js              # Consulta e renderização do histórico
│   ├── dashboard.js            # Cálculo dos indicadores do dashboard
│   ├── reports.js              # Geração dos relatórios
│   ├── backup.js               # Exportação e importação de dados
│   ├── qrcode.js               # Integração com a biblioteca de QR Code
│   └── app.js                  # Inicialização e roteamento da aplicação
├── pages/
│   ├── dashboard.html          # Tela do dashboard
│   ├── equipments.html         # Lista de equipamentos
│   ├── equipment-detail.html   # Detalhes do equipamento
│   ├── equipment-form.html     # Formulário de equipamento
│   ├── maintenances.html       # Lista de manutenções
│   ├── maintenance-form.html   # Formulário de manutenção
│   ├── locations.html          # Gerenciamento de locais
│   ├── responsibles.html       # Gerenciamento de técnicos
│   ├── history.html            # Histórico de eventos
│   ├── reports.html            # Relatórios
│   └── backup.html             # Backup e restauração
├── lib/
│   └── qrcode.min.js           # Biblioteca de QR Code (incorporada localmente)
├── .gitignore
├── README.md
├── PROJECT_SPEC.md
└── GUIA_DE_APRESENTACAO.md
```

**Decisão de arquitetura:** o projeto utilizará múltiplas páginas HTML (MPA) em vez de uma SPA (Single Page Application), pois esta abordagem é mais simples, mais próxima do que foi estudado na disciplina e mais fácil de compreender e explicar.

Cada página HTML importará os arquivos CSS e JS necessários. O arquivo `storage.js` e `data.js` serão incluídos em todas as páginas como base.

---

## 13. Persistência

### Chave do localStorage
```
techtrack:data:v1
```

### Estrutura do objeto armazenado
```json
{
  "equipments": [],
  "maintenances": [],
  "locations": [],
  "responsibles": [],
  "events": []
}
```

### Regras de persistência
- Todos os dados são lidos e escritos em um único objeto JSON.
- Nenhum indicador calculado é armazenado. Todos são derivados em tempo de execução.
- A versão da chave (`v1`) permite futura migração de estrutura sem perda de dados.
- O backup exporta exatamente este objeto, sem transformações.

---

## 14. Restrições

- Sem backend, servidor ou banco de dados externo.
- Sem frameworks CSS (Bootstrap, Tailwind etc.).
- Sem frameworks JavaScript (React, Vue, Angular etc.).
- Sem CDNs ou APIs externas.
- Sem autenticação de usuários.
- Sem comunicação em rede durante o uso normal da aplicação.
- Os dados ficam restritos ao navegador do usuário.
- O localStorage possui limite de aproximadamente 5 MB por origem.

---

## 15. Requisitos Funcionais

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
| RF-10 | O sistema deve identificar manutenções atrasadas.                                  |
| RF-11 | O sistema deve identificar garantias próximas do vencimento.                       |
| RF-12 | O sistema deve gerar relatórios tabulares a partir dos dados armazenados.          |
| RF-13 | O sistema deve exportar todos os dados em formato JSON.                            |
| RF-14 | O sistema deve importar dados de um arquivo JSON com validação prévia.             |
| RF-15 | O sistema deve gerar QR Code para equipamentos e permitir download ou impressão.   |

---

## 16. Requisitos Não Funcionais

| ID     | Descrição                                                                             |
|--------|---------------------------------------------------------------------------------------|
| RNF-01 | A aplicação deve funcionar como site estático, sem servidor.                          |
| RNF-02 | A aplicação deve ser responsiva e utilizável em telas de 768px ou mais.               |
| RNF-03 | A interface deve ser simples, clara e compatível com o nível da disciplina.           |
| RNF-04 | Nenhuma dependência externa deve ser carregada em tempo de execução.                  |
| RNF-05 | O código deve ser organizado em arquivos separados por responsabilidade.              |
| RNF-06 | O código deve ser legível e comentado para facilitar a compreensão pelo aluno.        |
| RNF-07 | Os dados devem persistir entre sessões do navegador via localStorage.                 |
| RNF-08 | A aplicação deve preservar os dados existentes em caso de importação inválida.        |

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
- [ ] QR Code é gerado e pode ser baixado para qualquer equipamento.
- [ ] A aplicação funciona sem conexão com internet.
- [ ] A aplicação abre corretamente como arquivo HTML local no navegador.

---

*Última atualização: Etapa 00 — Fundação e documentação.*
