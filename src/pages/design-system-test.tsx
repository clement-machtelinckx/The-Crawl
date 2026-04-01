import React from 'react';
import Layout from '@theme/Layout';
import { Button } from '@site/src/components/ui/Button';
import { Card } from '@site/src/components/ui/Card';
import { TextInput, SelectInput } from '@site/src/components/ui/Input';

export default function DesignSystemTest() {
  return (
    <Layout title="Design System Test Lab">
      <main style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '3rem', borderBottom: '1px solid var(--app-border-color)', paddingBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>UI Lab & Design System</h1>
          <p style={{ opacity: 0.7, fontSize: '1.1rem' }}>Espace d'expérimentation pour les composants et styles locaux de l'application.</p>
        </header>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🎨</span> Couleurs & Surfaces
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {/* Exemple palette A : Surfaces standard */}
            <div style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--app-border-color)', background: 'var(--app-surface-color)' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Surface Standard</div>
              <code style={{ fontSize: '0.8rem' }}>var(--app-surface-color)</code>
              <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--app-surface-accent)', borderRadius: '8px', fontSize: '0.9rem' }}>
                Surface Accentuation (vignette, code, etc.)
              </div>
            </div>

            {/* Exemple palette B : Semantic colors */}
            <div style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--app-border-color)', background: 'var(--app-surface-color)' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Couleurs Sémantiques</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ padding: '0.5rem 0.75rem', background: 'var(--app-color-success-bg)', color: 'var(--app-color-success)', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
                  Succès / Validation
                </div>
                <div style={{ padding: '0.5rem 0.75rem', background: 'var(--app-color-error-bg)', color: 'var(--app-color-error)', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
                  Erreur / Danger
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🔘</span> Boutons & Actions
          </h2>
          {/* Exemple boutons : hiérarchie visuelle claire */}
          <Card>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <div style={{ flex: '1 1 100%', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, opacity: 0.6 }}>VARIANTE STANDARD</div>
              <Button variant="primary">Principal</Button>
              <Button variant="secondary">Secondaire</Button>
              <Button variant="ghost">Discret (Ghost)</Button>
              <Button variant="danger">Danger</Button>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginTop: '2rem' }}>
              <div style={{ flex: '1 1 100%', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, opacity: 0.6 }}>ÉTAT DÉSACTIVÉ</div>
              <Button variant="primary" disabled>Désactivé</Button>
              <Button variant="secondary" disabled>Désactivé</Button>
              <Button variant="danger" disabled>Désactivé</Button>
            </div>
          </Card>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📝</span> Formulaires & Champs
          </h2>
          <Card>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div>
                {/* Exemple champs : états standard */}
                <TextInput label="Nom complet" placeholder="Ex: Jean Valjean" />
                <SelectInput label="Alignement">
                  <option>Loyal</option>
                  <option>Neutre</option>
                  <option>Chaotique</option>
                </SelectInput>
              </div>
              <div>
                <TextInput label="Email (avec erreur)" defaultValue="invalid-email" error="Veuillez entrer une adresse email valide." />
                <TextInput label="Champ désactivé" defaultValue="Valeur fixe" disabled />
              </div>
            </div>
          </Card>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🗂️</span> Conteneurs & Panels
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <div style={{ marginBottom: '0.75rem', fontWeight: 600 }}>Card (Standard)</div>
              <Card>
                <h3 style={{ marginTop: 0 }}>Titre de la carte</h3>
                <p>La carte standard utilise une bordure légère et un fond de surface. Elle est idéale pour le contenu principal.</p>
                <Button variant="secondary" fullWidth>Action</Button>
              </Card>
            </div>
            <div>
              <div style={{ marginBottom: '0.75rem', fontWeight: 600 }}>Section (Secondaire / Accent)</div>
              <Card variant="section">
                <h3 style={{ marginTop: 0 }}>Titre de section</h3>
                <p>Le variant section utilise un fond légèrement grisé/accentué pour se détacher du fond de la page ou d'une carte.</p>
                <Button variant="ghost" fullWidth>Action discrète</Button>
              </Card>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🛡️</span> Propositions de Design (Dark Mode doux)
          </h2>
          {/* Exemple dark mode doux : fond #111827, surface #1f2937, border #374151 */}
          <div style={{ 
            background: '#111827', 
            color: '#f9fafb', 
            padding: '2rem', 
            borderRadius: '16px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ color: '#f9fafb', marginTop: 0 }}>Simulation Mode Sombre Doux</h3>
            <p style={{ color: '#9ca3af' }}>Ceci est une simulation de ce à quoi pourrait ressembler un mode sombre plus "UI" que le noir pur.</p>
            
            <div style={{ 
              background: '#1f2937', 
              padding: '1.5rem', 
              borderRadius: '12px', 
              border: '1px solid #374151',
              marginTop: '1.5rem'
            }}>
              <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Surface de carte en mode sombre</div>
              <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>Les contrastes sont plus doux et les bordures moins agressives.</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button style={{ 
                  background: '#3b82f6', 
                  color: 'white', 
                  border: 'none', 
                  padding: '0.6rem 1.2rem', 
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                  Bouton Primaire
                </button>
                <button style={{ 
                  background: 'transparent', 
                  color: '#f9fafb', 
                  border: '1px solid #4b5563', 
                  padding: '0.6rem 1.2rem', 
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                  Bouton Secondaire
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
