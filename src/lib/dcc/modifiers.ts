const MODIFIER_BY_SCORE: Record<number, number> = {
  3: -3,
  4: -2,
  5: -2,
  6: -1,
  7: -1,
  8: -1,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 1,
  14: 1,
  15: 1,
  16: 2,
  17: 2,
  18: 3,
};

export function getAbilityModifier(score: number): number {
  const modifier = MODIFIER_BY_SCORE[score];

  if (modifier === undefined) {
    throw new Error(`Unsupported ability score: ${score}`);
  }

  return modifier;
}

export function formatModifier(modifier: number): string {
  if (modifier > 0) return `+${modifier}`;
  return `${modifier}`;
}
