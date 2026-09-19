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
| Balance | Big **0 £** | `cards.pound` |
| Streak | Rings, cap 12 | `STREAK n · iris n` |
| Catch | Glyphs `12⋮12` | `cards.energy` · £ 0 |

## Graphics

- `mocks/33-pound.png` `34-streak.png` `14-energy.png` — brand cards
- `mocks/*.png` — full Discord catalogue
- `assets/wormhole.gif` — the only animation Discord can run
- `assets/digits.svg` — 0–9 + mark. 6 is 9 rotated 180°
- `assets/favicon.svg` `assets/og.jpg`

## Commands

- `.£` / `.e` — big £. Streak is iris, not extra £.
- `.daily` — streak activation. 0 £.
- `.energy` — catch the minute. XP from [`number-bible.md`](number-bible.md). 0 £. Time is **12⋮12**.
- `.$` — frozen WH. Separate book.

Player-facing time uses **⋮**, never `:`. `markTime()` converts.

See [`MANIFEST.md`](MANIFEST.md) for the file tree.
