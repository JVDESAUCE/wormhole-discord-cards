# WORMHOLE — Discord Components V2 card system

**From:** grok · **Date:** 2026-09-19 · **Bot:** `jvde_5025` · **Guild tenant:** `wormhole`  
**Companion:** `wh-cards.js` · **Mocks:** `mocks/*.png`

This is the implementation spec. The PNGs are look-books. Discord will not reproduce the typefaces. It **will** reproduce: silver left bar, big WH figure, kicker, layer tag, GIF on identity cards, grey buttons, no emoji.

Copy in `wh-cards.js` is canonical. This file is the contract around it.

---

## 0. What Discord can and cannot do

| Wanted | How it actually ships |
|---|---|
| Animated balance | `wormhole.gif` as Section **thumbnail** (or MediaGallery on `.drop`). The **number is static markdown**. |
| Custom font / CSS card | Impossible. No CSS in chat. |
| Private `.$` | Prefix **cannot** be ephemeral. (a) public card, (b) public then delete after 20s, (c) slash `/balance` with `Ephemeral \| IsComponentsV2`. Do **(b) + (c)**. |
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

---

## 1. Tokens

```
accent     0xc9ccd4    identity / lists / node / proof / give
ok         0x7d9b86    credit, claim, buy, award, pick
warn       0xb9a27a    wait, sold out, needs role, already claimed, confirm
bad        0xb57a76    error, burn (.take), shop off, drop gone
```

Copy rules:

- Kicker, £ book: `-# 12⋮12am · .£` / `STREAK` / `CATCH`
- Kicker, WH book: `-# WORMHOLE · BALANCE` (Discord subtext). Always `WORMHOLE · <SLOT>`.
- Title: `##` heading.
- Amount, £ book: `# 0 £` (comma, unit **£**, unicode minus `−` on debits).
- Amount, WH book: `# 1,240 WH`.
- Meta: `-# LABEL` then value.
- Footer: `-#` one sentence rule. £ book names the table / no mint. WH book names till / two ledgers.
- Mentions: `<@id>` in body. NPC names in mocks (Drift, Echo, Ring, Kite, Nadir) are **census fiction** — use real Discord members.
- Never: emoji, ⚡ as money, “coin”, “wallet”, “cashout”, blurple, gold, purple, people photos.
- Time: player-facing is `12⋮12`, never a colon. `markTime()` in `wh-cards.js` converts.

GIF usage:


| media | Where | Cards |
|---|---|---|
| `thumb` | Section thumbnail | pound, streakOn, energy, balance, daily, daily-claimed, pick, node |
| `hero` | MediaGallery, 1 item | drop live |
| `proof` | MediaGallery of user file | proof |
| `none` | — | everything else |

Attach `wormhole.gif` **only** when media is `thumb` or `hero`.

---

## 2. Visibility

`personal` = prefix reply, delete after **20s**. Slash = ephemeral, do not delete.  
`public` = stays. Never delete play / L1 receipts — staff need to see the till claim.

See `CLAUDE.md` catalogue table. Factory: `sendCard(target, container, { personal, gif })`.

---

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

---

## 4. Per-card copy

Canonical strings live in `wh-cards.js`. Do not rewrite them. Notes:

**33 pound (`.£`)** — Big `0 £` until the table is set. STREAK is `{n} · iris {n}` (cap 12). XP is the score track. Footer: `Table not set. Streak is a picture. Catch does not mint £.` Alias `.e`.

**34 streakOn (`.daily` on the £ book)** — Amount stays `{pound} £` (0). Body `11 → 12. Rings compound. £ does not.` Do not credit £ or WH. The leftover WH `cards.daily` is the frozen `.$` book only.

**14 energy (`.energy`)** — Catch, not hours. Amount `×{mult}`. Always `£ 0`. XP from `number-bible.md`. Highest fit wins. Body time is `12⋮12 CREST`, never a colon.

**01 balance** — Frozen WH. Fields STREAK / TAG. Footer: `Hours do not mint. This is the frozen bot ledger.`

**02 daily** — WH leftover. Amount = existing `daily_amount` + streak bonus. Do not invent a formula. Public. Do not put this amount on a £ card.


**03 daily already** — Amount slot is the wait label (`14h 22m`), not WH.

**04 shop** — One line per SKU: `**{name}** — {price} WH · {L1\|L2} {exit} · {qty left\|∞}`. Disable buttons when qty 0 or missing role. Do not hide them.

Exit copy: `rooom_drink` → till · `store_discount` → 1212.is order · `dragon12` → slot · LINE books · `none` → role · no till.

**05 bought L1** — **public**. Body by kind: till / one-use code path / slot held. Footer: `Staff marks the till. This is not hours.`

**06 bought L2** — Grant the Discord role after debit. If grant fails, refund + error footer `WH returned.`

**07 inventory** — Empty: `Nothing owned.`

**08 leaderboard** — Top 10, bold caller. Do not scrape onto the lattice as people-profiles.

**09 drop live** — Hero GIF. Never print the password. Edit this message on close.

**10 pick** — Public. Amount = drop + first-pick bonus when that quest is on.

**11 pick gone** — Personal. Balance unchanged.

**12 give** — Public. Atomic. Self-give / n≤0 / missing / funds → error card.

**13 curtrs** — Last 8. `kind` stays `daily|react|invite|drop|pick|give|buy|award|welcome`. Unicode minus.

**14 energy** — Catch card on the £ book. Amount `×{mult}`. Fields SHAPE / XP / £. Always `£ 0`. Time printed with `⋮`. If someone later “optimises” this to a credit, that is a protocol break. Reject it.

**15 node** — Title-gated. Body is the node’s L1 line, or L2 line labelled as constructed. Never present L2 as physics.

**16 proof** — Gallery is the **user file**, not the GIF. Require an image. Missing → `Attach an image.`

**17 invite** — Personal to inviter. Omit COUNTED if you do not already track a weekly number. Do not invent one. No public “X invited Y” card.

**18 award / 19 take** — Staff only, public. Mint/burn is L2. Hours still do not mint.

**20 funds** — Reuse skeleton for self-give, bad amount, missing user, missing attachment. Change `##` title only. Footer `Nothing was charged.` unless it is a refund (`WH returned.`).

**28 welcome** — Once, when the member row is created. Amount = existing `WELCOME_WH`. GIF thumb. Do not re-grant.

**29 help** — Optional. Wire only if `.help` already exists. Do not add a command module without the operator.

**30 inventory empty** — Same factory as 07 with `items []`. Body is the sentence `Nothing owned.`

**31 refund** — Role grant failed after L2 debit. Reverse first, then this card. Footer `WH returned.`

**32 proof missing** — `.proof` with no image. Personal. Title `Attach an image.`

**05b / 05c** — Same `cards.boughtL1` as 05. Body map: `store_discount` → `One-use code path.` · `dragon12` → `Slot held. LINE still confirms.` Never print the discount code.

**21 shop off** — Admin toggle. No buttons.

**22 sold out** — Dragon12 footer: `LINE still books the real hour. This SKU only holds a Discord slot.`

**23 needs role** — Button already disabled on catalogue; this is the click-through.

**24 confirm L1** — Price ≥ 1000 only (Dragon12 in current seed). Nothing charged until confirm.

**25 drop closed** — Edit the live drop message in place (accent → silver, STATUS CLOSED). Then send card 10 as a new message.

**26 node gated** — No GIF. `Ask staff. Do not scrape.`

**27 drop expired** — `cards.pickGone({ expired: true })`. Do not change the refund rule, only the card.

---

## 5. Do not design

| Thing | Why |
|---|---|
| React card | Spam. Ledger only. |
| Whitelist / wallet / seed / connect | NFT leftover. Command stays off. |
| Animated digits | Discord cannot. GIF only. |
| Embeds + V2 | Illegal once the flag is set. |
| Blurple Primary buttons | Off-brand. |
| Emoji, ⚡-as-WH, coin emoji | ⚡ is the Shopify **energy** channel, L1 orders, not the coin. |
| Coins-per-hour on any card | Forced 0. |
| Public invite graph | Protocol: no people graphs on the lattice. |
| Second currency | One WH ledger. |
| CSS-in-image “fake cards” posted as PNG | Not accessible. V2 containers only. |

---

## 6. Mapping from Mongo / Pliexe

Do not rename Mongo collections in this pass. Map into the DTO:

```
member: { id, tag, displayName, balance, streak, lastDaily, inventory[] }
sku:    { id, name, price, qty|null, description, requiredRole, grantedRole, l1Kind }
tx:     { kind, amount, createdAt, info }
```

Player-facing unit **WH**. Internal field may still be `coins` / `balance`.

Shop L1 enum (fixed): `none | rooom_drink | store_discount | dragon12`.

Welcome grant on the **web** bank is 800 WH and is a preview. Do not mint 800 on Discord because the web did. If a `welcome` tx already exists in Mongo, show it in `.curtrs` only.

---

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

---

## 8. Acceptance

A card is done when:

1. It uses `ContainerBuilder` + `IsComponentsV2` and **zero** `content`/`embeds`.
2. Accent matches the table in `CLAUDE.md`.
3. Kicker is `WORMHOLE · SLOT`.
4. Amounts are `{n} WH` with comma and unicode minus.
5. Footer states the protocol line (mint / till / two ledgers / hours).
6. GIF only where the table says.
7. Buttons Secondary, `wh:` ids.
8. `.energy` shows **0 £**. Time is `12⋮12`, never a colon.
9. `.whitelist` still off, no card.
10. React still silent.

---

## 9. Questions for the operator (do not guess)

- Delete-after on personal prefix: 20s, or keep the old instant delete for `.$` only?
- Confirm step on all L1 SKUs, or only price ≥ 1000?
- Drop card: edit-in-place to CLOSED, yes?
- `/balance` this week, or prefix-only until slash is wired?
