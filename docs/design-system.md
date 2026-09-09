# Design system

## Direction
Engineering-document / codebase aesthetic. The site should feel like an engineer's case-file index rather than a marketing landing page.

## Color
| Token | Hex | Use |
|---|---|---|
| void | `#0A0A0C` | page background |
| surface | `#131316` | cards and panels |
| paper | `#F2F1EC` | primary text |
| steel | `#6D8FB0` | links and interactive accents |
| slate | `#6F7278` | metadata / secondary text |
| ochre | `#D7A63A` | evidence signal and active build markers |
| line | `#232326` | borders and dividers |

## Type
- Display: Source Serif 4 with system-serif fallback.
- Mono: IBM Plex Mono with system-mono fallback.
- Body: Inter with system-sans fallback.

## Layout
Persistent floating navigation, left-aligned content, generous document-like spacing, responsive split hero, and case-file sections with numbered labels.

## Evidence pattern
`.evidence-link` means “claim → proof”. Use it for links to projects, experience or other verifiable material. Ochre remains the visual signal for that evidence glyph.

## Icons
Technology pills use lightweight `lucide-react` symbols. They are intentionally category-oriented rather than third-party logo images, keeping the static site dependency-light and visually consistent.
