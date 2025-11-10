# Eventos obrigatórios de produto

Todos os eventos seguem o padrão ISO 8601 para timestamp (`2024-06-01T12:00:00Z`) e utilizam `id_usuario` e `plano` conforme configurado em `docs/planos-config.json`. O campo `origem` deve indicar o ponto de contato (`landing`, `onboarding`, `dashboard-web`, `api`).

| Evento | Quando disparar | Payload mínimo |
| --- | --- | --- |
| `usuario_cadastrado` | Após confirmação do e-mail ou criação manual pela equipe. | `{ id_usuario, email, plano, timestamp, origem }` |
| `plano_selecionado` | Ao usuário escolher ou trocar plano (inclui free trial). | `{ id_usuario, plano, timestamp, origem, valor_plano }` |
| `consentimento_registrado` | No aceite da LGPD, antes de qualquer tratamento de dados. | `{ id_usuario, plano, timestamp, origem, versao_termo, base_legal, ip, user_agent }` |
| `redacao_enviada` | Sempre que uma redação é submetida (upload ou texto digitado). | `{ id_usuario, plano, timestamp, origem, formato_envio, tema }` |
| `redacao_corrigida` | Quando a correção é publicada para o estudante. | `{ id_usuario, plano, timestamp, origem, nota_total, competencias_completas, tempo_resposta_horas }` |
| `plano_de_acao_enviado` | Quando o plano de estudos complementar é liberado. | `{ id_usuario, plano, timestamp, origem, recomendacoes_qtd }` |
| `plano_cancelado` | Ao cancelar assinatura ou encerrar contrato institucional. | `{ id_usuario, plano, timestamp, origem, motivo_cancelamento }` |
| `contato_suporte_aberto` | Sempre que o canal prioritário for acionado. | `{ id_usuario, plano, timestamp, origem, canal, assunto }` |
| `consentimento_revogado` | Se o usuário retirar o consentimento LGPD. | `{ id_usuario, plano, timestamp, origem, versao_termo }` |

> **Regras gerais**
> - Os eventos devem ser resilientes: reenvio em caso de falha e armazenamento no mínimo por 12 meses.
> - A API pública deve expor um endpoint de ingestão para parceiros B2B, descrito em `docs/api-contracts.md`.
> - Documentar no Data Catalog interno como cada evento é consumido (BI, CRM, suporte).
