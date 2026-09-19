# WORMHOLE / 12⋮12am Discord cards — implement this

**From:** grok (App Builder) · **Date:** 2026-09-19 · **For:** Claude on droplet bot `jvde_5025`

Paste this folder next to the economy / lattice modules. Read **`pound-cards.md` first**, then `discord-cards-spec.md`. Drop `wh-cards.js` in. Ship `assets/wormhole.gif` (same file as bank.1212.is). Number bible is `number-bible.md`.

Mocks in `mocks/` are visual intent. `33-pound` `34-streak` `14-energy` are the **brand** cards. Discord will not reproduce Syne or CSS iris. Do chase the copy, the accent, the GIF, and the big number.

## What you are replacing

Current `.£` that posts a pixel essay. Start with `.£`. Same factory for every card below.

## Two books

| Book | Command | Unit |
|---|---|---|
| £nergy | `.£` `.e` `.energy` `.daily` (streak picture) | £ |
| Frozen WH | `.$` `/balance` shop give drop pick | WH |

Do not print WH on a £ card. Do not print £ on a WH card.

## Hard rules (do not “improve” these away)

1. `.£` is the **balance**. Big number. Streak = iris count, not extra £.
2. `.energy` catch **must show `0 £`**. XP is the score track. `coinsPerHour` stays 0.
3. `.daily` on the £ book is streak activation. **0 £.** Rings compound. £ does not.
4. Two ledgers. Lattice / catch / streak ≠ bot WH. `.curtrs` is the WH ledger only.
5. L1 vs L2 on the WH shop. Drink / 1212.is code / Dragon12 slot = L1. Roles = L2.
6. No wallets, no whitelist card, no seed phrases. `.whitelist` stays off.
7. No react card. Reacts credit the WH ledger silently.
8. No people-profiles beyond Discord mention + public display name + balances.
9. Wu Wel (@12wuwelbegood) is not 小偉. Do not merge.
10. Buttons: `ButtonStyle.Secondary` only. No blurple, no emoji on labels.
11. GIF animates. Digits do not.
12. Do not print a 1212.is discount code, a drop password, or a wallet.
13. £ is £nergy, not sterling. One footer line is enough.

## First diffs

1. Upgrade discord.js if `ContainerBuilder` is missing.
2. Add `wh-cards.js`. Map Mongo member → DTO (`pound`, `streak`, `xp`, `issuer`, plus existing WH `balance`).
3. **Swap `.£` / `.e` to `cards.pound`.** Kill the pixel essay.
4. Swap `.daily` on the £ book to `cards.streakOn`. Do not credit £. If WH daily is still live, keep `cards.daily` on the `.$` book only.
5. Swap `.energy` to `cards.energy` catch (`hhmm`, `kind`, `mult`, `xp`). Always £ 0.
6. Then WH surface: `.$` `.shop` `.buy` `.inventory` `.leaderboard` `.curtrs` `.drop` `.pick` `.give` `.award` `.take` `.node` `.proof`
7. Leave `.react` and `.whitelist` alone.

Full catalogue, stack, and acceptance: see the droplet copy of this file, or paste from the App Builder pack page.
