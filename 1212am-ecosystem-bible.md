# 12⋮12am ecosystem bible

**Status:** proposed lock — operator confirms
**Updated:** 2026-09-19
**Updated by:** grok
**Role:** only source of truth for command centre, bank, Discord, missions, and every agent pass.

If a protocol draft, a bank screen, a Discord card, Shopify copy, WIR, a time bank, an RPG skin, a justification thread, or any other model disagrees with this file, **this file wins**. The operator amends the bible. Agents do not silently overwrite it. Borrowed words are moulds. They are not source.

Empty in §16 means not measured. Agents do not fill it.

---

## 0. Source

The **source** is the native event a node can see. That is the only source.

A **pixel** is one written row of that event:
`node · kind · native units · grade · time · optional function tags`

**Function** is what the act does (feeling in a channel, body in a room, craft in a room, stock leaving a shelf, a tagged order, hours of labour). Not what we say it means.

**Narrative** is why it mattered, who it was for, whether it was fair, whether it felt like 12⋮12. Narrative may sit in a note. Narrative has **weight 0**. Justification does not approve a pixel. Standing + visibility + the published table do.

No bias by familiar name, vibe, complementary story, or plot. Channels (sound, visual, smell) are **function tags**, not multipliers.

Unseen is not “zero.” It is **unrowed**.

---

## 1. Two commands, two books

| Command | Book | Words allowed | Never call it |
|---|---|---|---|
| **`.£`** | Energy book | **energy** · **£nergy** · **£** · **XP** (score line only) | gold, coin, cash, fiat, WH |
| **`.$`** | Traditional book | **fiat** · **traditional** · **WH** (frozen line only) | energy, £nergy, £, XP |

`.£` is the energy book.
`.$` is the traditional book.

They meet at a physical till when a thing is priced in both. They do not convert into each other.

### Collision — do not blur

- Frozen **WH** lives under `.$`. WH is not TWD and not GBP.
- Fiat is TWD, GBP, cash, card, and crypto-used-as-payment.
- If `.$` is the whole traditional book, it shows **two lines**: WH (frozen) and fiat (display only). Never one number.
- The bot never holds or moves fiat.

---

## 2. Layer lock

**L1** — hours, cash, stock, rooms, bodies, a plate, a jacket, a session, feeling that occurred.
**L2** — brand, story, tier, ability label, XP as a score, £ as an IOU.

Never record L2 as physics.
Never call £ “energy.” Energy is the act. £ is the IOU.
Never call XP “energy” or “£.” XP is the score counted from the log.

---

## 3. Three facts on every pixel

| Line | What it is | Spends? |
|---|---|---|
| **Log** | Native source — what happened | no |
| **XP** | L2 score counted from the log | **no** |
| **£** | L2 IOU, stamped by the issuing node | **yes**, at a physical till that accepts that stamp |

Same pixel. Two children (XP and £). Never summed.
XP never becomes £. £ never becomes XP.

---

## 4. Energy, ability, £

**Energy** — what happened, written when a node can see it.
**Ability** — public craft on a player sheet (sound, visual, smell, door, kitchen). A label. Not a currency. Never issues £.
**£** — IOU a node writes from its **node limit**, at its published rate, against written energy it can honour.

£ is never printed. A node goes negative by the same £ it issues. It clears when £ is spent there and something real leaves the shelf.
- No central mint. Operator cannot type £ into an account.
- Players cannot go below zero. Only nodes carry obligation.
- No welcome £. No WH → £.
- £ never replaces wages.

Supply of £ = sum of node obligations.

---

## 5. Measure is not issue

Written energy may add XP per the table.
Written energy may issue £ only if the node limit allows.
At the limit: log and XP still write; £ = 0; reason = limit.

**Written when visible**

- Shift / task / session at a physical node (witnessed or machine)
- QR visit in a room
- Tagged paid order at the store
- Staff `.issue` (standing + that node’s limit)
- Documented file — pending until approved; 0 £ until approved
- Wormhole feeling — micro, daily cap, diminishing; tally after cap, no dead rows

**Never written**

- Thoughts
- Private chat, other apps, street gossip, family tables
- Follower graphs, mutuals, who is behind an account

---

## 6. The loop (player copy)

You do a thing in a place we can see.
We write the pixel under `.£`.
XP may rise from the table.
If that place can honour it, it issues £ and goes into debt.
You spend £. Something leaves the shelf. The debt shrinks.

When the **node limit** is full: we still write the work. We pay 0 £ until people spend there.
Do not raise the limit because the gap looks bad. That is the old WH printer.
Limit rises only with real clearing or real new capacity, operator, 7 days’ notice.

90 days uncleared: node **frozen**. It can accept £. It cannot issue.

---

## 7. The wall

Fiat pays what is not a node: landlord, power, tax, wholesale, employed wages, strangers.

**£ never pays the wall.**
No cash-out. No node holds a TWD or GBP reserve. No `1 £ = N TWD`.
Crypto-as-payment is a pipe into a real SKU at a physical node. Not a third book. Not a mint.

Fiat shrinks only two ways, measured monthly, no date:

1. Share of inside exchange that settled in £ rather than fiat.
2. Fiat no longer sent over the wall because a member node now makes the thing (import substitution, L1).

At a physical node, energy **meets** fiat. It does not convert into fiat.
Do not write: TWD ends · absorb fiat · energy converts to fiat · flywheel that does not leak.
Write: **less leak**, measured.

---

## 8. Two tills, no booth

A SKU at a physical node may be: fiat-only · dual · £-preferred · £-only.
Change per SKU, per node, 7 days’ notice.

Fiat buys the shelf. £ is the promise. They meet at the till. They do not trade.
`.give` moves £ between players (zero-sum, XP 0). Not exchange for fiat.
Wormhole has no till. Feeling never rings fiat.

---

## 9. Fuse (micro → macro)

Fuse means **one book** and **one night**. Not one number.

| Scale | Function | XP | £ | Fiat |
|---|---|---|---|---|
| Micro | Wormhole feeling | table (tiny or 0) | table (tiny or 0), Wormhole stamp | never |
| Meso | visit / presence in a physical room | table | table if that node pays visits | only if cash also rings |
| Macro | session, shift, Dragon12 hour, tagged order | packet that can move tier | from that node’s limit | meets at that till |
| Night | sound + visual + smell in one room | **one** session packet | **one** £ issue if paid | the room’s till |
| Map | several physical nodes | XP travels with the player | £ travels only under option C | wall + physical tills |

Complementary ability fuses in the room. It does not multiply the pixel.

---

## 10. Cross-node £ (operator chooses)

| Option | Meaning |
|---|---|
| **A** | £ spends only at the issuing physical node |
| **B** | any £ spends at any physical node; core backstops default up to a published cap |
| **C** | like B, stamp stays; while issuer is frozen its £ spends only there |

If C: `.£` shows £ by node. Without that, C is a slogan.
Wormhole £ has no fiat path under any option.
Build waits on this choice and on the measurement table.

---

## 11. Tier (L2 policy)

TEAM 1212: SURVIVOR / OWN IDENTITY / SUPER POWER.

- SURVIVOR — streak, any written energy.
- OWN IDENTITY — first macro energy at witnessed or machine at a **physical** node. Opens L1 exits as policy, not physics.
- SUPER POWER — macro energy at ≥ 2 physical nodes in 90 days, and brought someone to OWN IDENTITY.

Tier reads XP from macro + witnessed/machine at physical nodes.
Wormhole feeling cannot climb OWN IDENTITY or SUPER POWER unless the operator explicitly changes this table.
£ balance does not decay. Tier score does.

---

## 12. Named nodes

A node is an **energy harvester**.

### Physical — energy meets fiat in the same room

| Node | Kind | Place |
|---|---|---|
| **12⋮12am store** | shop | 1212.is / physical retail |
| **Dragon12** | session / hour | named practice |
| **Golden Dragon** | place / hospitality | Bromsgrove, UK |

Harvest: labour, presence, stock, paid order, session.
Fiat till: yes.
£ from that node’s limit.
Same shelf can ring fiat and/or £.

### Non-physical — feeling, no fiat path

| Node | Kind | Place |
|---|---|---|
| **Wormhole** | Discord | global, no room |

Harvest: feeling (reacts, messages, channel presence).
Fiat till: no.
Tiny £ from Wormhole’s limit only. Never TWD or GBP.

A player is not a node unless added here. A stand-in in a story is not a node.
A player may carry **ability** labels and XP. Their harvest lands at the node that can see it.

---

## 13. Echoes and live-and-eat

Public mark, no delivery → library `kind: echo` (url, mark, date). No hunt. No £.
Public mark and a delivered outcome → invite as node or player. They keep their name unless they take the crest.
Do not write “acquire all identical energy.”
Selling the mark is an operator legal task. No unmask. No scrape.

£ cannot pay a landlord who is not a node.
£ can pay a plate or a bed only if that kitchen or room is named in §12.

---

## 14. Surfaces

**Bank first screen:** §6 loop. Then log · XP · £ by issuer. No conversion table.
**Command centre:** limits, freezes, gaps, paths, echoes, two monthly leak rates. Aggregates only. No people-profiles.
**Discord:** `.$` traditional book · `.£` / `.e` energy book. Footer: `issued by <node> · energy logged <n>`. WH cards stay on `.$`. £ cards are a second set.
**UK:** Golden Dragon carries *£ here is £nergy, not pounds.*

---

## 15. Words

**Allowed:** energy · £nergy · £ · XP (score only) · fiat · traditional · WH · node · physical node · Wormhole · node limit · stamp / issuer · till · wall · harvest · feeling · ability · pixel · source · function · meets fiat · no fiat path · echo · invite · standing · frozen · session

**Banned:** gold · mana · jar · quest · GM · loot · coin (for £) · wallet · cashout · absorb fiat · TWD ends · acquire all energy · thought-row · gossip-row · convert £ to fiat · Discord cash-out · energy converts to fiat · XP as a word for energy or for £ · narrative as approval

---

## 16. Operator still enters

1. A, B or C.
2. Measurement table (visit, order, session, feeling cap, XP packets).
3. Each node’s limit and £ rates; L1 prices in £ and/or fiat.
4. Wormhole limit and rates (feeling stays a tip).
5. Whether feeling grants XP at all.
6. Documented review window.
7. Tier thresholds.
8. Witness standing per node.
9. WH snapshot date.
10. First dual SKU at a physical node.
11. Crest list for echoes.
12. First three missions.
13. `.$` = WH only, or WH + fiat line.
14. Any further node for §12.
15. Ability list beyond sound / visual / smell / door / kitchen.

Agents do not fill these.

---

## 17. Acceptance

1. Copy uses only §1 and §15 words.
2. `.£` never shows fiat or WH as spendable energy.
3. `.$` never shows £ as cash.
4. XP and £ never summed.
5. Narrative notes have weight 0.
6. No booth, no cash-out, no WH → £, no welcome £.
7. Feeling cannot set OWN IDENTITY unless §16 says so.
8. Default examples: store / Dragon12 / Golden Dragon / Wormhole.
9. §16 stays empty until the operator types numbers.

---

## 18. Questions for the operator

- A, B or C?
- Feeling: XP yes/no, £ yes/no — two ticks.
- Session: one XP packet per night, or per hour?
- First dual SKU: store line, Dragon12 hour, or Golden Dragon plate?
- `.$` = WH only, or WH + fiat line?
- Any other physical node for §12?
