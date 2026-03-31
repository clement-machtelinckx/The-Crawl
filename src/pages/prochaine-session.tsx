import React from 'react';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { createSupabaseBrowserClient } from '../lib/supabase';
import { clearAuthUser, getAuthUser, type AuthUser } from '../lib/auth';
import AuthHeaderButton from '../components/AuthHeaderButton';

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
                <main style={mainStyle}>
                    <div style={containerStyle}>
                        <p>Chargement…</p>
                    </div>
                </main>
            </Layout>
        );
    }

    return (
        <Layout title="Prochaine session">
            <main style={mainStyle}>
                <div style={containerStyle}>
                    <header style={headerStyle}>
                        <div>
                            <h1 style={{ marginBottom: '0.4rem' }}>Prochaine session</h1>
                            <p style={{ margin: 0, opacity: 0.8 }}>
                                Connecté en tant que <strong>{authUser?.name}</strong>
                            </p>

                        </div>

                        <div style={headerActionsStyle}>

                            <AuthHeaderButton />
                        </div>
                    </header>

                    {loading ? (
                        <section style={sectionStyle}>
                            <p>Chargement de la session…</p>
                        </section>
                    ) : !sessionItem ? (
                        <section style={sectionStyle}>
                            <h2 style={{ marginTop: 0 }}>Aucune session ouverte</h2>
                            <p>Il n’y a pas encore de prochaine session planifiée.</p>
                        </section>
                    ) : (
                        <>
                            <section style={heroCardStyle}>
                                <div style={heroTopStyle}>
                                    <div>
                                        <p style={eyebrowStyle}>Session suivante</p>
                                        <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>{sessionItem.title}</h2>
                                        <div style={metaGridStyle}>
                      <span>
                        <strong>Jeu :</strong> {sessionItem.game ?? 'Non défini'}
                      </span>
                                            <span>
                        <strong>Date :</strong>{' '}
                                                {new Date(sessionItem.starts_at).toLocaleString('fr-FR', {
                                                    dateStyle: 'full',
                                                    timeStyle: 'short',
                                                })}
                      </span>
                                            <span>
                        <strong>Lieu :</strong> {sessionItem.location ?? 'Non défini'}
                      </span>
                                            <span>
                        <strong>Statut :</strong> {sessionItem.status}
                      </span>
                                        </div>
                                    </div>
                                </div>

                                {sessionItem.note && (
                                    <div style={noteStyle}>
                                        <strong>Note :</strong>
                                        <p style={{ margin: '0.4rem 0 0' }}>{sessionItem.note}</p>
                                    </div>
                                )}
                            </section>

                            <section style={sectionStyle}>
                                <h2 style={{ marginTop: 0 }}>Ma réponse</h2>

                                <div style={currentResponseStyle}>
                  <span>
                    <strong>Réponse actuelle :</strong>{' '}
                      {labelForResponse(currentResponse)}
                  </span>
                                </div>

                                <div style={buttonRowStyle}>
                                    <button
                                        type="button"
                                        onClick={() => void handleSaveResponse('yes')}
                                        disabled={savingResponse}
                                        style={responseButtonStyle(currentResponse === 'yes')}
                                    >
                                        Oui
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => void handleSaveResponse('maybe')}
                                        disabled={savingResponse}
                                        style={responseButtonStyle(currentResponse === 'maybe')}
                                    >
                                        Peut-être
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => void handleSaveResponse('no')}
                                        disabled={savingResponse}
                                        style={responseButtonStyle(currentResponse === 'no')}
                                    >
                                        Non
                                    </button>
                                </div>

                                <div style={{ marginTop: '1rem' }}>
                                    <label htmlFor="response-comment" style={{ display: 'block', marginBottom: '0.4rem' }}>
                                        Commentaire optionnel
                                    </label>
                                    <textarea
                                        id="response-comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Ex: je serai là vers 20h30"
                                        style={textareaStyle}
                                    />
                                    <p style={helperTextStyle}>
                                        Le commentaire sera enregistré lors du prochain clic sur Oui / Non / Peut-être.
                                    </p>
                                </div>

                                {error && <p style={errorStyle}>{error}</p>}
                                {success && <p style={successStyle}>{success}</p>}
                            </section>

                            <section style={gridStyle}>
                                <ResponseColumn title={`Oui (${yesList.length})`} items={yesList} />
                                <ResponseColumn title={`Peut-être (${maybeList.length})`} items={maybeList} />
                                <ResponseColumn title={`Non (${noList.length})`} items={noList} />
                            </section>

                            <section style={sectionStyle}>
                                <h2 style={{ marginTop: 0 }}>En attente ({pendingPlayers.length})</h2>

                                {pendingPlayers.length === 0 ? (
                                    <p>Tout le monde a répondu.</p>
                                ) : (
                                    <ul style={simpleListStyle}>
                                        {pendingPlayers.map((player) => (
                                            <li key={player.id}>{player.name}</li>
                                        ))}
                                    </ul>
                                )}
                            </section>
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
        <section style={sectionStyle}>
            <h2 style={{ marginTop: 0 }}>{title}</h2>

            {items.length === 0 ? (
                <p>Aucune réponse.</p>
            ) : (
                <ul style={simpleListStyle}>
                    {items.map((item) => (
                        <li key={item.id}>
                            <strong>{item.player?.name ?? `Joueur #${item.player_id}`}</strong>
                            {item.comment ? ` — ${item.comment}` : ''}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

function labelForResponse(value: 'yes' | 'no' | 'maybe' | null) {
    if (value === 'yes') return 'Oui';
    if (value === 'no') return 'Non';
    if (value === 'maybe') return 'Peut-être';
    return 'Pas encore de réponse';
}

const mainStyle: React.CSSProperties = {
    padding: '1.25rem 1rem 3rem',
};

const containerStyle: React.CSSProperties = {
    maxWidth: 980,
    margin: '0 auto',
    display: 'grid',
    gap: '1rem',
};

const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
    flexWrap: 'wrap',
};

const headerActionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
};

const heroCardStyle: React.CSSProperties = {
    border: '1px solid var(--ifm-color-emphasis-200)',
    borderRadius: 16,
    padding: '1rem',
    background: 'var(--ifm-background-surface-color)',
};

const heroTopStyle: React.CSSProperties = {
    display: 'grid',
    gap: '0.75rem',
};

const eyebrowStyle: React.CSSProperties = {
    margin: '0 0 0.35rem',
    fontSize: '0.9rem',
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
};

const metaGridStyle: React.CSSProperties = {
    display: 'grid',
    gap: '0.4rem',
};

const noteStyle: React.CSSProperties = {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid var(--ifm-color-emphasis-200)',
};

const sectionStyle: React.CSSProperties = {
    border: '1px solid var(--ifm-color-emphasis-200)',
    borderRadius: 12,
    padding: '1rem',
    background: 'var(--ifm-background-surface-color)',
};

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gap: '1rem',
};

const buttonRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
};

const currentResponseStyle: React.CSSProperties = {
    marginBottom: '1rem',
    opacity: 0.85,
};

const textareaStyle: React.CSSProperties = {
    width: '100%',
    minHeight: 100,
    padding: '0.75rem',
    borderRadius: 8,
    border: '1px solid var(--ifm-color-emphasis-300)',
    background: 'var(--ifm-background-color)',
    resize: 'vertical',
};

const helperTextStyle: React.CSSProperties = {
    marginTop: '0.4rem',
    fontSize: '0.9rem',
    opacity: 0.75,
};

const simpleListStyle: React.CSSProperties = {
    margin: 0,
    paddingLeft: '1.2rem',
    display: 'grid',
    gap: '0.45rem',
};

const secondaryButtonStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    borderRadius: 10,
    border: '1px solid var(--ifm-color-emphasis-300)',
    background: 'transparent',
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

function responseButtonStyle(active: boolean): React.CSSProperties {
    return {
        padding: '0.9rem 1.1rem',
        borderRadius: 10,
        border: active ? '2px solid var(--ifm-color-primary)' : '1px solid var(--ifm-color-emphasis-300)',
        background: active ? 'var(--ifm-color-primary-lightest)' : 'transparent',
        cursor: 'pointer',
        fontWeight: 700,
        minWidth: 110,
    };
}