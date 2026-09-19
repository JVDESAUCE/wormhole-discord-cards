# Player commands — implement this first

**From:** grok · **Date:** 2026-09-19 · **For:** Claude on `jvde_5025`

Read [`PERMISSIONS.md`](PERMISSIONS.md) then [`PLAYER.md`](PLAYER.md). Five commands. **Every member.** No role. Discord posts a Components V2 card. Web is the bank.

Chat cannot run CSS. `wh-cards.js` + `wormhole.gif`. Time is `⋮`. Bank link on every card. Delete in 3s unless `{ stay: true }`.

| Command | Also | Factory | Card | Who |
|---|---|---|---|---|
| `.£` | `.e` `/e` | `cards.pound` | Big pile. FIRE. Bank. | everyone |
| `.energy` | `.daily` | `cards.play` | One tap. Clock pays. | everyone |
| `.daily` | `.energy` | `cards.play` | Same handler as `.energy`. | everyone |
| `.shop` | `/shop` | `cards.shop` | Catalogue | everyone |
| `.receipt` | `.curtrs` | `cards.receipt` | Last 8 | everyone |

Drop `open-commands.js` and `access-gates.js` next to the economy module. Prefix: if `isOpenCommand(token)` skip **role** checks (channel still applies). Slash: `slashBuilders` — **never** `setDefaultMemberPermissions`. Re-PUT guild commands so old `.£` permission bits die.

```js
const { isOpenCommand, findOpen } = require('./open-commands');
const { allow } = require('./access-gates');
const { sendCard, cards } = require('./wh-cards');

if (!allow({ key: findOpen(token)?.key, channelSlug: channel.name, memberRoleSlugs })) return;
```

```js
const { isOpenCommand, findOpen } = require('./open-commands');
const { sendCard, cards } = require('./wh-cards');

// .£ / .e / /e
if (findOpen(token)?.key === 'pound') {
  await sendCard(message, cards.pound(member), { personal: true, gif: true });
}

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
