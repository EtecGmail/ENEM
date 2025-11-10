# Estados de componentes

## Botões (`.btn-primary`, `.btn-ghost`)
| Estado | Descrição | Token |
| --- | --- | --- |
| Default | Fundo `--color-primary`, texto branco. | `--color-primary` |
| Hover/Focus | Fundo `--color-primary-dark`, sombra `--shadow-md`. | `--color-primary-dark` |
| Active | Mesmo tom dark, sem deslocamento. | `--color-primary-dark` |
| Disabled | Fundo `--color-neutral-300`, texto `--color-neutral-600`. | Neutros |
| Loading | Adiciona pseudo-elemento spinner com `currentColor`. | — |

`.btn-ghost` usa texto `--color-primary`, borda `currentColor`, com hover aplicando `--color-primary-10` como fundo.

## Inputs (`.input`)
| Estado | Estilo |
| --- | --- |
| Default | Borda `--color-neutral-300`, fundo branco. |
| Focus | Borda `--color-primary`, sombra leve `--shadow-sm`. |
| Error | Borda e texto auxiliar `--color-error`, mensagem `.error-message`. |
| Disabled | Borda `--color-neutral-200`, fundo `--color-neutral-100`, cursor `not-allowed`. |

## Links
| Estado | Estilo |
| --- | --- |
| Default | Cor `--color-primary`. |
| Hover/Focus | Sublinhado e cor `--color-primary-dark`. |
| Active | Mantém `--color-primary-dark`. |

## Alertas (`.alert-*`)
- `alert-success`: fundo `--color-secondary-10`, texto `--color-secondary-dark`.
- `alert-error`: fundo `rgba(255, 71, 93, 0.12)`, texto `--color-error`.
- `alert-info`: fundo `--color-primary-10`, texto `--color-primary`.

> Documentação complementar sobre tokens: `docs/design-system.md`.
