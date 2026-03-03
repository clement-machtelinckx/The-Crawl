import { rollDice, rollOnTable } from './dice';
import { getAbilityModifier } from './modifiers';
import {
  ABILITY_KEYS,
  type AbilityKey,
  type AbilityScore,
  type GenerateLevel0CharacterInput,
  type Level0Character,
} from './types';

const ABILITY_LABELS: Record<AbilityKey, string> = {
  force: 'Force',
  dexterite: 'Dextérité',
  endurance: 'Endurance',
  presence: 'Présence',
  intelligence: 'Intelligence',
  chance: 'Chance',
};

function createCharacterId(): string {
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `dcc-${Date.now()}-${randomPart}`;
}

function generateAbilityScore(key: AbilityKey): AbilityScore {
  const roll = rollDice(3, 6);
  const value = roll.total;
  const modifier = getAbilityModifier(value);

  return {
    key,
    label: ABILITY_LABELS[key],
    roll,
    value,
    modifier,
  };
}

function generateStats(): Level0Character['stats'] {
  return ABILITY_KEYS.reduce((accumulator, key) => {
    accumulator[key] = generateAbilityScore(key);
    return accumulator;
  }, {} as Level0Character['stats']);
}

export function generateLevel0Character(
  input: GenerateLevel0CharacterInput,
): Level0Character {
  const { tables, name = '', alignment = '' } = input;

  const stats = generateStats();
  const hitPointsRoll = rollDice(1, 4);

  const omenResult = rollOnTable(tables.omens, 30);
  const occupationResult = rollOnTable(tables.occupations, 100);
  const equipmentResult = rollOnTable(tables.equipments, 24);

  return {
    id: createCharacterId(),
    level: 0,
    name,
    alignment,
    stats,
    hitPoints: {
      roll: hitPointsRoll,
      value: hitPointsRoll.total,
    },
    omen: {
      ...omenResult.entry,
      rollValue: omenResult.roll.total,
    },
    occupation: {
      ...occupationResult.entry,
      rollValue: occupationResult.roll.total,
    },
    equipment: {
      ...equipmentResult.entry,
      rollValue: equipmentResult.roll.total,
    },
    createdAt: new Date().toISOString(),
  };
}