import React from 'react';
import Layout from '@theme/Layout';
import DccLevel0CharacterGenerator from '../components/dcc/DccLevel0CharacterGenerator';

export default function CreateurPersonnagePage(): JSX.Element {
  return (
    <Layout
      title="Créateur de personnage"
      description="Générateur de personnage DCC niveau 0"
    >
      <main className="container margin-vert--lg">
        <DccLevel0CharacterGenerator />
      </main>
    </Layout>
  );
}
