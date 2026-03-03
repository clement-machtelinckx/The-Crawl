export const ABILITY_KEYS = [
  'force',
  'dexterite',
  'endurance',
  'presence',
  'intelligence',
  'chance',
] as const;

export type AbilityKey = (typeof ABILITY_KEYS)[number];

export type Alignment = 'loyal' | 'neutre' | 'chaotique' | '';

export type DiceRoll = {
  sides: number;
  results: number[];
  total: number;
};

export type AbilityScore = {
  key: AbilityKey;
  label: string;
  roll: DiceRoll;
  value: number;
  modifier: number;
};

export type RollRange = {
  min: number;
  max: number;
};

export type TableNote = {
  key: string;
  text: string;
};

export type TableMetaRoll = {
  formula: string;
  purpose: string;
  results?: Array<{
    roll: number;
    label: string;
  }>;
};

export type BaseTableEntry = {
  id: string;
  range: RollRange;
  label: string;
  description?: string;
  notes?: TableNote[];
  metaRolls?: TableMetaRoll[];
};

export type BirthAugurEntry = BaseTableEntry & {
  kind: 'birthAugur';
  luckyRoll: string;
};

export type OccupationEntry = BaseTableEntry & {
  kind: 'occupation';
  trainedWeapon: string;
  possession: string;
};

export type EquipmentEntry = BaseTableEntry & {
  kind: 'equipment';
  cost: string;
};

export type BirthAugurTable = BirthAugurEntry[];
export type OccupationTable = OccupationEntry[];
export type EquipmentTable = EquipmentEntry[];

export type TableCollection = {
  omens: BirthAugurTable;
  occupations: OccupationTable;
  equipments: EquipmentTable;
};

export type RolledTableResult<TEntry> = TEntry & {
  rollValue: number;
};

export type Level0Character = {
  id: string;
  level: 0;
  name: string;
  alignment: Alignment;
  stats: Record<AbilityKey, AbilityScore>;
  hitPoints: {
    roll: DiceRoll;
    value: number;
  };
  omen: RolledTableResult<BirthAugurEntry>;
  occupation: RolledTableResult<OccupationEntry>;
  equipment: RolledTableResult<EquipmentEntry>;
  createdAt: string;
};

export type GenerateLevel0CharacterInput = {
  name?: string;
  alignment?: Alignment;
  tables: TableCollection;
};

export type SavedCharacters = Level0Character[];