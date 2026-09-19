# 12⋮12am theme — Discord + web

**From:** grok · **Date:** 2026-09-19 · **For:** Claude  
Open **`theme.html`** first. That is the board. Then `theme.css` on web, `wh-cards.js` on Discord.

This folder is the whole kit: tokens, CSS, glyphs, GIF, PNG mocks, factory, bible.

Two surfaces. One language. Do not invent a third.

| Surface | Motion | Type | Rings | Time |
|---|---|---|---|---|
| **Web** | CSS iris + 6↔9 turn | Syne / IBM Plex | Drawn. Cap 12. | Glyph `⋮` (three dots) |
| **Discord** | `wormhole.gif` only | Discord markdown | FIRE field | Text `12⋮12` |

Discord cannot run this CSS. Do not fake cards as PNG in chat. Web must not look like a Discord embed.

---

## Files

| Path | Use |
|---|---|
| `theme.html` | Open in a browser. Live branded cards + tokens. |
| `theme.css` | Drop into the web app. No Tailwind required. |
| `tokens.json` | Machine tokens for both surfaces. |
| `assets/wormhole.gif` | Discord thumbnail / hero. Same file as bank.1212.is. |
| `assets/digits.svg` | 0–9 + `⋮`. 6 is the 9 path at 180°. |
| `assets/favicon.svg` | Iris + two-dot face. |
| `assets/og.jpg` | Share card. |
| `mocks/33-pound.png` | Brand `.£` |
| `mocks/34-streak.png` | Brand streak on |
| `mocks/14-energy.png` | Brand catch `12⋮12` |
| `mocks/*.png` | Full catalogue (Discord structure). |
| `wh-cards.js` | Discord Components V2 factory. |
| `pound-cards.md` | Wire `.£` first. |
| `number-bible.md` | Catch multipliers. Shape first. |
| `CLAUDE.md` | Discord catalogue. |

---

## Colour

Web (page):

```
bg        #070708
surface   #111114
raised    #18181c
fg        #eceef2
muted     #8d8e96
faint     #5c5d66
border    #26262c
accent    #c9ccd4
accent-fg #070708
ok        #7d9b86
warn      #b9a27a
bad       #b57a76
```

Discord (chat chrome — do not use on web cards):

```
chat      #313338
card      #2b2d31
head      #f2f3f5
text      #dbdee1
muted     #949ba4
hair      #3f4147
btn       #4e5058
```

Accent bars (both):

```
accent    #c9ccd4    0xc9ccd4
ok        #7d9b86    0x7d9b86
warn      #b9a27a    0xb9a27a
bad       #b57a76    0xb57a76
```

No blurple. No gold. No purple. No extra hues.

---

## Type

- **Display** — Syne 500–700. Big £, catch multiplier, card titles on web.
- **Sans** — IBM Plex Sans 400–600. Body, kickers (uppercase, tracking 0.2em).
- **Mono** — IBM Plex Mono 400–500. Tags, times as text, data.

Google:

```
https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&family=Syne:wght@500;600;700&display=swap
```

Discord has neither Syne nor Plex. Chase the **copy and the bar**, not the typeface.

Kicker: 11px, uppercase, letter-spacing 0.2em, muted.

Radius web: 8 / 12 / 20 / 28. Discord card: 8px, left bar 4px.

---

## Time mark

Player-facing clock is **`⋮`** (U+22EE), three dots, never `:`.

12⋮12 · 06⋮39 · 09⋮36 · 00⋮00

Internal keys may stay `HH:MM`. `markTime()` in `wh-cards.js` and `theme.css` consumers convert.

On web the mark is three dots in the digit row (`assets/digits.svg#mark`). On Discord it is the unicode character in markdown.

---

## Motion

| Wanted | Web | Discord |
|---|---|---|
| Iris / fire picture | `.iris` rings, one per day, cap 12 | Field `FIRE n` |
| Wormhole | Optional. GIF is identity, not the ring. | `wormhole.gif` Section thumbnail |
| 6 ↔ 9 | `.glyph-turn-six` / `.glyph-turn-nine` | Static digits. Do not animate markdown. |
| Big number | CSS. Static. | `# 0 £` static |

`prefers-reduced-motion`: iris stops, 6/9 stop.

---

## Two books (do not mix)

| Book | Unit | Web | Discord |
|---|---|---|---|
| £nergy | £ | Branded card. Iris. Glyphs. | `cards.pound` `streakOn` `energy` |
| Frozen WH | WH | Separate surface if shown | `cards.balance` and the WH catalogue |

`.£` is a **big number**. `.energy` and `.daily` are one play. Cool minutes pay 2 £. 12⋮12 pays 12 £. Fire is iris + a flat Treat +1 £ at 3 · 6 · 9 · 12. Cards last 3 seconds. Bank link on every card.

---

## Web assembly

1. Link the Google font URL.
2. Link `theme.css`.
3. Copy the branded-card markup from `theme.html` (pound / streak / catch).
4. Use `assets/digits.svg` for the clock. 6 uses the 9 path + `rotate(180deg)`.
5. Iris: N `.iris-ring` children, width `18% + i * (70 / N)%`, cap 12.
6. Do not port Discord greys onto the web card.

## Discord assembly

1. discord.js 14.16+ `ContainerBuilder` + `IsComponentsV2`.
2. Drop `wh-cards.js` next to the economy module.
3. Ship `assets/wormhole.gif` as `attachment://wormhole.gif`.
4. Wire `.£` → `cards.pound`. Then `.daily` → `cards.streakOn`. Then `.energy` → `cards.energy`.
5. PNG mocks are **intent**. Chat ships structure + GIF + copy.

---

## Do not

- Colon in player-facing time
- Gold, mana, jar, coin, wallet, cash-out, emoji on buttons
- Blurple Primary
- CSS-in-PNG posted as a Discord message
- WH on a £ card, £ on a WH card
- Mint £ from a catch or a streak
- People-graphs, thought-rows, seed phrases
