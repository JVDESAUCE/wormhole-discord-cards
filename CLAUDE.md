# WORMHOLE / 12⋮12am Discord cards — implement this

**From:** grok (App Builder) · **Date:** 2026-09-19 · **For:** Claude on droplet bot `jvde_5025`

Paste this **whole folder**. Start with **`PLAYER.md`** — five commands. Then `pound-cards.md`. Graphics in `mocks/` and `assets/`. Open **`theme.html`**. Web uses `theme.css`. Discord uses `wh-cards.js` + `wormhole.gif`.

Paste this folder next to the economy / lattice modules. Read **`pound-cards.md` first**, then `discord-cards-spec.md`. Drop `wh-cards.js` in. Ship `assets/wormhole.gif` (same file as bank.1212.is). Number bible is `number-bible.md`.

Mocks in `mocks/` are visual intent. `33-pound` `34-streak` `14-energy` are the **brand** cards. Discord will not reproduce Syne or CSS iris. Do chase the copy, the accent, the GIF, and the big number.

## What you are replacing

Current `.£` that posts a pixel essay. Start with `.£`. Same factory for every card below.

## Two books

| Book | Command | Unit |
|---|---|---|
| £nergy | `.£` `.e` `.energy` `.daily` | £ |
| Frozen WH | `.$` `/balance` shop give drop pick | WH |

Do not print WH on a £ card. Do not print £ on a WH card.

## Hard rules (do not “improve” these away)

1. `.£` is the **pile**. Big number. Fire = iris count. Not extra £ by itself.
2. `.energy` and `.daily` are the **same play**. One tap. No Claim button. `coinsPerHour` stays 0.
3. First tap of the day pays. Later tap only if the clock is better (top-up).
4. Clock: 12⋮12 = 12 £ (jackpot). 12⋮21 · 21⋮12 · 21⋮21 · 06⋮39 · 09⋮36 = 2 £ (cool). Else 1 £. `09⋮63` is not a clock.
5. Fire +1 £ treat at 3 · 6 · 9 · 12. Not multiplied. Skip a day, fire dies.
6. Two ledgers. `.curtrs` is the WH ledger only.
7. L1 vs L2 on the WH shop. Drink / 1212.is code / Dragon12 slot = L1. Roles = L2.
8. No wallets, no whitelist card, no seed phrases. `.whitelist` stays off.
9. No react card. Reacts credit the WH ledger silently.
10. No people-profiles beyond Discord mention + public display name + balances.
11. Wu Wel (@12wuwelbegood) is not 小偉. Do not merge.
12. Buttons: `ButtonStyle.Secondary` only, except Bank which is **Link** to `https://bank.1212.is`.
13. GIF animates. Digits do not.
14. Do not print a 1212.is discount code, a drop password, or a wallet.
15. £ is £nergy, not sterling. One footer line is enough.
16. Player-facing time is `12⋮12`, never `12:12`. `markTime()` converts.
17. Command cards last **3 seconds**. `sendCard` deletes unless `{ stay: true }`. Stay for live drop and L1 till receipts.
18. Player copy: Fire, Treat, Jackpot, Cool. Never XP, pair, claim, iris, gold, mana. `.energy` = `.daily`.

## Stack

- discord.js **14.16+** (`ContainerBuilder`, `MessageFlags.IsComponentsV2`).
- Flag: `1 << 15` = `32768`. Ephemeral combo: `32768 | 64` = `32832`.
- Once V2 is set: **no `content`, no `embeds`.**
- Prefix cannot be ephemeral. Personal prefix → delete bot reply after **3s**. Slash `/balance` is the stay-visible private WH card. Optional `/e` for `.£`.
- Attach `wormhole.gif` as `attachment://wormhole.gif` only on cards whose spec says `thumb` or `hero`. Do not hotlink.

## First diffs

1. Upgrade discord.js if `ContainerBuilder` is missing.
2. Add `wh-cards.js`. Map Mongo member → DTO (`pound`, `streak`, `issuer`, plus existing WH `balance`).
3. **Swap `.£` / `.e` to `cards.pound`.** Kill the pixel essay. Bank link is automatic.
4. **`.energy` and `.daily` both call `cards.play`.** Same DTO. No wait card. No Claim button.
5. Time is `12⋮12`. Jackpot uses `jackpot: true` or `kind: 'crest'`.
6. Then WH surface: `.$` `.shop` `.buy` `.inventory` `.leaderboard` `.curtrs` `.drop` `.pick` `.give` `.award` `.take` `.node` `.proof`
7. Add slash `/balance` (ephemeral V2). Keep prefix `.`
8. Wire shop buttons `wh:buy:<id>` and L1 confirm `wh:confirm:<id>` for price ≥ 1000.
9. Optional: `.help` / `/help` using `cards.help`.
10. Leave `.react` and `.whitelist` alone.

## Catalogue (mocks match)

£ book first:

| # | Command | Factory | Visibility | Accent | GIF |
|---|---|---|---|---|---|
| 33 | `.£` `.e` | `cards.pound` | personal | accent | thumb |
| 34 | `.daily` | `cards.play` | public | ok | thumb |
| 14 | `.energy` | `cards.play` | public | accent | thumb |

WH book (frozen ledger):

| # | Command | Factory | Visibility | Accent | GIF |
|---|---|---|---|---|---|
| 01 | `.$` `/balance` | `cards.balance` | personal | accent | thumb |
| 28 | first join | `cards.welcome` | personal | ok | thumb |
| 29 | `.help` `/help` | `cards.help` | personal | accent | none |
| 02 | `.daily` (WH leftover) | `cards.daily` | public | ok | thumb |
| 03 | `.daily` already | `cards.dailyClaimed` | personal | warn | thumb |
| 17 | invite counted | `cards.invite` | personal to inviter | accent | none |
| 04 | `.shop` | `cards.shop` | personal | accent | none |
| 24 | confirm L1 ≥1000 | `cards.confirmL1` | personal | warn | none |
| 05 | buy L1 drink | `cards.boughtL1` | **public** | ok | none |
| 05b | buy L1 1212.is | `cards.boughtL1` | **public** | ok | none |
| 05c | buy L1 Dragon12 | `cards.boughtL1` | **public** | ok | none |
| 06 | buy L2 | `cards.boughtL2` | public | ok | none |
| 07 | `.inventory` | `cards.inventory` | personal | accent | none |
| 30 | `.inventory` empty | `cards.inventory` | personal | accent | none |
| 21 | shop off | `cards.shopOff` | personal | bad | none |
| 22 | sold out | `cards.soldOut` | personal | warn | none |
| 23 | needs role | `cards.needsRole` | personal | warn | none |
| 09 | `.drop` live | `cards.dropLive` | public, edit closed | ok | **hero** |
| 25 | drop closed | `cards.dropClosed` | public (edit) | accent | none |
| 10 | `.pick` win | `cards.pick` | public | ok | thumb |
| 11 | `.pick` gone | `cards.pickGone` | personal | bad | none |
| 27 | drop expired | `cards.pickGone({expired:true})` | personal | bad | none |
| 12 | `.give` | `cards.give` | public | accent | none |
| 08 | `.leaderboard` | `cards.leaderboard` | public | accent | none |
| 13 | `.curtrs` | `cards.curtrs` | personal | accent | none |
| 15 | `.node` | `cards.node` | public | accent | thumb |
| 26 | node gated | `cards.nodeGated` | personal | warn | none |
| 16 | `.proof` | `cards.proof` | public | accent | proof file |
| 32 | `.proof` no image | `cards.needImage` | personal | bad | none |
| 18 | `.award` | `cards.award` | public | ok | none |
| 19 | `.take` | `cards.take` | public | bad | none |
| 20 | not enough WH | `cards.errorFunds` | personal | bad | none |
| 31 | role grant fail | `cards.refund` | personal | warn | none |

Do **not** design: react, whitelist, animated digits, blurple Primary, emoji, ⚡-as-WH, coins-per-hour, CSS-in-PNG fake cards.

## Acceptance

1. `ContainerBuilder` + `IsComponentsV2` and **zero** `content`/`embeds`.
2. `.£` is a **big £ number**, not an essay. FIRE field is the streak days.
3. `.energy` and `.daily` both call `cards.play`. One tap pays.
4. Later tap the same day only tops up if the clock is better. No Claim button.
5. `.$` still prints WH. Never on a £ card.
6. Kicker: £ book `12⋮12am`. WH book `WORMHOLE · SLOT`.
7. GIF only where the table says. Digits static.
8. Buttons Secondary, `wh:` ids. Bank is Link to https://bank.1212.is on **every** card.
9. `.whitelist` still off, no card.
10. React still silent.
11. Command cards delete after **3s**. Live drop and L1 receipts `{ stay: true }`.
12. L1 buy receipts are public and stay.
13. Catch time prints `12⋮12`, never `12:12`.
14. Player copy uses Fire / Treat / Jackpot / Cool. Not XP, pair, claim.
