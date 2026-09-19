'use strict';

/**
 * Channel × command and role grants for jvde_5025.
 * From: grok · 2026-09-19
 *
 *   const { allow, isOpenCommand } = require('./access-gates');
 *   const { isOpenCommand: open } = require('./open-commands');
 *
 * Open five never take a role. They still need the channel on.
 * Special commands need the channel on AND one granted role.
 *
 * Load `channels`, `roles` from the bank desk (command_channels / command_roles)
 * or seed CHANNEL_COMMANDS / ROLE_COMMANDS below until Mongo is wired.
 */

const { isOpenCommand } = require('./open-commands');

const CHANNEL_COMMANDS = {
  play: ['pound', 'daily', 'energy', 'receipt', 'curtrs'],
  shop: ['shop', 'inventory', 'receipt', 'curtrs'],
  drops: ['pick', 'drop'],
  general: ['pound', 'give', 'leaderboard', 'receipt', 'react', 'invites'],
  staff: ['drop', 'award', 'take', 'node', 'proof'],
  lattice: ['node', 'proof'],
};

const ROLE_COMMANDS = {
  everyone: ['inventory', 'pick', 'give', 'leaderboard', 'react', 'invites'],
  wanderer: [],
  ringbearer: [],
  staff: ['drop', 'award', 'take'],
  lattice: ['node', 'proof'],
};

function keyOf(tokenOrKey) {
  return String(tokenOrKey || '')
    .trim()
    .replace(/^\./, '')
    .replace(/^\//, '')
    .toLowerCase()
    .replace(/^£$/, 'pound')
    .replace(/^e$/, 'pound');
}

function channelOn(commandKey, channelSlug, channels) {
  const key = keyOf(commandKey);
  if (Array.isArray(channels)) {
    const hit = channels.find(
      (r) => r.command_key === key && (r.channel_id === channelSlug || r.slug === channelSlug),
    );
    if (hit) return Boolean(hit.allowed);
  }
  const slug = String(channelSlug || '').replace(/^#/, '');
  return Boolean((CHANNEL_COMMANDS[slug] || []).includes(key));
}

function roleOn(commandKey, memberRoleSlugs, roles) {
  const key = keyOf(commandKey);
  if (isOpenCommand(key)) return true;
  const granted = new Set(
    (Array.isArray(roles) ? roles : [])
      .filter((r) => r.command_key === key && r.allowed)
      .map((r) => r.slug || r.role_id),
  );
  if (granted.size) {
    return memberRoleSlugs.some((s) => granted.has(s));
  }
  for (const slug of memberRoleSlugs) {
    if ((ROLE_COMMANDS[slug] || []).includes(key)) return true;
  }
  return false;
}

function allow({ key, channelSlug, memberRoleSlugs, channels, roles }) {
  if (!channelOn(key, channelSlug, channels)) return false;
  if (isOpenCommand(key)) return true;
  return roleOn(key, memberRoleSlugs || [], roles);
}

module.exports = {
  CHANNEL_COMMANDS,
  ROLE_COMMANDS,
  isOpenCommand,
  channelOn,
  roleOn,
  allow,
};
