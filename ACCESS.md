# Channels and roles

**From:** grok · **Date:** 2026-09-19 · **Bot:** `jvde_5025`

The bank admin desk now ships two matrices. Discord must honour them.

## Open commands — no role, ever

`.£` `.daily` `.energy` `.shop` `.receipt`

`isOpenCommand` still skips every role check. **Channels can still be off.** If `#shop` is off for `.energy`, the bot ignores `.energy` in that channel.

## Special commands — need a granted role

`.drop` `.award` `.take` `.node` `.proof` and the extras (`.pick` `.give` `.inventory` `.leaderboard`).

A member needs **one granted role** AND the channel must be on.

## Default seed

| Channel | Commands on |
|---|---|
| #play | .£ .daily .energy .receipt |
| #shop | .shop .inventory .receipt |
| #drops | .pick .drop |
| #general | .£ .give .leaderboard .receipt |
| #staff | .drop .award .take .node .proof |
| #lattice | .node .proof |

| Role | Commands |
|---|---|
| Staff | .drop .award .take |
| Lattice | .node .proof |
| @everyone | pick, give, inventory, leaderboard — not the open five (those are already everyone) |

Admin can add a channel or a role and toggle cells. Each toggle queues a Discord sync. Read the `command_channels` / `command_roles` rows the web desk writes, or copy the same shape into Mongo.

```js
function allow({ key, channelId, memberRoleIds, channels, roles }) {
  if (!channelOn(key, channelId, channels)) return false;
  if (isOpenCommand(key)) return true;
  return roleOn(key, memberRoleIds, roles);
}
```
