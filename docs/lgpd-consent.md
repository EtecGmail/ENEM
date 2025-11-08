# Modelo de consentimento LGPD versionado

## Campos obrigatórios
| Campo | Tipo | Descrição |
| --- | --- | --- |
| `id` | UUID | Identificador do registro de consentimento. |
| `usuario_id` | UUID | Referência ao usuário que aceitou o termo. |
| `versao_termo` | string | Identificador semântico da versão (ex.: `2024-05-30`). |
| `base_legal` | enum | `consentimento`, `execucao_contrato`, `legitimo_interesse` etc. |
| `aceito_em` | timestamp | Data/hora UTC do aceite. |
| `ip` | inet | IP de origem (quando disponível). |
| `user_agent` | string | Agente de usuário para auditoria. |
| `origem` | string | Canal onde o consentimento foi dado (`landing`, `app-web`, `importacao`). |
| `hash_documento` | string | Hash SHA-256 do PDF/texto do termo apresentado. |

## Regras de negócio
1. **Versão imutável**: cada alteração no texto gera nova versão (`versao_termo`) e invalida consentimentos anteriores para novos tratamentos.
2. **Revogação**: armazenar data de revogação em tabela complementar ou atualizar status para `revogado`. Disparar evento `consentimento_revogado`.
3. **Auditoria**: salvar `hash_documento` e apontar para repositório versionado do termo (ex.: S3). Permite provar qual texto estava vigente.
4. **Sincronização**: API deve retornar consentimentos ativos no login para exibir histórico ao usuário.
5. **Retenção**: manter registros por no mínimo 5 anos após encerramento do contrato, conforme orientações LGPD.

## Fluxo sugerido
1. Usuário abre modal de cadastro → checkbox padrão `unchecked` com link para termo.
2. Ao marcar e enviar formulário, frontend envia payload para `/api/v1/consents` (ver `docs/api-contracts.md`).
3. Backend valida versão atual, registra hash e dispara evento `consentimento_registrado`.
4. Caso o usuário revogue, exibir aviso sobre consequências (ex.: suspensão do serviço) e registrar revogação.
