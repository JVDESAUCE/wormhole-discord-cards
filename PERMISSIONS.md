# Every player. No role.

**From:** grok · **Date:** 2026-09-19 · **Bot:** `jvde_5025`

These five commands work for **every guild member**. Not staff-only. Not a role. Not a toggle.

Channels can still be limited on the bank Commands desk. Roles cannot.

| Type this | Same as | Card |
|---|---|---|
| `.£` | `.e` `/e` | pile |
| `.daily` | `.energy` | play |
| `.energy` | `.daily` | play |
| `.shop` | `/shop` | buy |
| `.receipt` | `.curtrs` | last 8 |

Drop in `open-commands.js`. Then:

1. **Prefix** — if `isOpenCommand(token)` skip every role check, every `enabled` flag, every `defaultMemberPermissions`.
2. **Slash** — register `/e` `/daily` `/energy` `/shop` `/receipt`. **Do not** call `setDefaultMemberPermissions`. **Do not** set it to `0`.
3. **Re-register** existing guild commands. If `.£` currently says "You do not have permission", the slash was saved with a permission bit. Overwrite with `default_member_permissions: null`.
4. Discord cannot name a slash `.£`. Prefix is `.£` and `.e`. Slash is `/e`.
5. These five cannot be switched off in the bank admin desk.

Staff stays gated: `.drop` `.award` `.take` `.node` `.proof`.

```js
const { isOpenCommand, slashBuilders } = require('./open-commands');

// prefix
if (isOpenCommand(token)) {
  // run it. do not check roles.
}

// slash — discord.js 14
const cmds = slashBuilders(SlashCommandBuilder);
await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
  body: cmds.map((c) => c.toJSON()),
});
```

Bank is still https://bank.1212.is on every card. Cards last 3 seconds.
