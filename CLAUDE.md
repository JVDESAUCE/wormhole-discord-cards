# WORMHOLE Discord cards — implement this

**From:** grok (App Builder) · **Date:** 2026-09-18 · **For:** Claude on droplet bot `jvde_5025`

Paste this folder next to the economy / lattice modules. Read `discord-cards-spec.md`. Drop `wh-cards.js` in. Ship `assets/wormhole.gif` (same file as bank.1212.is).

Mocks in `mocks/` are **visual intent** of Discord Components V2 — left accent bar, kicker, big WH number, grey Secondary buttons, optional GIF. Discord will not reproduce Syne. Do chase the copy and the accent.

## What you are replacing

Current player replies that post a line of text and delete it. Start with `.$`. Same factory for every card below.

## Hard rules (do not “improve” these away)

1. Unit is **WH**. Not ⚡, not coins in player-facing copy.
2. **`coinsPerHour` stays 0.** `.energy` logs hours and **must show `0 WH`**.
3. **Two ledgers.** Lattice board (hours) ≠ bot (WH). `.curtrs` is the bot ledger only.
4. **L1 vs L2.** Drink / 1212.is code / Dragon12 slot = L1. Roles = L2. Tag every shop / buy card.
5. **No wallets, no whitelist card, no seed phrases.** `.whitelist` stays off.
6. **No react card.** Reacts credit the ledger silently.
7. **No people-profiles** beyond Discord mention + public display name + WH.
8. **Wu Wel (@12wuwelbegood) is not 小偉.** Do not merge.
9. Buttons: `ButtonStyle.Secondary` only. No blurple, no emoji on labels.
10. GIF animates. Digits do not.
11. Do not print a 1212.is discount code, a drop password, or a wallet.

## Stack

- discord.js **14.16+** (`ContainerBuilder`, `MessageFlags.IsComponentsV2`).
- Flag: `1 << 15` = `32768`. Ephemeral combo: `32768 | 64` = `32832`.
- Once V2 is set: **no `content`, no `embeds`.**
- Prefix cannot be ephemeral. Personal prefix → delete bot reply after **20s**. Slash `/balance` is the stay-visible private card.
- Attach `wormhole.gif` as `attachment://wormhole.gif` only on cards whose spec says `thumb` or `hero`. Do not hotlink.

## First diffs

1. Upgrade discord.js if `ContainerBuilder` is missing.
2. Add `wh-cards.js`. Map Mongo member → DTO in the file header.
3. Swap these to `sendCard(...)`:

`.$` `.daily` `.shop` `.buy` `.inventory` `.leaderboard` `.curtrs` `.drop` `.pick` `.give` `.award` `.take` `.energy` `.node` `.proof`

4. Add slash `/balance` (ephemeral V2). Keep prefix `.`
5. Wire shop buttons `wh:buy:<id>` and L1 confirm `wh:confirm:<id>` for price ≥ 1000. Shop buttons ship as two rows (chunk of 3): L1 exits, then L2 roles.
6. Optional: `.help` / `/help` using `cards.help` only if a help command already exists.
7. Send `cards.welcome` once when the member row is created (amount = existing WELCOME_WH).
8. Leave `.react` and `.whitelist` alone.

## Catalogue (mocks match)

| # | Command | Factory | Visibility | Accent | GIF |
|---|---|---|---|---|---|
| 01 | `.$` `/balance` | `cards.balance` | personal | accent | thumb |
| 28 | first join | `cards.welcome` | personal | ok | thumb |
| 29 | `.help` `/help` | `cards.help` | personal | accent | none |
| 02 | `.daily` | `cards.daily` | public | ok | thumb |
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
| 14 | `.energy` | `cards.energy` | public | accent | thumb |
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
2. Accent matches the table.
3. Kicker is `WORMHOLE · SLOT`.
4. Amounts are `{n} WH` with comma and unicode minus `−`.
5. Footer states the protocol line (mint / till / two ledgers / hours).
6. GIF only where the table says.
7. Buttons Secondary, `wh:` ids.
8. `.energy` shows **0 WH** minted.
9. `.whitelist` still off, no card.
10. React still silent.
11. Welcome grant fires once. Help is optional.
12. L1 buy receipts are public. Personal prefix cards delete after 20s.
