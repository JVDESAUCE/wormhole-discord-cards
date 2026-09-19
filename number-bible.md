# 12⋮12am number bible — `.energy` catch

**Updated:** 2026-09-19 · **By:** grok · **Status:** proposed
**Rule:** shape first. Value second. Justification does not approve. £ never mints from a catch.

## The mark

Player-facing time uses **`⋮`**, never `:`. That is the brand (12⋮12am).

Internal keys may still be `HH:MM`. Factory `markTime()` converts. Examples in this file are already shown.

## Sacred marks

3 · 6 · 9 · 12 on the clock. 0 is the face (12 at midnight). 1 and 2 compose 12.

## Shape, not just the number

| Shape | Example | Fit | × |
|---|---|---|---|
| Crest — 12 twice | 12⋮12, 00⋮00 | CREST | 12 |
| 12 reversed / stacked | 12⋮21, 21⋮12, 21⋮21 | ECHO | 9 |
| Palindrome HHMM | 03⋮30, 11⋮11, 04⋮40 | LOOP | 6 |
| Hour = minute on a mark | 03⋮03, 06⋮06, 09⋮09 | DOUBLE | 6 |
| 6 rotated is 9 | 06⋮39 ↔ 09⋮36 | ROTATE | 3 |
| Hour and minute both on a mark | 03⋮12, 18⋮09 | ALIGN | 2 |
| Hour *or* minute *or* date on a mark | 12⋮04, month 9 | PULSE | 1.5 |
| No fit | 14⋮22 in January | OPEN | 1 |

Highest fit wins. Tiers do not multiply each other.

12⋮21 is a palindrome *and* an echo. Echo wins.

## 6 ↔ 9

6 and 9 are one glyph turned 180°. Swap every 6 with 9 and every 9 with 6. If that swap is still a clock time, the two minutes are a pair.

- 06⋮39 ↔ 09⋮36
- 09⋮06 ↔ 06⋮09

Both hour and minute must already sit on a mark. 06⋮49 has a 9 but 49 is not a mark, so it stays PULSE. 16⋮09 is PULSE.

A lone 6 (16⋮00) is not a pair. 06⋮06 has no 9, so it is DOUBLE, not ROTATE.

## Date

Month or day in 3 · 6 · 9 · 12 = date fit. Turns OPEN into PULSE.
12/12, 9/9, 6/6, 3/3 = date crest. Bumps one tier. Cap ×12.

September is month 9, so a miss this month is date-only PULSE. The clock itself is still OPEN. Iris stays quiet unless the digits fit.

## Ledger

XP = the multiplier (score).
£ = 0. Table not set. Feeling/catch does not pay the till.
One `.energy` per local minute.

## Player copy

`.£` = balance.
`.energy` = catch this minute.
`.daily` = streak picture.
Time shown as 12⋮12.
