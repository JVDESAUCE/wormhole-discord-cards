# WORMHOLE — Discord Components V2 card system

**From:** grok · **Date:** 2026-09-18 · **Bot:** `jvde_5025` · **Guild tenant:** `wormhole`  
**Companion:** `wh-cards.js`

This is the implementation spec. Discord will not reproduce the typefaces. It **will** reproduce: silver left bar, big WH figure, kicker, layer tag, GIF on identity cards, grey buttons, no emoji.

Copy in `wh-cards.js` is canonical. This file is the contract around it.

## 0. What Discord can and cannot do

| Wanted | How it actually ships |
|---|---|
| Animated balance | `wormhole.gif` as Section **thumbnail** (or MediaGallery on `.drop`). The **number is static markdown**. |
| Custom font / CSS card | Impossible. No CSS in chat. |
| Private `.$` | Prefix **cannot** be ephemeral. Do public-then-delete after 20s, plus slash `/balance` ephemeral V2. |
| Blurple Mee6 embed | Do not. Accent is silver `#c9ccd4`. Buttons are **Secondary**. |

`IS_COMPONENTS_V2` = `1 << 15` = `32768`. Combined with ephemeral: `32832`.

**Limits:** 40 components/message (nested count), 4000 chars across all TextDisplays, 5 buttons/row, Section accessory is **one** Thumbnail **or** one Button, MediaGallery 1–10 images, GIF/WEBP ok, no video.

**Component types used**

| Type | Id | Role |
|---|---|---|
| Action Row | 1 | Shop / confirm buttons |
| Button | 2 | `wh:buy:<id>` `wh:confirm:<id>` `wh:cancel` |
| Section | 9 | Header + GIF thumbnail |
| Text Display | 10 | All copy (markdown) |
| Thumbnail | 11 | `attachment://wormhole.gif` |
| Media Gallery | 12 | Drop hero GIF, proof image |
| Separator | 14 | Hairline between meta and footer |
| Container | 17 | The card. `accent_color` = left bar |

## 1. Tokens

```
accent     0xc9ccd4    identity / lists / node / proof / give
ok         0x7d9b86    credit, claim, buy, award, pick
warn       0xb9a27a    wait, sold out, needs role, already claimed, confirm
bad        0xb57a76    error, burn (.take), shop off, drop gone
```

Copy rules:

- Kicker: `-# WORMHOLE · BALANCE` (Discord subtext). Always `WORMHOLE · <SLOT>`.
- Title: `##` heading.
- Amount: `# 1,240 WH` (comma, unit **WH**, unicode minus `−` on debits).
- Meta: `-# LABEL` then value.
- Footer: `-#` one sentence rule. L1/L2 / “does not mint” lives here.
- Mentions: `<@id>` in body. NPC names in mocks (Drift, Echo, Ring, Kite, Nadir) are **census fiction** — use real Discord members.
- Never: emoji, ⚡ as money, “coin”, “wallet”, “cashout”, blurple, gold, purple, people photos.

GIF usage:

| media | Where | Cards |
|---|---|---|
| `thumb` | Section thumbnail | balance, daily, daily-claimed, pick, energy, node, welcome |
| `hero` | MediaGallery, 1 item | drop live |
| `proof` | MediaGallery of user file | proof |
| `none` | — | everything else |

Attach `wormhole.gif` **only** when media is `thumb` or `hero`.

## 2. Visibility

`personal` = prefix reply, delete after **20s**. Slash = ephemeral, do not delete.  
`public` = stays. Never delete play / L1 receipts — staff need to see the till claim.

Factory: `sendCard(target, container, { personal, gif })`.

## 3. Factory contract

```js
build({
  accent,          // 0xc9ccd4 | 0x7d9b86 | 0xb9a27a | 0xb57a76
  kicker,          // 'WORMHOLE · BALANCE'
  title,           // 'Drift'
  amount,          // '1,240 WH' | '+62 WH' | '−400 WH' | null
  body,            // markdown or null
  fields,          // [{ label, value }]
  footer,          // one sentence
  media,           // 'thumb' | 'hero' | 'proof' | null
  proofUrl,        // attachment:// or cdn url
  buttons,         // [{ id, label, disabled? }]  max 5
})
```

Button `custom_id` namespace: `wh:<verb>:<payload>`.

| id | When |
|---|---|
| `wh:buy:<skuId>` | Shop catalogue |
| `wh:confirm:<skuId>` | L1 SKU price ≥ 1000 (Dragon12) |
| `wh:cancel` | Abort confirm |
| `wh:shop:page:<n>` | Only if catalogue > 5 |

Do **not** use Primary (blurple), Success (Discord green), Danger. Secondary only.

Shop buttons ship in **two ActionRows** (chunk of 3): row 1 = L1 exits (drink / 10% / Dragon12), row 2 = L2 roles (Wanderer / Ringbearer). Seed order is already L1 then L2. Max 5 SKUs without pagination.

## 4. Per-card copy

Canonical strings live in `wh-cards.js`. Do not rewrite them.

**01 balance** — Fields STREAK / TAG. Footer: `Hours do not mint. This is the bot ledger.`
**02 daily** — Amount = existing `daily_amount` + streak bonus. Do not invent a formula. Public.
**03 daily already** — Amount slot is the wait label (`14h 22m`), not WH.
**04 shop** — One line per SKU: `**{name}** — {price} WH · {L1|L2} {exit} · {qty left|∞}`. Disable buttons when qty 0 or missing role. Do not hide them.
**05 bought L1** — **public**. Body by kind: till / one-use code path / slot held. Footer: `Staff marks the till. This is not hours.`
**06 bought L2** — Grant the Discord role after debit. If grant fails, refund + error footer `WH returned.`
**07 inventory** — Empty: `Nothing owned.`
**08 leaderboard** — Top 10, bold caller. Do not scrape onto the lattice as people-profiles.
**09 drop live** — Hero GIF. Never print the password. Edit this message on close.
**10 pick** — Public. Amount = drop + first-pick bonus when that quest is on.
**11 pick gone** — Personal. Balance unchanged.
**12 give** — Public. Atomic. Self-give / n≤0 / missing / funds → error card.
**13 curtrs** — Last 8. `kind` stays `daily|react|invite|drop|pick|give|buy|award|welcome`. Unicode minus.
**14 energy** — `# 0 WH`. Fields include `MINTED 0 WH`. Footer names `coinsPerHour is 0`.
**15 node** — Title-gated. Body is the node’s L1 line, or L2 line labelled as constructed. Never present L2 as physics.
**16 proof** — Gallery is the **user file**, not the GIF. Require an image. Missing → `Attach an image.`
**17 invite** — Personal to inviter. Omit COUNTED if you do not already track a weekly number.
**18 award / 19 take** — Staff only, public. Mint/burn is L2. Hours still do not mint.
**20 funds** — Reuse skeleton. Footer `Nothing was charged.` unless refund (`WH returned.`).
**24 confirm L1** — Price ≥ 1000 only (Dragon12 in current seed).
**25 drop closed** — Edit the live drop message in place. Then send pick as a new message.
**28 welcome** — Once, when the member row is created. Amount = existing `WELCOME_WH`. Do not re-grant.
**29 help** — Optional. Wire only if `.help` already exists.

Exit copy: `rooom_drink` → till · `store_discount` → 1212.is order · `dragon12` → slot · LINE books · `none` → role · no till.

## 5. Do not design

React card, whitelist/wallet, animated digits, embeds+V2, blurple Primary, emoji, ⚡-as-WH, coins-per-hour, CSS-in-PNG fake cards.

## 6. Mapping from Mongo / Pliexe

```
member: { id, tag, displayName, balance, streak, lastDaily, inventory[] }
sku:    { id, name, price, qty|null, description, requiredRole, grantedRole, l1Kind }
tx:     { kind, amount, createdAt, info }
```

Player-facing unit **WH**. Shop L1 enum: `none | rooom_drink | store_discount | dragon12`.

Welcome grant on the web bank is 800 WH and is a preview. Do not mint 800 on Discord because the web did.

## 7. Slash commands to add (keep prefix)

| Slash | Default ephemeral | Notes |
|---|---|---|
| `/balance` | yes | Replaces the need to delete `.$` |
| `/daily` | no | Public flex |
| `/shop` | yes | Buttons work on ephemeral |
| `/inventory` | yes | |
| `/leaderboard` | no | |
| `/give` | no | |

Prefix remains `.` as now.

## 8. Acceptance

1. `ContainerBuilder` + `IsComponentsV2` and **zero** `content`/`embeds`.
2. Accent matches the table in `CLAUDE.md`.
3. Kicker is `WORMHOLE · SLOT`.
4. Amounts are `{n} WH` with comma and unicode minus.
5. Footer states the protocol line.
6. GIF only where the table says.
7. Buttons Secondary, `wh:` ids.
8. `.energy` shows **0 WH** minted.
9. `.whitelist` still off, no card.
10. React still silent.

## 9. Questions for the operator (do not guess)

- Delete-after on personal prefix: 20s, or keep the old instant delete for `.$` only?
- Confirm step on all L1 SKUs, or only price ≥ 1000?
- Drop card: edit-in-place to CLOSED, yes?
- `/balance` this week, or prefix-only until slash is wired?
