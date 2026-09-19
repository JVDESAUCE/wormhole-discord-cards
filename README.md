# 12⋮12am theme kit

Full theme for **web** and **Discord**. Graphics included.

**Open [`theme.html`](theme.html) first.** Then:

1. [`THEME.md`](THEME.md) — visual language
2. [`pound-cards.md`](pound-cards.md) — wire `.£`
3. [`wh-cards.js`](wh-cards.js) — Discord factory
4. [`theme.css`](theme.css) — web drop-in

## Two surfaces

| | Web | Discord |
|---|---|---|
| Motion | CSS iris, 6↔9 turn | `assets/wormhole.gif` |
| Type | Syne + IBM Plex | Markdown. No custom font. |
| Time | Three-dot glyph `⋮` | Text `12⋮12` |
| Pile | Big **£** | `cards.pound` |
| Fire | Rings, cap 12 | `FIRE n` |
| Catch | Glyphs `12⋮12` | `cards.energy` / `cards.got` |

## Graphics

- `mocks/33-pound.png` `34-streak.png` `14-energy.png` — brand cards
- `mocks/*.png` — full Discord catalogue
- `assets/wormhole.gif` — the only animation Discord can run
- `assets/digits.svg` — 0–9 + mark. 6 is 9 rotated 180°
- `assets/favicon.svg` `assets/og.jpg`

## Commands

- `.£` / `.e` — your pile. Fire is the picture.
- `.daily` — you're in. Now `.energy`.
- `.energy` — catch the clock. Do both, get £. Time is **12⋮12**.
- `.$` — frozen WH. Separate book.

Cards last **3 seconds**. Every card has **Bank** → https://bank.1212.is

Player-facing time uses **⋮**, never `:`. `markTime()` converts.

See [`MANIFEST.md`](MANIFEST.md) for the file tree.
