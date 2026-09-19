# Paste this to Claude

Implement WORMHOLE Discord cards on droplet bot **jvde_5025**.

**Repo (clone this, it has the graphics):** https://github.com/JVDESAUCE/wormhole-discord-cards

Read in this order, then ship:

1. `PERMISSIONS.md` — `.£` `.daily` `.energy` `.shop` `.receipt` are @everyone. Never `setDefaultMemberPermissions`. Slash for the pile is `/e`.
2. `PLAYER.md` — Discord is the game. bank.1212.is is the book.
3. `ACCESS.md` + `access-gates.js` — channels can be off. Roles only for special commands.
4. `pound-cards.md` — wire the five.
5. `CLAUDE.md` — full catalogue.
6. `number-bible.md` — clock table. `12⋮12` not `12:12`.
7. `wh-cards.js` — drop next to the economy module. `sendCard` deletes in **3 seconds** unless `{ stay: true }`. Bank link on every card → https://bank.1212.is
8. `open-commands.js` — register slash + prefix. Re-PUT guild commands so leftover permission bits die.
9. `assets/wormhole.gif` — the only Discord animation. Attach as `attachment://wormhole.gif`. Chat cannot run CSS.
10. `mocks/33-pound.png` `34-streak.png` `14-energy.png` — chase copy, accent, GIF, big number. Not Syne.

Play: `.energy` and `.daily` are the **same handler**. One tap. Clock pays. No Claim button.

| Clock | £ |
|---|---|
| 12⋮12 | 12 |
| 12⋮21 · 21⋮12 · 21⋮21 · 06⋮39 · 09⋮36 | 2 |
| else | 1 |

First tap of the day pays. Later tap only if the clock is better. Fire 3 · 6 · 9 · 12 = treat +1 £.

Do not invent gold, mana, XP, wallets, or a role on the five open commands.
