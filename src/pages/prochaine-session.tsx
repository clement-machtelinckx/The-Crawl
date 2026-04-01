import React from 'react';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { createSupabaseBrowserClient } from '../lib/supabase';
import { clearAuthUser, getAuthUser, type AuthUser } from '../lib/auth';
import AuthHeaderButton from '../components/AuthHeaderButton';
import { Button, TextareaInput, Card } from '../components/ui';

type CustomFields = {
    supabaseUrl?: string;
    supabasePublishableKey?: string;
};

type SessionItem = {
    id: number;
    title: string;
    game: string | null;
    starts_at: string;
    location: string | null;
    note: string | null;
    status: string;
};

type Player = {
    id: number;
    name: string;
    is_active: boolean;
};

type Availability = {
    id: number;
    session_id: number;
    player_id: number;
    response: 'yes' | 'no' | 'maybe';
    comment: string | null;
    updated_at: string;
};

type AvailabilityWithPlayer = Availability & {
    player: Player | null;
};

export default function ProchaineSessionPage() {
    const history = useHistory();
    const { siteConfig } = useDocusaurusContext();

    const supabase = React.useMemo(
        () =>
            createSupabaseBrowserClient(siteConfig.customFields as CustomFields),
        [siteConfig.customFields]
    );

    const [authUser, setAuthUser] = React.useState<AuthUser | null>(null);
    const [ready, setReady] = React.useState(false);

    const [sessionItem, setSessionItem] = React.useState<SessionItem | null>(null);
    const [players, setPlayers] = React.useState<Player[]>([]);
    const [availabilities, setAvailabilities] = React.useState<AvailabilityWithPlayer[]>([]);

    const [currentResponse, setCurrentResponse] = React.useState<'yes' | 'no' | 'maybe' | null>(null);
    const [comment, setComment] = React.useState('');

    const [loading, setLoading] = React.useState(true);
    const [savingResponse, setSavingResponse] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    React.useEffect(() => {
        const user = getAuthUser();

        if (!user) {
            history.replace('/login');
            return;
        }

        if (!user.is_active) {
            clearAuthUser();
            history.replace('/login');
            return;
        }

        setAuthUser(user);
        setReady(true);
    }, [history]);

    const loadPageData = React.useCallback(async () => {
        if (!authUser) return;

        setLoading(true);
        setError(null);
        setSuccess(null);

        const nowIso = new Date().toISOString();

        const { data: nextSession, error: sessionError } = await supabase
            .from('sessions')
            .select('*')
            .eq('status', 'open')
            .gte('starts_at', nowIso)
            .order('starts_at', { ascending: true })
            .limit(1)
            .maybeSingle();

        if (sessionError) {
            setError(sessionError.message);
            setLoading(false);
            return;
        }

        setSessionItem((nextSession as SessionItem | null) ?? null);

        const { data: activePlayers, error: playersError } = await supabase
            .from('players')
            .select('id, name, is_active')
            .eq('is_active', true)
            .order('name', { ascending: true });

        if (playersError) {
            setError(playersError.message);
            setLoading(false);
            return;
        }

        const normalizedPlayers = (activePlayers ?? []) as Player[];
        setPlayers(normalizedPlayers);

        if (!nextSession) {
            setAvailabilities([]);
            setCurrentResponse(null);
            setComment('');
            setLoading(false);
            return;
        }

        const { data: rawAvailabilities, error: availabilitiesError } = await supabase
            .from('availabilities')
            .select('*')
            .eq('session_id', nextSession.id)
            .order('updated_at', { ascending: false });

        if (availabilitiesError) {
            setError(availabilitiesError.message);
            setLoading(false);
            return;
        }

        const normalizedAvailabilities = ((rawAvailabilities ?? []) as Availability[]).map((item) => ({
            ...item,
            player: normalizedPlayers.find((player) => player.id === item.player_id) ?? null,
        }));

        setAvailabilities(normalizedAvailabilities);

        const myAvailability = normalizedAvailabilities.find(
            (item) => item.player_id === authUser.id
        );

        if (myAvailability) {
            setCurrentResponse(myAvailability.response);
            setComment(myAvailability.comment ?? '');
        } else {
            setCurrentResponse(null);
            setComment('');
        }

        setLoading(false);
    }, [authUser, supabase]);

    React.useEffect(() => {
        if (!authUser) return;
        void loadPageData();
    }, [authUser, loadPageData]);

    async function handleSaveResponse(response: 'yes' | 'no' | 'maybe') {
        if (!authUser || !sessionItem) return;

        setSavingResponse(true);
        setError(null);
        setSuccess(null);

        const existing = availabilities.find((item) => item.player_id === authUser.id);

        if (existing) {
            const { error } = await supabase
                .from('availabilities')
                .update({
                    response,
                    comment: comment.trim() || null,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', existing.id);

            if (error) {
                setError(error.message);
                setSavingResponse(false);
                return;
            }
        } else {
            const { error } = await supabase
                .from('availabilities')
                .insert({
                    session_id: sessionItem.id,
                    player_id: authUser.id,
                    response,
                    comment: comment.trim() || null,
                });

            if (error) {
                setError(error.message);
                setSavingResponse(false);
                return;
            }
        }

        setCurrentResponse(response);
        setSuccess('Réponse enregistrée.');
        await loadPageData();
        setSavingResponse(false);
    }

    function handleLogout() {
        clearAuthUser();
        history.push('/login');
    }

    const pendingPlayers = players.filter(
        (player) => !availabilities.some((item) => item.player_id === player.id)
    );

    const yesList = availabilities.filter((item) => item.response === 'yes');
    const maybeList = availabilities.filter((item) => item.response === 'maybe');
    const noList = availabilities.filter((item) => item.response === 'no');

    if (!ready) {
        return (
            <Layout title="Prochaine session">
                <main className="app-page-main">
                    <div className="app-container">
                        <p>Chargement…</p>
                    </div>
                </main>
            </Layout>
        );
    }

    return (
        <Layout title="Prochaine session">
            <main className="app-page-main">
                <div className="app-container app-grid">
                    <header className="app-row-between">
                        <div>
                            <h1 style={{ marginBottom: '0.4rem' }}>Prochaine session</h1>
                            <p className="app-muted" style={{ margin: 0 }}>
                                Connecté en tant que <strong>{authUser?.name}</strong>
                            </p>
                        </div>

                        <div className="app-row">
                            <AuthHeaderButton />
                        </div>
                    </header>

                    {loading ? (
                        <Card variant="section">
                            <p>Chargement de la session…</p>
                        </Card>
                    ) : !sessionItem ? (
                        <Card variant="section">
                            <h2 style={{ marginTop: 0 }}>Aucune session ouverte</h2>
                            <p>Il n’y a pas encore de prochaine session planifiée.</p>
                        </Card>
                    ) : (
                        <>
                            <Card style={{ borderRadius: 16 }}>
                                <div className="app-grid">
                                    <div>
                                        <p style={{ margin: '0 0 0.35rem', fontSize: '0.9rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Session suivante</p>
                                        <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>{sessionItem.title}</h2>
                                        <div className="app-stack" style={{ gap: '0.4rem' }}>
                                            <span><strong>Jeu :</strong> {sessionItem.game ?? 'Non défini'}</span>
                                            <span><strong>Date :</strong> {new Date(sessionItem.starts_at).toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' })}</span>
                                            <span><strong>Lieu :</strong> {sessionItem.location ?? 'Non défini'}</span>
                                            <span><strong>Statut :</strong> {sessionItem.status}</span>
                                        </div>
                                    </div>
                                </div>

                                {sessionItem.note && (
                                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--app-border-color)' }}>
                                        <strong>Note :</strong>
                                        <p style={{ margin: '0.4rem 0 0' }}>{sessionItem.note}</p>
                                    </div>
                                )}
                            </Card>

                            <Card variant="section">
                                <h2 style={{ marginTop: 0 }}>Ma réponse</h2>

                                <div style={{ marginBottom: '1rem' }} className="app-muted">
                                    <span>
                                        <strong>Réponse actuelle :</strong> {labelForResponse(currentResponse)}
                                    </span>
                                </div>

                                <div className="app-row">
                                    <Button
                                        variant={currentResponse === 'yes' ? 'primary' : 'secondary'}
                                        onClick={() => void handleSaveResponse('yes')}
                                        disabled={savingResponse}
                                    >
                                        Oui
                                    </Button>

                                    <Button
                                        variant={currentResponse === 'maybe' ? 'primary' : 'secondary'}
                                        onClick={() => void handleSaveResponse('maybe')}
                                        disabled={savingResponse}
                                    >
                                        Peut-être
                                    </Button>

                                    <Button
                                        variant={currentResponse === 'no' ? 'primary' : 'secondary'}
                                        onClick={() => void handleSaveResponse('no')}
                                        disabled={savingResponse}
                                    >
                                        Non
                                    </Button>
                                </div>

                                <div style={{ marginTop: '1rem' }}>
                                    <TextareaInput
                                        label="Commentaire optionnel"
                                        id="response-comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Ex: je serai là vers 20h30"
                                    />
                                    <p className="app-text-small app-muted" style={{ marginTop: '0.4rem' }}>
                                        Le commentaire sera enregistré lors du prochain clic sur Oui / Non / Peut-être.
                                    </p>
                                </div>

                                {error && <p className="alert error">{error}</p>}
                                {success && <p className="alert success">{success}</p>}
                            </Card>

                            <div className="app-grid">
                                <ResponseColumn title={`Oui (${yesList.length})`} items={yesList} />
                                <ResponseColumn title={`Peut-être (${maybeList.length})`} items={maybeList} />
                                <ResponseColumn title={`Non (${noList.length})`} items={noList} />
                            </div>

                            <Card variant="section">
                                <h2 style={{ marginTop: 0 }}>En attente ({pendingPlayers.length})</h2>

                                {pendingPlayers.length === 0 ? (
                                    <p>Tout le monde a répondu.</p>
                                ) : (
                                    <ul className="app-grid" style={{ margin: 0, paddingLeft: '1.2rem', gap: '0.45rem' }}>
                                        {pendingPlayers.map((player) => (
                                            <li key={player.id}>{player.name}</li>
                                        ))}
                                    </ul>
                                )}
                            </Card>
                        </>
                    )}
                </div>
            </main>
        </Layout>
    );
}

function ResponseColumn({
                            title,
                            items,
                        }: {
    title: string;
    items: AvailabilityWithPlayer[];
}) {
    return (
        <Card variant="section">
            <h2 style={{ marginTop: 0 }}>{title}</h2>

            {items.length === 0 ? (
                <p>Aucune réponse.</p>
            ) : (
                <ul className="app-grid" style={{ margin: 0, paddingLeft: '1.2rem', gap: '0.45rem' }}>
                    {items.map((item) => (
                        <li key={item.id}>
                            <strong>{item.player?.name ?? `Joueur #${item.player_id}`}</strong>
                            {item.comment ? ` — ${item.comment}` : ''}
                        </li>
                    ))}
                </ul>
            )}
        </Card>
    );
}

function labelForResponse(value: 'yes' | 'no' | 'maybe' | null) {
    if (value === 'yes') return 'Oui';
    if (value === 'no') return 'Non';
    if (value === 'maybe') return 'Peut-être';
    return 'Pas encore de réponse';
}
