# Promessas da landing vs. capacidade atual

## Visão geral
A landing page atual comunica um produto maduro com operações pedagógicas, suporte multicanal, integrações corporativas e rotinas de compliance. Contudo, o estado real do projeto limita-se a uma página estática com modal de cadastro fictício; não há backend, times operacionais ou infraestrutura para cumprir os compromissos.

> **Decisão**: nenhuma promessa abaixo deve permanecer publicada sem prova operacional ou revisão do texto. Os comentários adicionados em `index.html` sinalizam trechos críticos para revisão urgente.

## Mapeamento detalhado
| Seção/Elemento | Promessa atual | Capacidade real (jun/2024) | Ajuste recomendado |
| --- | --- | --- | --- |
| Hero (CTA principal) | "Correções em até 48h úteis", "Plano de estudos após cada feedback", "LGPD e auditoria em todos os acessos" | Correção humana, plano de estudos e auditoria não existem; não há equipe nem rastreabilidade. | Remover SLA e plano até o serviço existir. Alternativa: comunicar piloto exploratório com feedback manual sob demanda. |
| Hero (CTA) | "Criar minha conta gratuita" leva ao modal, mas não há criação real de conta. | Modal apenas simula cadastro; não há API nem armazenamento. | Ajustar copy para "Cadastre-se para participar do piloto" e deixar claro que é uma lista de espera. |
| Seção "Como funciona" | Upload em PDF/DOCX, corretores certificados, plano de ação automático. | Sem backend, sem corretores, sem plano automatizado. | Reduzir para "protótipo em desenvolvimento" ou documentar requisitos mínimos para MVP (upload seguro, workflow de correção). |
| Seção "Para quem é" | Integração com LMS, dashboards, créditos extras, módulos offline, mentoria. | Nenhuma integração ou módulo existe. | Marcar como roadmap e remover da copy pública até haver planejamento técnico. |
| Seção "Quem corrige" | Equipe completa (coordenação, corretores, analistas). | Não há equipe constituída nem processos. | Apresentar como visão futura ou substituir por convite a professores parceiros em formação. |
| Seção "Feedback" | Exemplo com notas ENEM simuladas e plano automatizado. | Não há motor de correção ou geração de plano. | Rotular como mockup ou retirar até existir amostra real. |
| Seção "Planos e preços" | Limites mensais, SLA por plano, benefícios como mentorias e suporte dedicado. | Nenhum plano operacionalizado, sem sistema de cobrança ou suporte 7×6. | Publicar apenas estrutura de planos com *placeholder* “em definição” e referenciar `docs/planos-config.json` para alinhamento interno. |
| Garantia & LGPD | Reembolso em 7 dias, trilha de auditoria, criptografia AES-256/TLS 1.2. | Sem sistema de cobrança, sem auditoria, sem infraestrutura cloud provisionada. | Indicar que o piloto ainda não aceita pagamentos e que a política financeira será publicada quando o serviço estiver ativo. |
| Seção Legal | Nota fiscal automática, revisão/portabilidade de dados sob demanda, histórico de consentimento na conta. | Não há ERP/faturamento, nem backoffice para pedidos LGPD. | Reescrever como compromissos planejados, condicionados à implantação do backend descrito em `docs/arquitetura-backend.md`. |
| Footer/Contato | WhatsApp disponível. | Não existe canal oficial nem atendimento dedicado. | Substituir por e-mail de suporte provisório ou sinalizar horário limitado. |

## Recomendações complementares
1. **Produto & Conteúdo**: alinhar copy com limites do piloto. Destacar que estamos em fase de validação e que funcionalidades corporativas fazem parte do roadmap.
2. **Engenharia**: publicar apenas compromissos respaldados pelos documentos técnicos recém-criados (`docs/planos-config.json`, `docs/lgpd-consent.md`, `docs/api-contracts.md`).
3. **Jurídico/Financeiro**: somente prometer garantia, nota fiscal e políticas LGPD quando os fluxos estiverem implementados e auditados.
4. **Próximo release da landing**: aplicar ajustes indicados nos comentários do HTML antes de qualquer campanha de aquisição.
