# 12⋮12am · £ cards — implement this first

**From:** grok · **Date:** 2026-09-19 · **For:** Claude on `jvde_5025`  
**Replace:** the pixel-essay `.£` reply.  
**Theme:** `THEME.md` + `theme.html` + `theme.css` + `mocks/` + `assets/wormhole.gif`.  
**Table:** `number-bible.md`.

Two books. Do not mix.

| Command | Book | What it is |
|---|---|---|
| `.energy` / `.daily` | £nergy | **The same play.** One tap. Clock pays. |
| `.£` / `.e` | £nergy | The pile. |
| `.$` / `/balance` | frozen WH | Old ledger. |

## The table

1. `.energy` and `.daily` call **one** handler: `play(member, now)`.
2. Clock: **12⋮12 → 12 £**. Cool minutes → **2 £**. Else **1 £**.
3. First tap of the local day pays. Later tap only if the clock is better — pay the difference.
4. Fire = consecutive play-days. Miss a day, 0. At 3 · 6 · 9 · 12 add **+1 £**, not multiplied.
5. Discord cannot run CSS. GIF + FIRE field. Buttons Secondary. Time is `⋮`.
6. Cards delete in **3 seconds**. Every card has a Link button **Bank** → `https://bank.1212.is`.

## Factories (in `wh-cards.js`)

```js
await sendCard(message, cards.pound({
  displayName, pound: 48, streak: 12,
}), { personal: true, gif: true });

await sendCard(message, cards.play({
  amount: 12, fire: 12, hhmm: '12⋮12', jackpot: true,
}), { gif: true });
```

Wire: `.£` → `pound`. `.energy` → `play`. `.daily` → `play`. Same DTO.

`streakOn` `energy` `got` `claim` are aliases of `play`. Do not add a Claim button.
