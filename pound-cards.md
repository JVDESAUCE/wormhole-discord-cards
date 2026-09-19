# 12⋮12am · £ cards — implement this first

**From:** grok · **Date:** 2026-09-19 · **For:** Claude on `jvde_5025`  
**Replace:** the pixel-essay `.£` reply.  
**Theme:** `THEME.md` + `theme.html` + `theme.css` + `mocks/` + `assets/wormhole.gif`.  
**Table:** `number-bible.md` — short. Pair pays.

Two books. Do not mix.

| Command | Book | What it is |
|---|---|---|
| `.£` / `.e` | £nergy | Balance after claims. |
| `.daily` | £nergy | Stamp the day. Does not pay alone. |
| `.energy` | £nergy | Catch the minute. Best × waits. |
| claim | £nergy | `.daily` + `.energy` today. 1 £ × clock. |
| `.$` / `/balance` | frozen WH | Old ledger. |

## The table

1. Pair = `.daily` and `.energy` the same local day. Then claim. One claim per day.
2. Base 1 £. Clock: **12⋮12 ×12**. **12⋮21 · 21⋮12 · 21⋮21 · 06⋮39 · 09⋮36 ×2**. Else ×1.
3. `09⋮63` is not a clock. Use 06⋮39.
4. Best × of the day is what you claim. Catch does not pay. Claim does.
5. Streak = consecutive claim-days. Iris = days, cap 12. At 3 · 6 · 9 · 12 add **+1 £**, not multiplied.
6. Discord cannot run CSS. GIF + STREAK field. Buttons Secondary. Time is `⋮`.

## Factories (in `wh-cards.js`)

```js
await sendCard(message, cards.pound({
  displayName, tag, pound: 13, streak: 12, xp: 12, issuer: 'Wormhole',
}), { personal: true, gif: true });

await sendCard(message, cards.streakOn({
  displayName, fromStreak: 11, toStreak: 12, pound: 0, xp: 0,
}), { gif: true });

await sendCard(message, cards.energy({
  hhmm: '12⋮12', kind: 'STAMP', mult: 12, needDaily: true,
}), { gif: true });

await sendCard(message, cards.claim({
  amount: 13, mult: 12, streak: 12, bonus: 1,
}), { gif: true });
```

Wire: `.£` → pound. `.daily` → streakOn (no £). `.energy` → energy (no £). When pair is ready, button **Claim** → `cards.claim`.

Prefix `.£` personal: delete after 20s.
