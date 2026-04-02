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
import { Button, TextInput, SelectInput, Card } from '../ui';

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
}) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
      <div className="app-stack" style={{ gap: '0.5rem' }}>{children}</div>
    </div>
  );
}

function NotesBlock({
  notes,
  metaRolls,
}: {
  notes?: Array<{ key: string; text: string }>;
  metaRolls?: TableMetaRoll[];
}) {
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

export default function DccLevel0CharacterGenerator() {
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
    <div className="app-stack" style={{ gap: '2rem' }}>
      <div>
        <h1 style={{ marginBottom: '0.5rem' }}>Créateur de personnage DCC niveau 0</h1>
        <p className="app-muted">
          Génère les caractéristiques, les points de vie, l’augure, le métier et l’équipement
          de départ d’un personnage niveau 0.
        </p>
      </div>

      <Card variant="section">
        <div className="app-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <TextInput
            label="Nom du personnage"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex. Yorik"
          />

          <SelectInput
            label="Alignement"
            value={alignment}
            onChange={(event) => setAlignment(event.target.value as Alignment)}
          >
            <option value="">Choisir plus tard</option>
            <option value="loyal">Loyal</option>
            <option value="neutre">Neutre</option>
            <option value="chaotique">Chaotique</option>
          </SelectInput>
        </div>

        <div className="app-row" style={{ marginTop: '1.5rem' }}>
          <Button variant="primary" onClick={handleGenerate}>
            Générer un personnage
          </Button>

          <Button variant="secondary" onClick={handleReroll} disabled={!character}>
            Relancer
          </Button>

          <Button
            variant="secondary"
            onClick={handleSave}
            disabled={!character}
          >
            Sauvegarder
          </Button>
        </div>

        {message && (
          <p className="alert success" style={{ marginTop: '1rem' }}>{message}</p>
        )}
      </Card>

      {character && (
        <Card className="app-grid" style={{ gap: '2rem' }}>
          <div className="app-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <DetailList title="Identité">
              <div>
                <strong>Nom :</strong> {name || 'Sans nom'}<br />
                <strong>Alignement :</strong> {alignment || 'Non défini'}<br />
                <strong>Niveau :</strong> {character.level}
              </div>
            </DetailList>

            <DetailList title="Points de vie">
              <div>
                <strong>Jet :</strong> {character.hitPoints.roll.results.join(', ')} (1d4)<br />
                <strong>Mod. Endurance :</strong> {formatModifier(character.hitPoints.staminaModifier)}<br />
                <strong>Calcul :</strong> {character.hitPoints.roll.total} {character.hitPoints.staminaModifier >= 0 ? '+' : '-'}{' '}
                {Math.abs(character.hitPoints.staminaModifier)}<br />
                <strong>PV :</strong> {character.hitPoints.value}
              </div>
            </DetailList>
          </div>

          <DetailList title="Caractéristiques">
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '400px' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Stat</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Jet</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Valeur</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Mod.</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(character.stats).map((stat) => (
                    <tr key={stat.key} style={{ borderTop: '1px solid var(--app-border-color)' }}>
                      <td style={{ padding: '0.5rem' }}>{stat.label}</td>
                      <td style={{ padding: '0.5rem' }}>{stat.roll.results.join(', ')}</td>
                      <td style={{ padding: '0.5rem' }}>{stat.value}</td>
                      <td style={{ padding: '0.5rem' }}>{formatModifier(stat.modifier)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DetailList>

          <div className="app-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <DetailList title="Augure">
              <div>
                <strong>Jet :</strong> {character.omen.rollValue}<br />
                <strong>Augure :</strong> {character.omen.label}<br />
                <strong>Jet chanceux :</strong> {character.omen.luckyRoll}
                {character.omen.description && (
                  <>
                    <br /><strong>Détail :</strong> {character.omen.description}
                  </>
                )}
              </div>
              <NotesBlock notes={character.omen.notes} metaRolls={character.omen.metaRolls} />
            </DetailList>

            <DetailList title="Métier">
              <div>
                <strong>Jet :</strong> {character.occupation.rollValue}<br />
                <strong>Métier :</strong> {character.occupation.label}<br />
                <strong>Arme maîtrisée :</strong> {character.occupation.trainedWeapon}<br />
                <strong>Possession :</strong> {character.occupation.possession}
              </div>
              <NotesBlock
                notes={character.occupation.notes}
                metaRolls={character.occupation.metaRolls}
              />
            </DetailList>

            <DetailList title="Équipement aléatoire">
              <div>
                <strong>Jet :</strong> {character.equipment.rollValue}<br />
                <strong>Objet :</strong> {character.equipment.label}<br />
                <strong>Coût :</strong> {character.equipment.cost}
              </div>
              <NotesBlock
                notes={character.equipment.notes}
                metaRolls={character.equipment.metaRolls}
              />
            </DetailList>
          </div>
        </Card>
      )}
    </div>
  );
}
