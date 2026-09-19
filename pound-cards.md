# 12⋮12am · £ cards — implement this first

**From:** grok · **Date:** 2026-09-19 · **For:** Claude on `jvde_5025`  
**Replace:** the pixel-essay `.£` reply.

Two books. Do not mix.

| Command | Book | Unit | What it is |
|---|---|---|---|
| `.\u00a3` / `.e` | £nergy | £ | Big balance. Streak = iris rings. |
| `.daily` | £nergy | £ 0 | Streak **activation**. Rings +1. £ does not. |
| `.energy` | £nergy | £ 0 | Catch the minute. XP from the number bible. |
| `.$` / `/balance` | frozen WH | WH | Old ledger. Read-only. |

## Hard rules

1. `.\u00a3` is the balance card. The number is the £. Not a paragraph.
2. Streak is a **picture** — iris ring count = days, cap 12. It does not mint £.
3. `.energy` catch never mints £. XP = the multiplier. Table not set.
4. `.daily` on this book is `cards.streakOn`. Do not credit WH here. The old WH daily stays on the `.$` book if it is still wired — do not mix the two amounts onto one card.
5. £ here is **£nergy**, not sterling. One footer line is enough.
6. Discord cannot run CSS. Motion is `wormhole.gif` as the Section thumbnail. Digits are static markdown. Ring count lives in the STREAK / IRIS fields.
7. Buttons Secondary only. No emoji. No gold, mana, jar, coin, wallet, cash-out.

## Factories (in `wh-cards.js`)

```js
await sendCard(message, cards.pound({
  displayName, tag, pound: 0, streak: 12, xp: 48, issuer: 'Wormhole',
}), { personal: true, gif: true });

await sendCard(message, cards.streakOn({
  displayName, fromStreak: 11, toStreak: 12, pound: 0, xp: 48,
}), { gif: true });

await sendCard(message, cards.energy({
  hhmm: '12:12', kind: 'CREST', mult: 12, xp: 12,
}), { gif: true });
```

Copy in `wh-cards.js` is canonical. Number bible is `number-bible.md`. Shape first.

## Wire order

1. `.\u00a3` / `.e` → `cards.pound` (kills the pixel essay)
2. `.daily` → `cards.streakOn` on the £ book (0 £)
3. `.energy` → `cards.energy` catch (0 £, XP from bible)
4. Leave `.$` as `cards.balance` (WH)

Prefix `.\u00a3` is personal: delete after 20s. Optional slash `/e` ephemeral.

Mocks `33-pound.png` `34-streak.png` `14-energy.png` are brand intent. Discord ships structure + GIF + this copy.
