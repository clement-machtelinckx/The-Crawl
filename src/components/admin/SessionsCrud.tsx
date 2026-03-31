import React from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { SessionItem } from './types';

type SessionsCrudProps = {
    supabase: SupabaseClient;
};

type SessionFormState = {
    title: string;
    game: string;
    starts_at: string;
    location: string;
    note: string;
    status: string;
};

const initialForm: SessionFormState = {
    title: '',
    game: '',
    starts_at: '',
    location: '',
    note: '',
    status: 'open',
};

export default function SessionsCrud({ supabase }: SessionsCrudProps) {
    const [sessions, setSessions] = React.useState<SessionItem[]>([]);
    const [form, setForm] = React.useState<SessionFormState>(initialForm);
    const [editingId, setEditingId] = React.useState<number | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    const loadSessions = React.useCallback(async () => {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from('sessions')
            .select('*')
            .order('starts_at', { ascending: true });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        setSessions((data ?? []) as SessionItem[]);
        setLoading(false);
    }, [supabase]);

    React.useEffect(() => {
        void loadSessions();
    }, [loadSessions]);

    function resetForm() {
        setForm(initialForm);
        setEditingId(null);
        setError(null);
        setSuccess(null);
    }

    function formatDateTimeLocal(value: string): string {
        if (!value) return '';
        const date = new Date(value);
        const offset = date.getTimezoneOffset();
        const local = new Date(date.getTime() - offset * 60_000);
        return local.toISOString().slice(0, 16);
    }

    function startEdit(session: SessionItem) {
        setEditingId(session.id);
        setForm({
            title: session.title,
            game: session.game ?? '',
            starts_at: formatDateTimeLocal(session.starts_at),
            location: session.location ?? '',
            note: session.note ?? '',
            status: session.status,
        });
        setError(null);
        setSuccess(null);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(null);

        if (!form.title.trim()) {
            setError('Le titre est obligatoire.');
            setSaving(false);
            return;
        }

        if (!form.starts_at) {
            setError('La date est obligatoire.');
            setSaving(false);
            return;
        }

        const payload = {
            title: form.title.trim(),
            game: form.game.trim() || null,
            starts_at: new Date(form.starts_at).toISOString(),
            location: form.location.trim() || null,
            note: form.note.trim() || null,
            status: form.status,
        };

        if (editingId === null) {
            const { error } = await supabase.from('sessions').insert(payload);

            if (error) {
                setError(error.message);
                setSaving(false);
                return;
            }

            setSuccess('Session créée.');
            resetForm();
            await loadSessions();
            setSaving(false);
            return;
        }

        const { error } = await supabase
            .from('sessions')
            .update(payload)
            .eq('id', editingId);

        if (error) {
            setError(error.message);
            setSaving(false);
            return;
        }

        setSuccess('Session mise à jour.');
        resetForm();
        await loadSessions();
        setSaving(false);
    }

    async function handleDelete(sessionId: number) {
        const confirmed = window.confirm('Supprimer cette session ?');
        if (!confirmed) return;

        setError(null);
        setSuccess(null);

        const { error } = await supabase.from('sessions').delete().eq('id', sessionId);

        if (error) {
            setError(error.message);
            return;
        }

        if (editingId === sessionId) {
            resetForm();
        }

        setSuccess('Session supprimée.');
        await loadSessions();
    }

    return (
        <section style={sectionStyle}>
            <div style={headerRowStyle}>
                <h2 style={{ margin: 0 }}>Sessions</h2>
                <button type="button" onClick={resetForm} style={secondaryButtonStyle}>
                    Nouvelle
                </button>
            </div>

            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={fieldStyle}>
                    <label htmlFor="session-title">Titre</label>
                    <input
                        id="session-title"
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                        style={inputStyle}
                        placeholder="Ex: Prochaine session DCC"
                    />
                </div>

                <div style={fieldStyle}>
                    <label htmlFor="session-game">Campagne / jeu</label>
                    <input
                        id="session-game"
                        type="text"
                        value={form.game}
                        onChange={(e) => setForm((prev) => ({ ...prev, game: e.target.value }))}
                        style={inputStyle}
                        placeholder="Ex: DCC"
                    />
                </div>

                <div style={fieldStyle}>
                    <label htmlFor="session-starts-at">Date et heure</label>
                    <input
                        id="session-starts-at"
                        type="datetime-local"
                        value={form.starts_at}
                        onChange={(e) => setForm((prev) => ({ ...prev, starts_at: e.target.value }))}
                        style={inputStyle}
                    />
                </div>

                <div style={fieldStyle}>
                    <label htmlFor="session-location">Lieu</label>
                    <input
                        id="session-location"
                        type="text"
                        value={form.location}
                        onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                        style={inputStyle}
                        placeholder="Ex: Chez Yazii"
                    />
                </div>

                <div style={fieldStyle}>
                    <label htmlFor="session-status">Statut</label>
                    <select
                        id="session-status"
                        value={form.status}
                        onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                        style={inputStyle}
                    >
                        <option value="draft">Brouillon</option>
                        <option value="open">Ouverte</option>
                        <option value="closed">Fermée</option>
                        <option value="archived">Archivée</option>
                    </select>
                </div>

                <div style={fieldStyle}>
                    <label htmlFor="session-note">Note</label>
                    <textarea
                        id="session-note"
                        value={form.note}
                        onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
                        style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }}
                        placeholder="Petite note facultative"
                    />
                </div>

                <div style={actionsStyle}>
                    <button type="submit" disabled={saving} style={primaryButtonStyle}>
                        {saving ? 'Enregistrement…' : editingId === null ? 'Créer la session' : 'Mettre à jour'}
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
                    <p>Chargement des sessions…</p>
                ) : sessions.length === 0 ? (
                    <p>Aucune session pour le moment.</p>
                ) : (
                    <div style={listStyle}>
                        {sessions.map((session) => (
                            <article key={session.id} style={cardStyle}>
                                <div>
                                    <strong>{session.title}</strong>
                                    <div style={metaStyle}>
                                        <span>{session.game ?? 'Sans campagne'}</span>
                                        <span>{new Date(session.starts_at).toLocaleString()}</span>
                                        <span>{session.location ?? 'Lieu non défini'}</span>
                                        <span>Statut : {session.status}</span>
                                    </div>
                                    {session.note && <p style={{ marginTop: '0.5rem' }}>{session.note}</p>}
                                </div>

                                <div style={cardActionsStyle}>
                                    <button type="button" onClick={() => startEdit(session)} style={secondaryButtonStyle}>
                                        Modifier
                                    </button>
                                    <button type="button" onClick={() => void handleDelete(session.id)} style={dangerButtonStyle}>
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
    width: '100%',
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
    alignItems: 'flex-start',
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