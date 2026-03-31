import React from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { SessionItem } from './types';
import { Button, TextInput, SelectInput, TextareaInput, DateTimeInput, Card } from '../ui';

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
        <Card variant="section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <h2 style={{ margin: 0 }}>Sessions</h2>
                <Button type="button" variant="secondary" onClick={resetForm}>
                    Reset
                </Button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                <TextInput
                    label="Titre"
                    id="session-title"
                    value={form.title}
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Ex: Prochaine session DCC"
                />

                <TextInput
                    label="Campagne / jeu"
                    id="session-game"
                    value={form.game}
                    onChange={(e) => setForm((prev) => ({ ...prev, game: e.target.value }))}
                    placeholder="Ex: DCC"
                />

                <DateTimeInput
                    label="Date et heure"
                    id="session-starts-at"
                    value={form.starts_at}
                    onChange={(e) => setForm((prev) => ({ ...prev, starts_at: e.target.value }))}
                />

                <TextInput
                    label="Lieu"
                    id="session-location"
                    value={form.location}
                    onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Ex: Chez Yazii"
                />

                <SelectInput
                    label="Statut"
                    id="session-status"
                    value={form.status}
                    onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                >
                    <option value="draft">Brouillon</option>
                    <option value="open">Ouverte</option>
                    <option value="closed">Fermée</option>
                    <option value="archived">Archivée</option>
                </SelectInput>

                <TextareaInput
                    label="Note"
                    id="session-note"
                    value={form.note}
                    onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
                    placeholder="Petite note facultative"
                />

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Button type="submit" disabled={saving}>
                        {saving ? 'Enregistrement…' : editingId === null ? 'Créer la session' : 'Mettre à jour'}
                    </Button>

                    {editingId !== null && (
                        <Button type="button" variant="secondary" onClick={resetForm}>
                            Annuler
                        </Button>
                    )}
                </div>
            </form>

            {error && <p style={{ color: 'var(--app-color-error)', marginTop: '1rem' }}>{error}</p>}
            {success && <p style={{ color: 'var(--app-color-success)', marginTop: '1rem' }}>{success}</p>}

            <div style={{ marginTop: '1.5rem' }}>
                {loading ? (
                    <p>Chargement des sessions…</p>
                ) : sessions.length === 0 ? (
                    <p>Aucune session pour le moment.</p>
                ) : (
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {sessions.map((session) => (
                            <article key={session.id} style={{
                                border: '1px solid var(--ifm-color-emphasis-200)',
                                borderRadius: 10,
                                padding: '0.9rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '1rem',
                                alignItems: 'flex-start'
                            }}>
                                <div>
                                    <strong>{session.title}</strong>
                                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.35rem', fontSize: '0.9rem', opacity: 0.8, flexWrap: 'wrap' }}>
                                        <span>{session.game ?? 'Sans campagne'}</span>
                                        <span>{new Date(session.starts_at).toLocaleString()}</span>
                                        <span>{session.location ?? 'Lieu non défini'}</span>
                                        <span>Statut : {session.status}</span>
                                    </div>
                                    {session.note && <p style={{ marginTop: '0.5rem' }}>{session.note}</p>}
                                </div>

                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <Button variant="secondary" onClick={() => startEdit(session)}>
                                        Modifier
                                    </Button>
                                    <Button variant="danger" onClick={() => void handleDelete(session.id)}>
                                        Supprimer
                                    </Button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    );
}