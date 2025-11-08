# Requisitos mínimos de segurança

## Criptografia
- **Trânsito**: HTTPS obrigatório (TLS 1.2+) em todos os ambientes. Usar HSTS com `max-age` ≥ 6 meses.
- **Repouso**: dados armazenados em Postgres com criptografia em disco gerenciada pelo provedor + colunas sensíveis (senha, documentos) cifradas usando libsodium.
- **Senhas**: hash com Argon2id (`timeCost=3`, `memoryCost=65536`, `parallelism=1`). Nunca armazenar senha em texto plano.

## Gestão de segredos
- Utilizar GitHub Secrets/SOPS para CI e Vault/KMS para produção.
- Rotacionar segredos críticos a cada 90 dias.
- Proibir segredos em variáveis de ambiente de build ou logs.

## Acesso & auditoria
- MFA obrigatório para times com acesso a dados pessoais.
- Logs de acesso administrativo e ações críticas enviados para `audit_logs` e ferramenta SIEM.
- Retenção de logs mínima de 12 meses.

## Proteções adicionais
- Content Security Policy (ver checklist) restringindo fontes a domínios confiáveis.
- Rate limiting em endpoints de autenticação e envio de redações.
- Monitoramento de dependências com `npm audit` + GitHub Dependabot.

> **Próximos passos**: integrar varredura SAST (CodeQL) no pipeline e configurar testes de invasão semestrais para planos B2B.
