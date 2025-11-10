# Guia do design system

## Atualização de tokens de cor
- **Primário**: `--color-primary` ajustado para `#1E3A8A` (ratio 5.67:1 com texto branco), garantindo AA.
- **Primário dark**: `#162C6A` para estados hover/focus.
- **Primário light**: `#3456C6` para fundos suaves.
- **Secundário**: `#0B7A5C` com contraste AA para texto branco; variações `--color-secondary-dark` `#075C45`, `--color-secondary-light` `#17A37C`.
- Atualizar gradientes e estados de botão para usar tokens em vez de valores fixos (ver `styles/components/_buttons.css`).

## Responsividade
| Breakpoint | Layout do hero | Cards/Grids |
| --- | --- | --- |
| `< 640px` | Hero em pilha única, CTA largura total, feedback global abaixo do título. | Cards em uma coluna. |
| `640px – 1023px` | Hero em grid de duas faixas: copy + CTA, features abaixo. | Processos/audiências em duas colunas. |
| `≥ 1024px` | Hero centralizado com duas colunas (texto + ilustração futura) e CTA alinhado à esquerda. | Pricing em três colunas, feedback em layout de duas colunas. |

## Estados interativos
Consultar `docs/design-system-components.md` para estados detalhados de botões, inputs e links. O foco visível deve usar `outline` de 2px com `--color-primary` e `outline-offset` de 2px.

## Referências cruzadas
- Ajustes de contraste refletem recomendações da auditoria de UI (`styles/base/_tokens.css`).
- Responsividade impacta `styles/pages/_landing.css` e `onboarding.html`. Documentar qualquer exceção neste arquivo.
