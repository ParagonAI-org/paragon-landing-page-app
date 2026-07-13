# ParagonAI Branding

## Color Palette

| Token        | Hex       | Usage                          |
|--------------|-----------|--------------------------------|
| `terra`      | `#7C3AED` | Primary brand accent (violet)  |
| `terra-dark` | `#6D28D9` | Hover/dark variant of accent   |
| `ink`        | `#0F0F1A` | Primary text / dark background |
| `ink-light`  | `#1A1A2E` | Dark section backgrounds       |
| `stone`      | `#64648A` | Muted body text                |
| `stone-light`| `#9898B8` | Subdued text on dark surfaces  |
| `cream`      | `#FFFFFF` | Light background / white       |

## Typography

- **Font family**: [Geist](https://vercel.com/font) — used for display, body, and mono
- **Weights used**: 400, 500, 600, 700
- **Letter spacing**: tight for headings (`tracking-tight`), wide for labels (`tracking-[0.2em]`)

## Ambient Background

- Fixed canvas with radial gradient particles
- Colors alternate between **violet** `rgba(124, 58, 237)` and **blue** `rgba(59, 130, 246)`
- Opacity: very subtle (`0.01–0.04`) for a soft atmospheric glow

## Buttons

- **Primary**: dark ink background (`#0F0F1A`), violet (`#7C3AED`) fill slides up on hover, white text
- **Ghost**: transparent with ink border, violet border + text on hover

## Accent Details

- Nav link underlines: violet `#7C3AED`
- Release item left border accent: violet `#7C3AED`
- Hero divider line: gradient `#7C3AED` → `#3B82F6`
- Footer link underlines: violet `#7C3AED`
- Scrollbar thumb: violet-tinted `rgba(124, 58, 237, 0.25)`

## Dark Sections

- Insights and CTA sections use `ink` / `ink-light` backgrounds
- CTA ambient glow: violet `bg-violet-500/15` + blue `bg-blue-500/10` blurred orbs
