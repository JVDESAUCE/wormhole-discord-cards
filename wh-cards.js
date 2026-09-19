'use strict';

/**
 * WORMHOLE Components V2 card factory
 * From: grok · 2026-09-19 · for Claude / jvde_5025
 *
 * discord.js 14.16+
 *
 *   const { sendCard, cards, gifFile } = require('./wh-cards');
 *   await sendCard(message, cards.pound(dto), { personal: true, gif: true });
 *
 * DTO
 *   member: { id, tag, displayName, balance, pound, streak, lastDaily, issuer }
 *   sku:    { id, name, price, qty, description, requiredRole, grantedRole, l1Kind }
 *   tx:     { kind, amount, createdAt }
 *
 * Two books. .£ is £nergy. .$ is frozen WH.
 * Player loop: .energy and .daily are the same play. One tap pays.
 * Cards last 3 seconds unless { stay: true } (live drop, L1 receipts).
 * Every card gets a Bank link to https://bank.1212.is
 * Buttons are Secondary. Link style only for Bank.
 * Player-facing time is 12⋮12, never a colon. markTime() converts.
 */

const path = require('path');
const {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  ContainerBuilder,
  MediaGalleryBuilder,
  MediaGalleryItemBuilder,
  MessageFlags,
  SectionBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  TextDisplayBuilder,
  ThumbnailBuilder,
} = require('discord.js');

const ACCENT = 0xc9ccd4;
const OK = 0x7d9b86;
const WARN = 0xb9a27a;
const BAD = 0xb57a76;

const V2 = MessageFlags.IsComponentsV2;
const V2_EPHEMERAL = MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral;
const PERSONAL_TTL_MS = 3_000;
const CARD_TTL_MS = 3_000;
const BANK_URL = 'https://bank.1212.is';
const GIF_NAME = 'wormhole.gif';
const GIF_URL = `attachment://${GIF_NAME}`;

/** Point this at the gif already on the droplet. */
const GIF_PATH = process.env.WORMHOLE_GIF
  || path.join(__dirname, 'assets', GIF_NAME);

function gifFile() {
  return new AttachmentBuilder(GIF_PATH).setName(GIF_NAME);
}

function fmt(n) {
  return Number(n).toLocaleString('en-US');
}

function wh(n) {
  return `${fmt(n)} WH`;
}

function signed(n) {
  const v = Number(n);
  const mag = fmt(Math.abs(v));
  return `${v < 0 ? '−' : '+'}${mag} WH`;
}

function mention(id) {
  return id ? `<@${id}>` : '—';
}

function layerOf(kind) {
  return kind && kind !== 'none' ? 'L1' : 'L2';
}

function exitOf(kind) {
  switch (kind) {
    case 'rooom_drink': return 'till';
    case 'store_discount': return '1212.is order';
    case 'dragon12': return 'slot · LINE books';
    default: return 'role · no till';
  }
}

function l1Label(kind) {
  switch (kind) {
    case 'rooom_drink': return 'rooom drink';
    case 'store_discount': return '1212.is discount';
    case 'dragon12': return 'Dragon12 slot';
    default: return 'Discord role';
  }
}

function shopButtonLabel(sku) {
  const price = fmt(sku.price);
  if (sku.l1Kind === 'rooom_drink') return `Drink · ${price}`;
  if (sku.l1Kind === 'store_discount') return `10% · ${price}`;
  if (sku.l1Kind === 'dragon12') return `Dragon12 · ${price}`;
  if (sku.grantedRole) return `${sku.grantedRole} · ${price}`;
  return `${String(sku.name).slice(0, 24)} · ${price}`;
}

function sep() {
  return new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small);
}

function text(content) {
  return new TextDisplayBuilder().setContent(content);
}

function buttonRows(buttons) {
  const rows = [];
  for (let i = 0; i < buttons.length; i += 3) rows.push(buttons.slice(i, i + 3));
  return rows;
}

function build({
  accent,
  kicker,
  title,
  amount = null,
  body = null,
  fields = [],
  footer = null,
  media = null,
  proofUrl = null,
  buttons = [],
}) {
  const c = new ContainerBuilder().setAccentColor(accent);
  const head = [`-# ${kicker}`, `## ${title}`];
  if (amount) head.push(`# ${amount}`);
  const headText = head.join('\n');

  if (media === 'thumb') {
    c.addSectionComponents(
      new SectionBuilder()
        .addTextDisplayComponents(text(headText))
        .setThumbnailAccessory(new ThumbnailBuilder().setURL(GIF_URL)),
    );
  } else {
    c.addTextDisplayComponents(text(headText));
  }

  if (media === 'hero') {
    c.addMediaGalleryComponents(
      new MediaGalleryBuilder().addItems(
        new MediaGalleryItemBuilder().setURL(GIF_URL),
      ),
    );
  }
  if (media === 'proof' && proofUrl) {
    c.addMediaGalleryComponents(
      new MediaGalleryBuilder().addItems(
        new MediaGalleryItemBuilder().setURL(proofUrl),
      ),
    );
  }

  if (body) c.addTextDisplayComponents(text(body));

  if (fields.length) {
    const rows = fields
      .filter((f) => f && f.value !== undefined && f.value !== null && f.value !== '')
      .map((f) => `-# ${f.label}\n${f.value}`)
      .join('\n');
    if (rows) {
      c.addSeparatorComponents(sep());
      c.addTextDisplayComponents(text(rows));
    }
  }

  if (footer) {
    c.addSeparatorComponents(sep());
    c.addTextDisplayComponents(text(`-# ${footer}`));
  }

  if (buttons.length) {
    for (const group of buttonRows(buttons)) {
      const row = new ActionRowBuilder();
      for (const b of group) {
        const btn = new ButtonBuilder()
          .setLabel(String(b.label).slice(0, 80))
          .setDisabled(Boolean(b.disabled));
        if (b.url) {
          btn.setStyle(ButtonStyle.Link).setURL(b.url);
        } else {
          btn.setCustomId(b.id).setStyle(ButtonStyle.Secondary);
        }
        row.addComponents(btn);
      }
      c.addActionRowComponents(row);
    }
  }

  const hasBank = (buttons || []).some((b) => b.url === BANK_URL || b.id === 'bank');
  if (!hasBank) {
    c.addActionRowComponents(
      new ActionRowBuilder().addComponents(
        new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(BANK_URL).setLabel('Bank'),
      ),
    );
  }

  return c;
}

function isInteraction(target) {
  return Boolean(
    target
      && typeof target.reply === 'function'
      && (typeof target.isRepliable === 'function' || target.deferred !== undefined || target.replied !== undefined),
  );
}

/**
 * @param {import('discord.js').Message | import('discord.js').Interaction} target
 * @param {ContainerBuilder} container
 * @param {{ personal?: boolean, gif?: boolean, files?: object[], edit?: boolean }} [opts]
 */
async function sendCard(target, container, opts = {}) {
  const { personal = false, gif = false, files = [], edit = false, stay = false } = opts;
  const payloadFiles = gif ? [gifFile(), ...files] : files;
  const slash = isInteraction(target);
  const flags = personal && slash ? V2_EPHEMERAL : V2;
  const payload = {
    components: [container],
    flags,
    files: payloadFiles,
  };

  let sent;
  if (slash) {
    if (edit && (target.deferred || target.replied)) {
      sent = await target.editReply(payload);
    } else if (target.deferred || target.replied) {
      sent = await target.followUp(payload);
    } else {
      sent = await target.reply(payload);
    }
  } else if (edit && typeof target.edit === 'function') {
    sent = await target.edit(payload);
  } else {
    sent = await target.reply(payload);
  }

  if (!stay && !slash && sent && typeof sent.delete === 'function') {
    setTimeout(() => sent.delete().catch(() => {}), CARD_TTL_MS);
  }
  return sent;
}

function iris(days) {
  if (!days || days <= 0) return 1;
  return Math.min(12, days);
}

/** Player-facing clock mark. Accept HH:MM or HH⋮MM. Always print ⋮. */
function markTime(hhmm) {
  if (!hhmm) return '—';
  return String(hhmm).replace(/[:⋮]/g, '⋮');
}

function pounds(n) {
  const v = Number(n) || 0;
  return `${v.toLocaleString('en-GB')} £`;
}

function plusPounds(n) {
  return `+${Number(n || 0).toLocaleString('en-GB')} £`;
}

const cards = {
  pound({ displayName, tag, pound = 0, streak = 0 }) {
    return build({
      accent: ACCENT,
      kicker: '12⋮12am',
      title: displayName,
      amount: pounds(pound),
      fields: [{ label: 'FIRE', value: String(streak || 0) }],
      footer: "Don't miss tomorrow.",
      media: 'thumb',
    });
  },

  play({ amount = 1, fire = 0, treat = 0, upgrade = false, jackpot = false, hhmm, event, kind }) {
    if (event === 'done') {
      return build({
        accent: WARN,
        kicker: '12⋮12am',
        title: 'Tomorrow',
        fields: [{ label: 'FIRE', value: String(fire) }],
        footer: "Don't miss it.",
        media: 'thumb',
      });
    }
    const isJack = jackpot || kind === 'crest' || kind === 'JACKPOT' || Number(amount) >= 12;
    const title = upgrade ? 'Better' : isJack ? 'Jackpot' : markTime(hhmm) || 'Play';
    return build({
      accent: OK,
      kicker: '12⋮12am',
      title,
      amount: plusPounds(amount),
      fields: [{ label: 'FIRE', value: String(fire) }],
      footer: treat ? `Treat +${treat} £.` : "Don't miss tomorrow.",
      media: 'thumb',
    });
  },

  streakOn(dto) {
    return cards.play(dto);
  },

  balance({ displayName, tag, balance, streak }) {
    return build({
      accent: ACCENT,
      kicker: 'WORMHOLE · BALANCE',
      title: displayName,
      amount: wh(balance),
      fields: [
        { label: 'STREAK', value: streak > 0 ? `${streak} day${streak === 1 ? '' : 's'}` : '—' },
        { label: 'TAG', value: tag || '—' },
      ],
      footer: 'Hours do not mint. This is the bot ledger.',
      media: 'thumb',
    });
  },

  daily({ amount, fromStreak, toStreak, balance }) {
    return build({
      accent: OK,
      kicker: 'WORMHOLE · DAILY',
      title: 'Claimed',
      amount: signed(amount),
      fields: [
        { label: 'STREAK', value: `${fromStreak} → ${toStreak}` },
        { label: 'BALANCE', value: wh(balance) },
      ],
      footer: 'Streak bonus only. Hours still do not mint.',
      media: 'thumb',
    });
  },

  dailyClaimed({ waitLabel, streak, lastClaim }) {
    return build({
      accent: WARN,
      kicker: 'WORMHOLE · DAILY',
      title: 'Already claimed',
      amount: waitLabel,
      body: 'Next claim opens after the daily window.',
      fields: [
        { label: 'STREAK', value: String(streak) },
        { label: 'LAST CLAIM', value: lastClaim || 'today' },
      ],
      footer: 'Streak holds if you return in time. Hours do not mint.',
      media: 'thumb',
    });
  },

  shop({ balance, skus, ownedRoles = [] }) {
    const body = (skus || []).map((s) => {
      const qty = s.qty == null ? '∞' : `${s.qty} left`;
      return `**${s.name}** — ${wh(s.price)} · ${layerOf(s.l1Kind)} ${exitOf(s.l1Kind)} · ${qty}`;
    }).join('\n') || 'Catalogue empty.';

    const buttons = (skus || []).slice(0, 5).map((s) => ({
      id: `wh:buy:${s.id}`,
      label: shopButtonLabel(s),
      disabled: s.qty === 0 || (s.requiredRole && !ownedRoles.includes(s.requiredRole)),
    }));

    return build({
      accent: ACCENT,
      kicker: 'WORMHOLE · SHOP',
      title: 'Catalogue',
      amount: wh(balance),
      body,
      footer: 'L1 leaves the server. L2 stays a role.',
      buttons,
    });
  },

  boughtL1({ name, price, l1Kind, balance }) {
    const body = {
      rooom_drink: 'Claim at the till.',
      store_discount: 'One-use code path.',
      dragon12: 'Slot held. LINE still confirms.',
    }[l1Kind] || 'L1 exit.';

    return build({
      accent: OK,
      kicker: 'WORMHOLE · BOUGHT',
      title: name,
      amount: signed(-Math.abs(price)),
      body,
      fields: [
        { label: 'LAYER', value: 'L1' },
        { label: 'KIND', value: l1Label(l1Kind) },
        { label: 'BALANCE', value: wh(balance) },
      ],
      footer: 'Staff marks the till. This is not hours.',
    });
  },

  boughtL2({ name, price, role, balance }) {
    return build({
      accent: OK,
      kicker: 'WORMHOLE · BOUGHT',
      title: name,
      amount: signed(-Math.abs(price)),
      body: 'Discord role granted. No till.',
      fields: [
        { label: 'LAYER', value: 'L2' },
        { label: 'ROLE', value: role || name },
        { label: 'BALANCE', value: wh(balance) },
      ],
      footer: 'Role is constructed. It is not hours, cash, or a drink.',
    });
  },

  confirmL1({ sku }) {
    return build({
      accent: WARN,
      kicker: 'WORMHOLE · SHOP',
      title: `Confirm ${sku.name}`,
      amount: wh(sku.price),
      body: sku.l1Kind === 'dragon12'
        ? 'Holds an appointment slot. LINE still confirms. This debit does not book the hour by itself.'
        : 'L1 exit. Confirm to debit WH.',
      buttons: [
        { id: `wh:confirm:${sku.id}`, label: `Confirm · ${fmt(sku.price)}` },
        { id: 'wh:cancel', label: 'Cancel' },
      ],
      footer: 'Nothing charged until confirm.',
    });
  },

  inventory({ displayName, items }) {
    const body = (items && items.length)
      ? items.map((it) => `**${it.name}** · ${layerOf(it.l1Kind)} ${exitOf(it.l1Kind)}`).join('\n')
      : 'Nothing owned.';
    return build({
      accent: ACCENT,
      kicker: 'WORMHOLE · INVENTORY',
      title: displayName,
      body,
      footer: 'L1 still needs a till, an order, or LINE.',
    });
  },

  leaderboard({ rows, selfId }) {
    const body = (rows || []).slice(0, 10).map((r, i) => {
      const name = r.id === selfId ? `**${r.displayName}**` : r.displayName;
      return `${i + 1}  ${name}    ${wh(r.balance)}`;
    }).join('\n') || 'No balances yet.';
    return build({
      accent: ACCENT,
      kicker: 'WORMHOLE · RING',
      title: 'Leaderboard',
      body,
      footer: 'Bot ledger. Hours are not ranked here.',
    });
  },

  dropLive({ channelMention, amount, passworded, firstPickBonus }) {
    return build({
      accent: OK,
      kicker: 'WORMHOLE · DROP',
      title: `Live in ${channelMention}`,
      amount: wh(amount),
      body: passworded ? 'First `.pick` takes it. Password required.' : 'First `.pick` takes it.',
      fields: [
        { label: 'STATUS', value: 'LIVE' },
        firstPickBonus ? { label: 'FIRST PICK', value: signed(firstPickBonus) } : null,
      ].filter(Boolean),
      footer: 'Planted. Not minted from hours.',
      media: 'hero',
    });
  },

  dropClosed({ channelMention, amount, winnerId }) {
    return build({
      accent: ACCENT,
      kicker: 'WORMHOLE · DROP',
      title: 'Drop closed',
      amount: wh(amount),
      body: winnerId ? `${mention(winnerId)} caught it in ${channelMention}.` : `Closed in ${channelMention}.`,
      fields: [{ label: 'STATUS', value: 'CLOSED' }],
      footer: 'Planted. Not minted from hours.',
    });
  },

  pick({ displayName, amount, dropAmount, firstPickBonus, balance }) {
    return build({
      accent: OK,
      kicker: 'WORMHOLE · PICK',
      title: `${displayName} caught it`,
      amount: signed(amount),
      fields: [
        { label: 'DROP', value: wh(dropAmount) },
        { label: 'FIRST PICK', value: firstPickBonus ? signed(firstPickBonus) : '—' },
        { label: 'BALANCE', value: wh(balance) },
      ],
      footer: 'First pick of the UTC day only bonuses once.',
      media: 'thumb',
    });
  },

  pickGone({ winnerId, amount, channelMention, balance, expired = false }) {
    return build({
      accent: BAD,
      kicker: 'WORMHOLE · PICK',
      title: expired ? 'Drop expired' : 'Drop is gone',
      body: expired
        ? 'The drop expired. WH returned to the planter.'
        : `${mention(winnerId)} caught ${wh(amount)} in ${channelMention}. This drop is closed.`,
      fields: [{ label: 'BALANCE', value: wh(balance) }],
      footer: 'Wait for the next plant.',
    });
  },

  give({ amount, fromId, toId, balance }) {
    return build({
      accent: ACCENT,
      kicker: 'WORMHOLE · GIVE',
      title: 'Sent',
      amount: signed(-Math.abs(amount)),
      body: `${mention(fromId)} → ${mention(toId)}`,
      fields: [{ label: 'BALANCE', value: wh(balance) }],
      footer: 'Atomic transfer. Not a mint.',
    });
  },

  receipt({ displayName, rows, txs }) {
    const list = rows || txs || [];
    const body = list.slice(0, 8).map((t) => {
      const unit = t.unit === '£' || t.unit === 'pound' ? '£' : 'WH';
      const n = Number(t.amount) || 0;
      const mag = Math.abs(n).toLocaleString('en-GB');
      const signedAmt = `${n < 0 ? '−' : '+'}${mag} ${unit}`;
      const kind = String(t.kind || 'play').padEnd(8, ' ');
      return `\`${kind}\`  ${signedAmt}`;
    }).join('\n') || 'No receipts.';
    return build({
      accent: ACCENT,
      kicker: '12⋮12am',
      title: `${displayName} · last 8`,
      body,
      footer: 'The book is bank.1212.is.',
    });
  },

  curtrs(dto) {
    return cards.receipt(dto);
  },

  energy(dto) {
    return cards.play(dto);
  },

  got(dto) {
    return cards.play(dto);
  },

  claim(dto) {
    return cards.play(dto);
  },

  already(dto) {
    return cards.play({ ...dto, event: 'done' });
  },

  node({ name, l1orL2Line, place, layer, kind, status }) {
    return build({
      accent: ACCENT,
      kicker: 'WORMHOLE · NODE',
      title: name,
      body: l1orL2Line,
      fields: [
        { label: 'PLACE', value: place || '—' },
        { label: 'LAYER', value: layer || '—' },
        { label: 'KIND', value: kind || '—' },
        { label: 'STATUS', value: status || '—' },
      ],
      footer: 'Hours stay on the lattice board. This card does not mint WH.',
      media: 'thumb',
    });
  },

  nodeGated() {
    return build({
      accent: WARN,
      kicker: 'WORMHOLE · NODE',
      title: 'Title required',
      body: 'This node is gated.',
      footer: 'Ask staff. Do not scrape.',
    });
  },

  proof({ energyId, node, layer, byId, proofUrl }) {
    return build({
      accent: ACCENT,
      kicker: 'WORMHOLE · PROOF',
      title: 'Proof attached',
      body: `Logged against energy post ${energyId}.`,
      fields: [
        { label: 'NODE', value: node || '—' },
        { label: 'LAYER', value: layer || '—' },
        { label: 'BY', value: mention(byId) },
      ],
      footer: 'Proof is evidence. It does not mint WH.',
      media: 'proof',
      proofUrl,
    });
  },

  invite({ amount, countedThisWeek }) {
    return build({
      accent: ACCENT,
      kicker: 'WORMHOLE · INVITE',
      title: 'Real join counted',
      amount: signed(amount),
      body: 'One counted join. Left and fake are not paid.',
      fields: countedThisWeek != null
        ? [{ label: 'COUNTED', value: `${countedThisWeek} this week` }]
        : [],
      footer: 'Invite WH stays in the bot. Do not scrape graphs onto the lattice.',
    });
  },

  award({ amount, staffId, memberId, balance, reason }) {
    return build({
      accent: OK,
      kicker: 'WORMHOLE · AWARD',
      title: 'Staff mint',
      amount: signed(amount),
      body: `${mention(staffId)} awarded ${mention(memberId)}.`,
      fields: [
        { label: 'BALANCE', value: wh(balance) },
        { label: 'REASON', value: reason || '—' },
      ],
      footer: 'Staff only. Mint is L2. Hours still do not mint.',
    });
  },

  take({ amount, staffId, memberId, balance, reason }) {
    return build({
      accent: BAD,
      kicker: 'WORMHOLE · TAKE',
      title: 'Staff burn',
      amount: signed(-Math.abs(amount)),
      body: `${mention(staffId)} took from ${mention(memberId)}.`,
      fields: [
        { label: 'BALANCE', value: wh(balance) },
        { label: 'REASON', value: reason || '—' },
      ],
      footer: 'Staff only. Burn is L2. Does not touch lattice hours.',
    });
  },

  errorFunds({ need, have }) {
    return build({
      accent: BAD,
      kicker: 'WORMHOLE · BANK',
      title: 'Not enough WH',
      body: `Need ${wh(need)}. Have ${wh(have)}.`,
      footer: 'Nothing was charged.',
    });
  },

  error({ title, body, footer = 'Nothing was charged.', warn = false }) {
    return build({
      accent: warn ? WARN : BAD,
      kicker: 'WORMHOLE · BANK',
      title,
      body,
      footer,
    });
  },

  shopOff({ balance }) {
    return build({
      accent: BAD,
      kicker: 'WORMHOLE · SHOP',
      title: 'Shop is off',
      body: 'The catalogue is closed on Discord. Nothing was charged.',
      fields: [{ label: 'BALANCE', value: wh(balance) }],
      footer: 'Admin toggle.',
    });
  },

  soldOut({ name, price, balance, l1Kind }) {
    return build({
      accent: WARN,
      kicker: 'WORMHOLE · SHOP',
      title: 'Sold out',
      body: `${name} has none left this cycle.`,
      fields: [
        { label: 'PRICE', value: wh(price) },
        { label: 'QTY', value: '0' },
        { label: 'BALANCE', value: wh(balance) },
      ],
      footer: l1Kind === 'dragon12'
        ? 'LINE still books the real hour. This SKU only holds a Discord slot.'
        : 'Nothing was charged.',
    });
  },

  needsRole({ name, requiredRole, price, balance }) {
    return build({
      accent: WARN,
      kicker: 'WORMHOLE · SHOP',
      title: `Needs ${requiredRole}`,
      body: `${name} requires the ${requiredRole} role first.`,
      fields: [
        { label: 'PRICE', value: wh(price) },
        { label: 'BALANCE', value: wh(balance) },
        { label: 'MISSING', value: requiredRole },
      ],
      footer: `Buy ${requiredRole} then return. Role is L2. No till.`,
    });
  },

  welcome({ displayName, amount, balance }) {
    return build({
      accent: OK,
      kicker: 'WORMHOLE · WELCOME',
      title: displayName,
      amount: signed(amount),
      body: 'One welcome grant. Streak starts at 0.',
      fields: [{ label: 'BALANCE', value: wh(balance) }],
      footer: 'Hours do not mint. This is the bot ledger.',
      media: 'thumb',
    });
  },

  help() {
    return build({
      accent: ACCENT,
      kicker: '12⋮12am',
      title: 'Play',
      body: [
        '`.£` `.e` — pile',
        '`.energy` `.daily` — play. Same thing.',
        '`.shop` — buy',
        '`.inventory` — owned',
        '`.receipt` — last 8',
        'Bank: bank.1212.is',
      ].join('\n'),
      footer: 'Cards last 3 seconds.',
    });
  },

  refund({ amount, role, balance }) {
    return build({
      accent: WARN,
      kicker: 'WORMHOLE · BANK',
      title: 'WH returned',
      amount: signed(amount),
      body: `Role grant failed. ${role || 'Role'} was not applied.`,
      fields: [{ label: 'BALANCE', value: wh(balance) }],
      footer: 'WH returned.',
    });
  },

  needImage() {
    return build({
      accent: BAD,
      kicker: 'WORMHOLE · PROOF',
      title: 'Attach an image',
      body: '.proof needs an image on the message.',
      footer: 'Nothing was charged.',
    });
  },
};

module.exports = {
  ACCENT,
  OK,
  WARN,
  BAD,
  V2,
  V2_EPHEMERAL,
  PERSONAL_TTL_MS,
  CARD_TTL_MS,
  BANK_URL,
  GIF_URL,
  gifFile,
  fmt,
  wh,
  signed,
  layerOf,
  exitOf,
  iris,
  markTime,
  pounds,
  plusPounds,
  build,
  sendCard,
  cards,
};
