import React, { useMemo, useState } from 'react';
import {
  formatModifier,
  generateLevel0Character,
  saveCharacter,
  type Alignment,
  type Level0Character,
  type TableMetaRoll,
} from '../../lib/dcc';
import { BIRTH_AUGURS, EQUIPMENT, OCCUPATIONS } from '../../data/dcc';

function renderMetaRoll(metaRoll: TableMetaRoll): string {
  if (!metaRoll.results?.length) {
    return `${metaRoll.purpose} (${metaRoll.formula})`;
  }

  const values = metaRoll.results.map((result) => `${result.roll}: ${result.label}`).join(', ');
  return `${metaRoll.purpose} (${metaRoll.formula}) — ${values}`;
}

function DetailList({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

function NotesBlock({
  notes,
  metaRolls,
}: {
  notes?: Array<{ key: string; text: string }>;
  metaRolls?: TableMetaRoll[];
}): JSX.Element | null {
  if ((!notes || notes.length === 0) && (!metaRolls || metaRolls.length === 0)) {
    return null;
  }

  return (
    <div style={{ marginTop: '0.75rem' }}>
      {notes && notes.length > 0 && (
        <>
          <strong>Notes</strong>
          <ul style={{ marginTop: '0.5rem' }}>
            {notes.map((note) => (
              <li key={`${note.key}-${note.text}`}>
                <strong>{note.key}</strong> {note.text}
              </li>
            ))}
          </ul>
        </>
      )}

      {metaRolls && metaRolls.length > 0 && (
        <>
          <strong>Jets annexes</strong>
          <ul style={{ marginTop: '0.5rem' }}>
            {metaRolls.map((metaRoll) => (
              <li key={`${metaRoll.formula}-${metaRoll.purpose}`}>
                {renderMetaRoll(metaRoll)}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default function DccLevel0CharacterGenerator(): JSX.Element {
  const [name, setName] = useState('');
  const [alignment, setAlignment] = useState<Alignment>('');
  const [character, setCharacter] = useState<Level0Character | null>(null);
  const [message, setMessage] = useState('');

  const tables = useMemo(
    () => ({
      omens: BIRTH_AUGURS,
      occupations: OCCUPATIONS,
      equipments: EQUIPMENT,
    }),
    [],
  );

  const handleGenerate = (): void => {
    const nextCharacter = generateLevel0Character({
      name,
      alignment,
      tables,
    });

    setCharacter(nextCharacter);
    setMessage('');
  };

  const handleSave = (): void => {
    if (!character) return;

    const characterToSave: Level0Character = {
      ...character,
      name,
      alignment,
    };

    setCharacter(characterToSave);
    saveCharacter(characterToSave);
    setMessage('Personnage sauvegardé localement.');
  };

  const handleReroll = (): void => {
    handleGenerate();
  };

  return (
    <div>
      <h1>Créateur de personnage DCC niveau 0</h1>
      <p>
        Génère les caractéristiques, les points de vie, l’augure, le métier et l’équipement
        de départ d’un personnage niveau 0.
      </p>

      <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
        <label>
          <div style={{ marginBottom: '0.25rem' }}>Nom</div>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex. Yorik"
            style={{ width: '100%', maxWidth: 360, padding: '0.5rem' }}
          />
        </label>

        <label>
          <div style={{ marginBottom: '0.25rem' }}>Alignement</div>
          <select
            value={alignment}
            onChange={(event) => setAlignment(event.target.value as Alignment)}
            style={{ width: '100%', maxWidth: 360, padding: '0.5rem' }}
          >
            <option value="">Choisir plus tard</option>
            <option value="loyal">Loyal</option>
            <option value="neutre">Neutre</option>
            <option value="chaotique">Chaotique</option>
          </select>
        </label>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button type="button" className="button button--primary" onClick={handleGenerate}>
            Générer un personnage
          </button>

          <button
            type="button"
            className="button button--secondary"
            onClick={handleReroll}
          >
            Relancer
          </button>

          <button
            type="button"
            className="button button--secondary"
            onClick={handleSave}
            disabled={!character}
          >
            Sauvegarder
          </button>
        </div>

        {message ? <div>{message}</div> : null}
      </div>

      {character ? (
        <div>
          <DetailList title="Identité">
            <p>
              <strong>Nom :</strong> {name || 'Sans nom'}
              <br />
              <strong>Alignement :</strong> {alignment || 'Non défini'}
              <br />
              <strong>Niveau :</strong> {character.level}
            </p>
          </DetailList>

          <DetailList title="Caractéristiques">
            <table>
              <thead>
                <tr>
                  <th>Stat</th>
                  <th>Jet</th>
                  <th>Valeur</th>
                  <th>Mod.</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(character.stats).map((stat) => (
                  <tr key={stat.key}>
                    <td>{stat.label}</td>
                    <td>{stat.roll.results.join(', ')}</td>
                    <td>{stat.value}</td>
                    <td>{formatModifier(stat.modifier)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DetailList>

          <DetailList title="Points de vie">
            <p>
              <strong>Jet :</strong> {character.hitPoints.roll.results.join(', ')} (1d4)
              <br />
              <strong>PV :</strong> {character.hitPoints.value}
            </p>
          </DetailList>

          <DetailList title="Augure">
            <p>
              <strong>Jet :</strong> {character.omen.rollValue}
              <br />
              <strong>Augure :</strong> {character.omen.label}
              <br />
              <strong>Jet chanceux :</strong> {character.omen.luckyRoll}
              {character.omen.description ? (
                <>
                  <br />
                  <strong>Détail :</strong> {character.omen.description}
                </>
              ) : null}
            </p>
            <NotesBlock notes={character.omen.notes} metaRolls={character.omen.metaRolls} />
          </DetailList>

          <DetailList title="Métier">
            <p>
              <strong>Jet :</strong> {character.occupation.rollValue}
              <br />
              <strong>Métier :</strong> {character.occupation.label}
              <br />
              <strong>Arme maîtrisée :</strong> {character.occupation.trainedWeapon}
              <br />
              <strong>Possession :</strong> {character.occupation.possession}
            </p>
            <NotesBlock
              notes={character.occupation.notes}
              metaRolls={character.occupation.metaRolls}
            />
          </DetailList>

          <DetailList title="Équipement aléatoire">
            <p>
              <strong>Jet :</strong> {character.equipment.rollValue}
              <br />
              <strong>Objet :</strong> {character.equipment.label}
              <br />
              <strong>Coût :</strong> {character.equipment.cost}
            </p>
            <NotesBlock
              notes={character.equipment.notes}
              metaRolls={character.equipment.metaRolls}
            />
          </DetailList>
        </div>
      ) : null}
    </div>
  );
}