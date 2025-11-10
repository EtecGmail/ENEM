# Checklist de segurança inicial

- [ ] **CSP configurada**: `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:` (ajustar para CDNs autorizadas).
- [ ] **Security headers**: `Strict-Transport-Security`, `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- [ ] **Política de segredos**: segredos fora do código-fonte, armazenados em cofre seguro; revisão trimestral.
- [ ] **Varredura de dependências**: habilitar Dependabot + `npm audit` em CI.
- [ ] **Testes de vulnerabilidade**: rodar OWASP ZAP/ Burp no ambiente de homologação antes do go-live.
- [ ] **Revisão de permissões**: acesso mínimo aos dados de estudantes; logs em `audit_logs`.
- [ ] **Backup & restauração**: rotina diária validada e testada trimestralmente.

> Atualizar este checklist a cada release importante e arquivar evidências em pasta compartilhada de Compliance.
