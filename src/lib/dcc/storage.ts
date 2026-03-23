import type { Level0Character, SavedCharacters } from './types';

const STORAGE_KEY = 'the-crawl:dcc:characters';

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function loadCharacters(): SavedCharacters {
  if (!isBrowser()) {
    return [];
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY);
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue) as SavedCharacters;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCharacters(characters: SavedCharacters): void {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
  } catch {
    // Swallow storage errors to avoid crashing the UI (e.g., quota exceeded, storage disabled).
  }
}

export function saveCharacter(character: Level0Character): SavedCharacters {
  const characters = loadCharacters();
  const nextCharacters = [character, ...characters];
  saveCharacters(nextCharacters);
  return nextCharacters;
}

export function removeCharacter(characterId: string): SavedCharacters {
  const characters = loadCharacters();
  const nextCharacters = characters.filter((character) => character.id !== characterId);
  saveCharacters(nextCharacters);
  return nextCharacters;
}

export function clearCharacters(): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}
