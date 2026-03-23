import type { DiceRoll, RollRange } from './types';

export function randomInt(min: number, max: number): number {
  const lower = Math.ceil(min);
  const upper = Math.floor(max);

  if (lower > upper) {
    throw new Error(`Invalid random range: ${min}..${max}`);
  }

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

export function rollDie(sides: number): number {
  if (!Number.isInteger(sides) || sides <= 0) {
    throw new Error(`Invalid die: d${sides}`);
  }

  return randomInt(1, sides);
}

export function rollDice(count: number, sides: number): DiceRoll {
  if (!Number.isInteger(count) || count <= 0) {
    throw new Error(`Invalid dice count: ${count}`);
  }

  const results = Array.from({ length: count }, () => rollDie(sides));
  const total = results.reduce((sum, value) => sum + value, 0);

  return {
    sides,
    results,
    total,
  };
}

export function rollFormula(formula: string): DiceRoll {
  const normalized = formula.trim().toLowerCase();
  const match = normalized.match(/^(\d+)d(\d+)$/);

  if (!match) {
    throw new Error(`Invalid dice formula: ${formula}`);
  }

  const [, countRaw, sidesRaw] = match;
  return rollDice(Number(countRaw), Number(sidesRaw));
}

export function isInRange(value: number, range: RollRange): boolean {
  return value >= range.min && value <= range.max;
}

export function rollOnTable<T extends { range: RollRange }>(
  table: T[],
  sides: number,
): {
  roll: DiceRoll;
  entry: T;
} {
  if (table.length === 0) {
    throw new Error('Cannot roll on an empty table');
  }

  const roll = rollDice(1, sides);
  const entry = table.find((item) => isInRange(roll.total, item.range));

  if (!entry) {
    throw new Error(`No table entry found for result ${roll.total} on d${sides}`);
  }

  return { roll, entry };
}
