import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Player, SessionItem } from './types';

type Props = {
    supabase: SupabaseClient;
};

function formatSessionDate(value: string) {
    return new Date(value).toLocaleString('fr-FR', {
        dateStyle: 'full',
        timeStyle: 'short',
    });
}

function generateToken() {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

export default function PlayerMessagesAdmin({ supabase }: Props) {
    const { siteConfig } = useDocusaurusContext();

    const siteUrl = siteConfig.url?.replace(/\/$/, '') ?? '';
    const baseUrl = siteConfig.baseUrl ?? '/';

    const [players, setPlayers] = React.useState<Player[]>([]);
    const [sessionItem, setSessionItem] = React.useState<SessionItem | null>(null);
    const [template, setTemplate] = React.useState(
        `Salut {name} 👋

Prochaine session : {title}
Date : {date}
Lieu : {location}

Réponds directement ici :
{link}`
    );

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    const loadData = React.useCallback(async () => {
        setLoading(true);
        setError(null);

        const { data: playersData, error: playersError } = await supabase
            .from('players')
            .select('*')
            .eq('is_active', true)
            .order('name', { ascending: true });

        if (playersError) {
            setError(playersError.message);
            setLoading(false);
            return;
        }

        const { data: sessionData, error: sessionError } = await supabase
            .from('sessions')
            .select('*')
            .eq('status', 'open')
            .gte('starts_at', new Date().toISOString())
            .order('starts_at', { ascending: true })
            .limit(1)
            .maybeSingle();

        if (sessionError) {
            setError(sessionError.message);
            setLoading(false);
            return;
        }

        setPlayers((playersData ?? []) as Player[]);
        setSessionItem((sessionData as SessionItem | null) ?? null);
        setLoading(false);
    }, [supabase]);

    React.useEffect(() => {
        void loadData();
    }, [loadData]);

    async function ensureToken(player: Player) {
        if (player.login_token) return player.login_token;

        const token = generateToken();

        const { error } = await supabase
            .from('players')
            .update({ login_token: token })
            .eq('id', player.id);

        if (error) {
            throw new Error(error.message);
        }

        setPlayers((prev) =>
            prev.map((item) =>
                item.id === player.id ? { ...item, login_token: token } : item
            )
        );

        return token;
    }

    async function generateMissingTokens() {
        setError(null);
        setSuccess(null);

        try {
            for (const player of players) {
                if (!player.login_token) {
                    await ensureToken(player);
                }
            }

            setSuccess('Tous les liens manquants ont été générés.');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue.');
        }
    }

    function buildLoginLink(token: string) {
        return `${siteUrl}${baseUrl}connexion-directe?token=${encodeURIComponent(token)}`;
    }

    function buildMessage(player: Player) {
        if (!sessionItem || !player.login_token) return '';

        const link = buildLoginLink(player.login_token);

        return template
            .replaceAll('{name}', player.name)
            .replaceAll('{title}', sessionItem.title)
            .replaceAll('{date}', formatSessionDate(sessionItem.starts_at))
            .replaceAll('{location}', sessionItem.location ?? 'Non défini')
            .replaceAll('{link}', link);
    }

    async function handleCopyMessage(player: Player) {
        setError(null);
        setSuccess(null);

        try {
            const token = await ensureToken(player);
            const hydratedPlayer = { ...player, login_token: token };
            const message = buildMessage(hydratedPlayer);

            await navigator.clipboard.writeText(message);
            setSuccess(`Message copié pour ${player.name}.`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue.');
        }
    }

    async function handleCopyLink(player: Player) {
        setError(null);
        setSuccess(null);

        try {
            const token = await ensureToken(player);
            const link = buildLoginLink(token);

            await navigator.clipboard.writeText(link);
            setSuccess(`Lien copié pour ${player.name}.`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue.');
        }
    }

    return (
        <section style={sectionStyle}>
            <div style={headerRowStyle}>
                <div>
                    <h2 style={{ margin: 0 }}>Messages joueurs</h2>
                    <p style={{ margin: '0.4rem 0 0', opacity: 0.8 }}>
                        Génère un message identique avec lien perso de connexion directe.
                    </p>
                </div>

                <button type="button" onClick={() => void generateMissingTokens()} style={secondaryButtonStyle}>
                    Générer les liens manquants
                </button>
            </div>

            {!sessionItem && !loading && (
                <p style={{ marginTop: '1rem' }}>
                    Aucune session ouverte à venir. Crée d’abord une session.
                </p>
            )}

            <div style={{ marginTop: '1rem' }}>
                <label htmlFor="message-template" style={{ display: 'block', marginBottom: '0.4rem' }}>
                    Modèle du message
                </label>
                <textarea
                    id="message-template"
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    style={textareaStyle}
                />
                <p style={helperStyle}>
                    Variables disponibles : {'{name}'} {'{title}'} {'{date}'} {'{location}'} {'{link}'}
                </p>
            </div>

            {error && <p style={errorStyle}>{error}</p>}
            {success && <p style={successStyle}>{success}</p>}

            <div style={{ marginTop: '1rem' }}>
                {loading ? (
                    <p>Chargement…</p>
                ) : players.length === 0 ? (
                    <p>Aucun joueur actif.</p>
                ) : (
                    <div style={listStyle}>
                        {players.map((player) => {
                            const link = player.login_token ? buildLoginLink(player.login_token) : null;

                            return (
                                <article key={player.id} style={cardStyle}>
                                    <div style={{ flex: 1 }}>
                                        <strong>{player.name}</strong>
                                        <div style={metaStyle}>
                                            <span>{player.login_token ? 'Lien prêt' : 'Pas encore de lien'}</span>
                                        </div>

                                        {link && (
                                            <div style={linkBoxStyle}>
                                                <code style={codeStyle}>{link}</code>
                                            </div>
                                        )}
                                    </div>

                                    <div style={actionsStyle}>
                                        <button
                                            type="button"
                                            onClick={() => void handleCopyLink(player)}
                                            style={secondaryButtonStyle}
                                            disabled={!sessionItem}
                                        >
                                            Copier le lien
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => void handleCopyMessage(player)}
                                            style={primaryButtonStyle}
                                            disabled={!sessionItem}
                                        >
                                            Copier le message
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
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
    alignItems: 'flex-start',
    gap: '1rem',
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
    gap: '1rem',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
};

const actionsStyle: React.CSSProperties = {
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

const textareaStyle: React.CSSProperties = {
    width: '100%',
    minHeight: 180,
    padding: '0.75rem',
    borderRadius: 8,
    border: '1px solid var(--ifm-color-emphasis-300)',
    background: 'var(--ifm-background-color)',
    resize: 'vertical',
};

const helperStyle: React.CSSProperties = {
    marginTop: '0.4rem',
    fontSize: '0.9rem',
    opacity: 0.75,
};

const linkBoxStyle: React.CSSProperties = {
    marginTop: '0.6rem',
    padding: '0.6rem',
    borderRadius: 8,
    border: '1px solid var(--ifm-color-emphasis-200)',
    overflowX: 'auto',
};

const codeStyle: React.CSSProperties = {
    whiteSpace: 'nowrap',
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

const errorStyle: React.CSSProperties = {
    color: '#b42318',
    marginTop: '1rem',
};

const successStyle: React.CSSProperties = {
    color: '#027a48',
    marginTop: '1rem',
};