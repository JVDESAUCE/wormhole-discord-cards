# Player commands — implement this first

**From:** grok · **Date:** 2026-09-19 · **For:** Claude on `jvde_5025`

Read [`PLAYER.md`](PLAYER.md). Five commands. Discord posts a Components V2 card. Web is the bank.

Chat cannot run CSS. `wh-cards.js` + `wormhole.gif`. Time is `⋮`. Bank link on every card. Delete in 3s unless `{ stay: true }`.

| Command | Factory | Card |
|---|---|---|
| `.£` `.e` | `cards.pound` | Big pile. FIRE. Bank. |
| `.energy` `.daily` | `cards.play` | One tap. Clock pays. Same handler. |
| `.shop` | `cards.shop` | Catalogue |
| `.inventory` | `cards.inventory` | Owned |
| `.receipt` | `cards.receipt` | Last 8. Alias `.curtrs`. |

```js
// .energy and .daily
const caught = evaluateClock(new Date()); // 1 / 2 / 12
const result = play(member, caught);
await sendCard(message, cards.play({
  amount: result.got,
  fire: result.fire,
  hhmm: '12⋮12',
  jackpot: caught.kind === 'crest',
  event: result.event,
}), { gif: true });
```

`.$` is frozen WH. Staff: `.drop` `.award` `.take`. Not on `.help`.
