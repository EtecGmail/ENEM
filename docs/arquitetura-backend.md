# Arquitetura mínima da API

## Stack recomendada
- **Runtime**: Node.js 20 LTS
- **Framework**: NestJS (estrutura modular, DI nativa e suporte a OpenAPI)
- **Banco de dados**: PostgreSQL 15
- **ORM**: Prisma ou TypeORM (preferir Prisma pela produtividade)
- **Mensageria futura**: fila baseada em Redis/ BullMQ para tarefas de correção (fase 2)
- **Infraestrutura**: Docker + Terraform para provisionamento, deploy inicial em ambiente cloud gerenciado (Railway/Render/Heroku Provisório) com pipeline GitHub Actions.

## Serviços e responsabilidades
| Serviço | Responsabilidade principal | Observações |
| --- | --- | --- |
| Auth | Cadastro, login, reset de senha, gestão de tokens. | Utilizar JWT de curta duração + refresh token armazenado com rotacionamento. |
| Usuários | Perfil pedagógico, dados pessoais mínimos, status de verificação. | Respeitar LGPD: coleta mínima, campos opcionais para dados sensíveis. |
| Planos | Catálogo de planos, limites por usuário e histórico de upgrades/downgrades. | Fonte única dos limites definidos em `docs/planos-config.json`. |
| Redações | Upload (S3/GCS), metadados, status da correção e feedback. | Processamento assíncrono para garantir SLA. |
| Consentimentos | Registro versionado do aceite LGPD. | Implementar de acordo com `docs/lgpd-consent.md`. |
| Eventos | Ingestão e distribuição de eventos de produto. | Persistir fila em `audit_logs` para reprocessamento. |

## Fluxo de alto nível
1. Usuário cria conta → Auth + Usuários → evento `usuario_cadastrado`.
2. Seleção de plano → Planos aplica limites → evento `plano_selecionado`.
3. Consentimento LGPD obrigatório → Consentimentos → evento `consentimento_registrado`.
4. Envio de redação → Redações salva arquivo + metadata → fila de correção.
5. Publicação de correção → Redações atualiza status → evento `redacao_corrigida`.
6. Logs e auditoria centralizados no serviço de Eventos/Audit.

## Considerações de segurança
- TLS obrigatório desde o primeiro deploy.
- Hash de senha com Argon2id, custo calibrado conforme `docs/security-baseline.md`.
- Aplicar política de segredos via Vault ou GitHub Secrets + SOPS.
- Auditoria de acessos administrativos registrada em `audit_logs`.
