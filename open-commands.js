'use strict';

/**
 * Open player commands for jvde_5025.
 * From: grok · 2026-09-19
 *
 * .£ .daily .energy .shop .receipt
 * Every guild member. No Discord role. No defaultMemberPermissions.
 *
 *   const { isOpenCommand, findOpen, slashBuilders, OPEN_COMMANDS } = require('./open-commands');
 *
 * Prefix: if (isOpenCommand(token)) skip role + enabled checks.
 * Slash:  register with slashBuilders(SlashCommandBuilder) and PUT the guild commands.
 * Never call setDefaultMemberPermissions on these.
 */

const OPEN_COMMANDS = [
  {
    key: 'pound',
    prefix: ['.£', '.e'],
    slash: ['e', 'pound'],
    factory: 'cards.pound',
    personal: true,
    description: 'Your £ pile',
  },
  {
    key: 'daily',
    prefix: ['.daily'],
    slash: ['daily'],
    factory: 'cards.play',
    aliasOf: 'energy',
    description: 'Play today',
  },
  {
    key: 'energy',
    prefix: ['.energy'],
    slash: ['energy'],
    factory: 'cards.play',
    aliasOf: 'daily',
    description: 'Play today',
  },
  {
    key: 'shop',
    prefix: ['.shop'],
    slash: ['shop'],
    factory: 'cards.shop',
    personal: true,
    description: 'Buy',
  },
  {
    key: 'receipt',
    prefix: ['.receipt', '.curtrs'],
    slash: ['receipt'],
    factory: 'cards.receipt',
    personal: true,
    description: 'Last 8 receipts',
  },
];

const OPEN_KEYS = new Set(
  OPEN_COMMANDS.flatMap((c) => [
    c.key,
    ...c.prefix.map((p) => p.replace(/^\./, '').toLowerCase()),
    ...c.slash,
    ...c.prefix,
  ]),
);

function firstToken(raw) {
  return String(raw || '').trim().split(/\s+/)[0];
}

function findOpen(token) {
  const t = firstToken(token);
  const lower = t.toLowerCase();
  return (
    OPEN_COMMANDS.find(
      (c) =>
        c.key === lower ||
        c.prefix.some((p) => p === t || p.toLowerCase() === lower) ||
        c.slash.some((s) => s === lower || `/${s}` === lower),
    ) || null
  );
}

function isOpenCommand(tokenOrKey) {
  const raw = String(tokenOrKey || '').trim();
  if (!raw) return false;
  if (OPEN_KEYS.has(raw) || OPEN_KEYS.has(raw.toLowerCase())) return true;
  const stripped = raw.replace(/^\//, '').replace(/^\./, '');
  if (OPEN_KEYS.has(stripped) || OPEN_KEYS.has(stripped.toLowerCase())) return true;
  if (stripped === '£' || stripped === 'pound' || stripped === 'e') return true;
  if (stripped.toLowerCase() === 'curtrs') return true;
  return Boolean(findOpen(raw));
}

/**
 * @param {typeof import('discord.js').SlashCommandBuilder} SlashCommandBuilder
 * @returns {import('discord.js').SlashCommandBuilder[]}
 */
function slashBuilders(SlashCommandBuilder) {
  const seen = new Set();
  const out = [];
  for (const c of OPEN_COMMANDS) {
    for (const name of c.slash) {
      if (seen.has(name)) continue;
      seen.add(name);
      const builder = new SlashCommandBuilder().setName(name).setDescription(c.description);
      // DO NOT call setDefaultMemberPermissions.
      // Omitting it = @everyone.
      out.push(builder);
    }
  }
  return out;
}

function toRestBody(builders) {
  return builders.map((b) => {
    const json = typeof b.toJSON === 'function' ? b.toJSON() : b;
    return {
      ...json,
      default_member_permissions: null,
    };
  });
}

module.exports = {
  OPEN_COMMANDS,
  isOpenCommand,
  findOpen,
  slashBuilders,
  toRestBody,
};
