import React from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Player } from './types';

type PlayersCrudProps = {
    supabase: SupabaseClient;
};

type PlayerFormState = {
    name: string;
    password_hash: string;
    is_admin: boolean;
    is_active: boolean;
};

const initialForm: PlayerFormState = {
    name: '',
    password_hash: '',
    is_admin: false,
    is_active: true,
};

export default function PlayersCrud({ supabase }: PlayersCrudProps) {
    const [players, setPlayers] = React.useState<Player[]>([]);
    const [form, setForm] = React.useState<PlayerFormState>(initialForm);
    const [editingId, setEditingId] = React.useState<number | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    const loadPlayers = React.useCallback(async () => {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from('players')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        setPlayers((data ?? []) as Player[]);
        setLoading(false);
    }, [supabase]);

    React.useEffect(() => {
        void loadPlayers();
    }, [loadPlayers]);

    function resetForm() {
        setForm(initialForm);
        setEditingId(null);
        setSuccess(null);
        setError(null);
    }

    function startEdit(player: Player) {
        setEditingId(player.id);
        setForm({
            name: player.name,
            password_hash: player.password_hash,
            is_admin: player.is_admin,
            is_active: player.is_active,
        });
        setSuccess(null);
        setError(null);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(null);

        if (!form.name.trim()) {
            setError('Le nom est obligatoire.');
            setSaving(false);
            return;
        }

        if (!form.password_hash.trim()) {
            setError('Le mot de passe est obligatoire.');
            setSaving(false);
            return;
        }

        if (editingId === null) {
            const { error } = await supabase.from('players').insert({
                name: form.name.trim(),
                password_hash: form.password_hash.trim(),
                is_admin: form.is_admin,
                is_active: form.is_active,
            });

            if (error) {
                setError(error.message);
                setSaving(false);
                return;
            }

            setSuccess('Joueur créé.');
            resetForm();
            await loadPlayers();
            setSaving(false);
            return;
        }

        const { error } = await supabase
            .from('players')
            .update({
                name: form.name.trim(),
                password_hash: form.password_hash.trim(),
                is_admin: form.is_admin,
                is_active: form.is_active,
            })
            .eq('id', editingId);

        if (error) {
            setError(error.message);
            setSaving(false);
            return;
        }

        setSuccess('Joueur mis à jour.');
        resetForm();
        await loadPlayers();
        setSaving(false);
    }

    async function handleDelete(playerId: number) {
        const confirmed = window.confirm('Supprimer ce joueur ?');
        if (!confirmed) return;

        setError(null);
        setSuccess(null);

        const { error } = await supabase.from('players').delete().eq('id', playerId);

        if (error) {
            setError(error.message);
            return;
        }

        if (editingId === playerId) {
            resetForm();
        }

        setSuccess('Joueur supprimé.');
        await loadPlayers();
    }

    return (
        <section style={sectionStyle}>
            <div style={headerRowStyle}>
                <h2 style={{ margin: 0 }}>Joueurs</h2>
                <button type="button" onClick={resetForm} style={secondaryButtonStyle}>
                    Nouveau
                </button>
            </div>

            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={fieldStyle}>
                    <label htmlFor="player-name">Nom</label>
                    <input
                        id="player-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                        style={inputStyle}
                        placeholder="Ex: Yazii"
                    />
                </div>

                <div style={fieldStyle}>
                    <label htmlFor="player-password">Mot de passe</label>
                    <input
                        id="player-password"
                        type="text"
                        value={form.password_hash}
                        onChange={(e) => setForm((prev) => ({ ...prev, password_hash: e.target.value }))}
                        style={inputStyle}
                        placeholder="Mot de passe V1"
                    />
                </div>

                <div style={checkboxRowStyle}>
                    <label style={checkboxLabelStyle}>
                        <input
                            type="checkbox"
                            checked={form.is_admin}
                            onChange={(e) => setForm((prev) => ({ ...prev, is_admin: e.target.checked }))}
                        />
                        Admin
                    </label>

                    <label style={checkboxLabelStyle}>
                        <input
                            type="checkbox"
                            checked={form.is_active}
                            onChange={(e) => setForm((prev) => ({ ...prev, is_active: e.target.checked }))}
                        />
                        Actif
                    </label>
                </div>

                <div style={actionsStyle}>
                    <button type="submit" disabled={saving} style={primaryButtonStyle}>
                        {saving ? 'Enregistrement…' : editingId === null ? 'Créer le joueur' : 'Mettre à jour'}
                    </button>

                    {editingId !== null && (
                        <button type="button" onClick={resetForm} style={secondaryButtonStyle}>
                            Annuler
                        </button>
                    )}
                </div>
            </form>

            {error && <p style={errorStyle}>{error}</p>}
            {success && <p style={successStyle}>{success}</p>}

            <div style={{ marginTop: '1.5rem' }}>
                {loading ? (
                    <p>Chargement des joueurs…</p>
                ) : players.length === 0 ? (
                    <p>Aucun joueur pour le moment.</p>
                ) : (
                    <div style={listStyle}>
                        {players.map((player) => (
                            <article key={player.id} style={cardStyle}>
                                <div>
                                    <strong>{player.name}</strong>
                                    <div style={metaStyle}>
                                        <span>{player.is_admin ? 'Admin' : 'Joueur'}</span>
                                        <span>{player.is_active ? 'Actif' : 'Inactif'}</span>
                                    </div>
                                </div>

                                <div style={cardActionsStyle}>
                                    <button type="button" onClick={() => startEdit(player)} style={secondaryButtonStyle}>
                                        Modifier
                                    </button>
                                    <button type="button" onClick={() => void handleDelete(player.id)} style={dangerButtonStyle}>
                                        Supprimer
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

const sectionStyle: React.CSSProperties = {
    border: '1px solid var(--ifm-toc-border-color)',
    borderRadius: 12,
    padding: '1rem',
    background: 'var(--ifm-background-surface-color)',
};

const headerRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
};

const formStyle: React.CSSProperties = {
    display: 'grid',
    gap: '1rem',
    marginTop: '1rem',
};

const fieldStyle: React.CSSProperties = {
    display: 'grid',
    gap: '0.35rem',
};

const inputStyle: React.CSSProperties = {
    padding: '0.75rem',
    borderRadius: 8,
    border: '1px solid var(--ifm-color-emphasis-300)',
    background: 'var(--ifm-background-color)',
};

const checkboxRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
};

const checkboxLabelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
};

const actionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
};

const listStyle: React.CSSProperties = {
    display: 'grid',
    gap: '0.75rem',
};

const cardStyle: React.CSSProperties = {
    border: '1px solid var(--ifm-color-emphasis-200)',
    borderRadius: 10,
    padding: '0.9rem',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    alignItems: 'center',
};

const cardActionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
};

const metaStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '0.35rem',
    fontSize: '0.9rem',
    opacity: 0.8,
    flexWrap: 'wrap',
};

const primaryButtonStyle: React.CSSProperties = {
    padding: '0.7rem 1rem',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
};

const secondaryButtonStyle: React.CSSProperties = {
    padding: '0.7rem 1rem',
    borderRadius: 8,
    border: '1px solid var(--ifm-color-emphasis-300)',
    background: 'transparent',
    cursor: 'pointer',
};

const dangerButtonStyle: React.CSSProperties = {
    padding: '0.7rem 1rem',
    borderRadius: 8,
    border: '1px solid #b42318',
    background: 'transparent',
    color: '#b42318',
    cursor: 'pointer',
};

const errorStyle: React.CSSProperties = {
    color: '#b42318',
    marginTop: '1rem',
};

const successStyle: React.CSSProperties = {
    color: '#027a48',
    marginTop: '1rem',
};