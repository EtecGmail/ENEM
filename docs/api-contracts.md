# Contratos de API (MVP)

Formato base: REST JSON, prefixo `/api/v1`. Todas as respostas possuem envelope `{ "data": ..., "meta": ... }` quando aplicável. Erros seguem `{ "error": { "code": "string", "message": "string", "details": {} } }`.

## Autenticação & Usuários
### POST `/api/v1/users`
- **Descrição**: cria usuário e inicia fluxo de verificação de e-mail.
- **Request**
```json
{
  "nome_completo": "Ana Souza",
  "email": "ana@example.com",
  "senha": "segredo123",
  "plano": "essencial",
  "aceitou_termos": true,
  "origem": "landing"
}
```
- **Response 201**
```json
{
  "data": {
    "id": "usr_01HXXX",
    "email": "ana@example.com",
    "plano": "essencial",
    "status_verificacao": "pendente"
  }
}
```

### POST `/api/v1/auth/token`
- **Descrição**: autenticação por senha.
- **Request**: `{ "email": "ana@example.com", "senha": "segredo123" }
- **Response 200**: `{ "data": { "access_token": "jwt", "refresh_token": "jwt" } }`

## Planos
### POST `/api/v1/user-plans`
- **Descrição**: associa usuário a um plano ou altera limite.
- **Request**
```json
{
  "usuario_id": "usr_01HXXX",
  "plano": "avancado",
  "origem": "dashboard-web"
}
```
- **Response 200**: `{ "data": { "plano": "avancado", "vigencia_inicio": "2024-06-01" } }`

### GET `/api/v1/plans`
- **Descrição**: lista planos ativos de acordo com `docs/planos-config.json`.
- **Response 200**
```json
{
  "data": [
    {
      "id": "essencial",
      "monthlyEssayLimit": 2,
      "correctionSlaHours": 96,
      "supportChannels": ["email"]
    }
  ]
}
```

## Consentimentos
### POST `/api/v1/consents`
- **Descrição**: registra aceite LGPD versionado.
- **Request**
```json
{
  "usuario_id": "usr_01HXXX",
  "versao_termo": "2024-05-30",
  "base_legal": "consentimento",
  "ip": "177.1.1.1",
  "user_agent": "Mozilla/5.0",
  "origem": "landing"
}
```
- **Response 201**: `{ "data": { "id": "cns_01HYYY", "registrado_em": "2024-06-01T12:00:00Z" } }`

## Redações
### POST `/api/v1/essays`
- **Descrição**: envia redação para correção (form-data com arquivo ou texto).
- **Request (JSON)**
```json
{
  "usuario_id": "usr_01HXXX",
  "plano": "essencial",
  "formato_envio": "texto",
  "conteudo": "string base64",
  "tema": "Democracia e cidadania digital"
}
```
- **Response 202**: `{ "data": { "id": "esy_01HZZZ", "status": "em_correcao" } }`

### GET `/api/v1/essays`
- **Descrição**: lista redações do usuário (filtrável por status).
- **Query params**: `usuario_id`, `status?`
- **Response 200**
```json
{
  "data": [
    {
      "id": "esy_01HZZZ",
      "status": "corrigida",
      "nota_total": 920,
      "tempo_resposta_horas": 60
    }
  ]
}
```

## Eventos
### POST `/api/v1/events`
- **Descrição**: ingestão de eventos listados em `docs/tracking-events.md`.
- **Request**
```json
{
  "evento": "redacao_enviada",
  "payload": {
    "id_usuario": "usr_01HXXX",
    "plano": "essencial",
    "timestamp": "2024-06-01T12:00:00Z",
    "origem": "dashboard-web",
    "formato_envio": "pdf",
    "tema": "Cidadania"
  }
}
```
- **Response 202**: `{ "data": { "id": "evt_01HAAA", "status": "recebido" } }`

> **Autorização**: utilizar Bearer Token (JWT) com escopos por serviço. Parceiros B2B recebem API keys com rotação trimestral.
