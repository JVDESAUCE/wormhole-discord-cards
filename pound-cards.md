# 12⋮12am · £ cards — implement this first

**From:** grok · **Date:** 2026-09-19 · **For:** Claude on `jvde_5025`  
**Replace:** the pixel-essay `.£` reply.  
**Theme:** `THEME.md` + `theme.html` + `theme.css` + `mocks/` + `assets/wormhole.gif`.  
**Table:** `number-bible.md`.

Two books. Do not mix. Kid words only on player cards: Fire, Treat, Jackpot, Cool.

| Command | Book | What it is |
|---|---|---|
| `.£` / `.e` | £nergy | Your pile. |
| `.daily` | £nergy | Start today. Does not pay alone. |
| `.energy` | £nergy | Catch the clock. Does not pay alone. |
| both, same day | £nergy | Auto-pays. 1 £, or 2 £ cool, or 12 £ jackpot. |
| `.$` / `/balance` | frozen WH | Old ledger. |

## The table

1. `.daily` + `.energy` the same local day. Second tap pays. No Claim button.
2. Base 1 £. **12⋮12 = 12 £** (jackpot). **12⋮21 · 21⋮12 · 21⋮21 · 06⋮39 · 09⋮36 = 2 £** (cool). Else 1 £.
3. `09⋮63` is not a clock. Use 06⋮39.
4. Best minute of the day wins. Extra energy can top up.
5. Fire = days in a row. Miss a day, it dies. Treat +1 £ at 3 · 6 · 9 · 12, not multiplied.
6. Cards last **3 seconds**. Every card has a **Bank** Link button → `https://bank.1212.is`.
7. Discord cannot run CSS. GIF + FIRE field. Buttons Secondary except Bank (Link). Time is `⋮`.

## Factories (in `wh-cards.js`)

```js
await sendCard(message, cards.pound({
  displayName, tag, pound: 48, streak: 12,
}), { personal: true, gif: true });

await sendCard(message, cards.streakOn({
  fire: 11, event: 'wait-energy',
}), { gif: true });

await sendCard(message, cards.energy({
  hhmm: '12⋮12', fire: 11, event: 'wait-daily',
}), { gif: true });

await sendCard(message, cards.got({
  amount: 12, fire: 12, treat: 1, jackpot: true,
}), { gif: true });
```

Wire:

- `.£` → `cards.pound`
- `.daily` → `streakOn` if they still need `.energy`; `got` if that was the second tap; `already` if done
- `.energy` → `energy` if they still need `.daily`; `got` if that was the second tap; `already` if done and no top-up
- `cards.claim` is an alias of `got`. Do not show a Claim button.

Prefix command cards: delete after **3s**. Live drop and L1 till receipts pass `{ stay: true }`.
Bank link is appended by `build()` — do not remove it.
