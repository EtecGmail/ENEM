# Plataforma ENEM - Redação+

## 📋 Sobre o Projeto
Plataforma digital de preparação para o ENEM com foco em Língua Portuguesa e Redação, desenvolvida para ser acessível, performática e alinhada com as necessidades reais dos estudantes brasileiros.

## 📚 Documentação viva
- Limites e SLAs por plano: [`docs/planos-config.json`](docs/planos-config.json) + resumo para conteúdo em [`docs/planos-resumo.md`](docs/planos-resumo.md).
- Auditoria de promessas vs. capacidade atual: [`docs/promessas-vs-realidade.md`](docs/promessas-vs-realidade.md).
- Guia de arquitetura e contratos de API: [`docs/arquitetura-backend.md`](docs/arquitetura-backend.md) e [`docs/api-contracts.md`](docs/api-contracts.md).
- Eventos obrigatórios e compliance LGPD: [`docs/tracking-events.md`](docs/tracking-events.md) e [`docs/lgpd-consent.md`](docs/lgpd-consent.md).
- Design System e tokens de cor: [`docs/design-system.md`](docs/design-system.md) e [`docs/design-system-components.md`](docs/design-system-components.md).

## 📜 Regras do Clube de Redação
### Quantidade de redações por plano
- **Plano Essencial**: até 2 redações mensais por estudante.
- **Plano Avançado**: até 4 redações mensais por estudante.
- **Plano Premium**: até 6 redações mensais por estudante.
- **Plano B2B/B2G**: limites personalizados mediante contrato, seguindo o cálculo de sustentabilidade descrito na política de limites.

### SLA de correção
- Correções entregues em **até 96 horas úteis** para o plano Essencial.
- Correções entregues em **até 72 horas úteis** para o Plano Avançado.
- Correções entregues em **até 48 horas úteis** para o Plano Premium.
- Projetos corporativos/governamentais seguem SLA acordado em contrato, com prioridade máxima de 24 horas úteis para demandas emergenciais.

### Formatos aceitos
- Upload em PDF, DOCX ou texto digitado diretamente na plataforma.
- Redações manuscritas digitalizadas aceitas se estiverem legíveis e em alta resolução (mínimo de 300 dpi).
- Cada envio deve conter apenas uma redação, com identificação do estudante e tema.

### Entregáveis de correção
- Nota técnica alinhada às competências do ENEM.
- Feedback qualitativo por competência, com sugestões de melhoria.
- Modelo de parágrafo reescrito quando o erro estrutural exigir referência concreta.
- Plano de estudo personalizado quando identificado padrão de lacuna recorrente.

## 🔧 Qualidade & automação
- `npm run lint` — executa ESLint, Stylelint e HTMLHint.
- `npm test` — roda os testes unitários (`tests/run-tests.js`).
- CI: workflow GitHub Actions (`.github/workflows/ci.yml`) instala dependências, roda lint e testes em cada push/PR.

> Dica: mantenha a documentação em `/docs` sincronizada a cada mudança de produto ou arquitetura para preservar o alinhamento entre landing page e capacidade técnica.

## ♻️ Política de Limites e Sustentabilidade
### Limites por plano
- O consumo mensal de redações é monitorado em tempo real.
- Em casos de excedente, o envio é bloqueado automaticamente e o estudante é orientado a contratar créditos adicionais.
- Créditos extras podem ser adquiridos em lotes de 2 redações.

### Cálculo de custo e sustentabilidade
- O custo marginal considera horas de correção, revisão pedagógica e manutenção da plataforma.
- Cada crédito adicional é precificado com base em: `tempo de correção (h) × valor hora da equipe + 15% de overhead operacional`.
- Relatórios trimestrais avaliam a viabilidade financeira de cada plano para ajustes proativos.

## 🔐 Diretrizes de LGPD
### Quem acessa os dados
- Corretores certificados, equipe pedagógica e time de produto têm acesso restrito aos dados necessários para cumprir suas funções.
- Todo acesso é registrado em trilhas de auditoria automatizadas.

### Uso dos dados
- Os dados são utilizados exclusivamente para correção, melhoria contínua do método e desenvolvimento de recursos educacionais.
- Dados anonimizados podem alimentar relatórios estatísticos e pesquisas internas.

### Armazenamento
- Dados e redações são armazenados em infraestrutura cloud com criptografia em repouso (AES-256) e em trânsito (TLS 1.2+).
- Backups diários com retenção de 90 dias, revisados por controles de integridade mensalmente.

### Exclusão
- Estudantes podem solicitar exclusão definitiva a qualquer momento, com prazo máximo de 15 dias para conclusão.
- Ao término de contratos B2B/B2G, os dados são anonimizados ou removidos em até 30 dias, conforme cláusula contratual.

## 🚀 Manifesto e Metodologia "Método Soraia"
- Foco em interdisciplinaridade e repertório sociocultural relevante.
- Correções orientadas por rubrica clara, com atenção à originalidade e argumentação baseada em evidências.
- Feedbacks humanizados, que conectam teoria à prática do estudante.
- Iterações ágeis: cada rodada de feedback gera um plano de ação com metas mensuráveis.

## 🧩 Pacotes B2B e B2G
- **Educação Básica Privada**: integração com LMS, dashboards por turma e capacitação docente.
- **Redes Públicas**: formação de corretores locais, relatórios de impacto e módulos offline para regiões com baixa conectividade.
- **Programas Sociais e ONGs**: descontos progressivos, oficinas síncronas e mentoria para equipes voluntárias.
- Todos os pacotes incluem cláusulas de confidencialidade, SLA dedicado e suporte técnico 7×5.

## 🎯 Metas Numéricas do Piloto
- Atingir **200 estudantes ativos** no Plano Essencial, **100** no Avançado e **50** no Premium até o final do piloto.
- Garantir **90%** de aderência ao SLA de correção e **95%** de satisfação nas pesquisas pós-correção.
- Fechar **3 contratos B2B** e **1 contrato B2G** no período de 6 meses.
- Reduzir o custo marginal por correção em **15%** através da otimização de processos.

## ✅ Validação Interna
Antes da publicação, confirmar que:
1. Todas as regras do clube, políticas de limites, diretrizes de LGPD, pilares do Método Soraia, pacotes B2B/B2G e metas do piloto estão descritos com clareza.
2. O texto atende simultaneamente aos requisitos de contrato/copy pública e de guia interno de correção.
3. O conteúdo reflete integralmente o plano estratégico vigente e está alinhado com a capacidade operacional da equipe.

