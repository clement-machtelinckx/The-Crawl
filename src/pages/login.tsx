import React from 'react';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { createSupabaseBrowserClient } from '../lib/supabase';
import { getAuthUser, saveAuthUser } from '../lib/auth';

type CustomFields = {
    supabaseUrl?: string;
    supabasePublishableKey?: string;
};

type PlayerRow = {
    id: number;
    name: string;
    password_hash: string;
    is_admin: boolean;
    is_active: boolean;
};

export default function LoginPage() {
    const history = useHistory();
    const { siteConfig } = useDocusaurusContext();

    const supabase = React.useMemo(
        () => createSupabaseBrowserClient(siteConfig.customFields as CustomFields),
        [siteConfig.customFields]
    );

    const [players, setPlayers] = React.useState<PlayerRow[]>([]);
    const [selectedName, setSelectedName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loadingPlayers, setLoadingPlayers] = React.useState(true);
    const [submitting, setSubmitting] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const existingUser = getAuthUser();
        if (existingUser) {
            history.push(existingUser.is_admin ? '/admin' : '/prochaine-session');
        }
    }, [history]);

    React.useEffect(() => {
        async function loadPlayers() {
            setLoadingPlayers(true);
            setError(null);

            const { data, error } = await supabase
                .from('players')
                .select('id, name, password_hash, is_admin, is_active')
                .eq('is_active', true)
                .order('name', { ascending: true });

            if (error) {
                setError(error.message);
                setLoadingPlayers(false);
                return;
            }

            setPlayers((data ?? []) as PlayerRow[]);
            setLoadingPlayers(false);
        }

        void loadPlayers();
    }, [supabase]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitting(true);
        setError(null);

        const player = players.find((item) => item.name === selectedName);

        if (!player) {
            setError('Joueur introuvable.');
            setSubmitting(false);
            return;
        }

        if (player.password_hash !== password) {
            setError('Mot de passe incorrect.');
            setSubmitting(false);
            return;
        }

        saveAuthUser({
            id: player.id,
            name: player.name,
            is_admin: player.is_admin,
            is_active: player.is_active,
        });

        history.push(player.is_admin ? '/admin' : '/prochaine-session');
    }

    return (
        <Layout title="Login">
            <main style={mainStyle}>
                <div style={cardStyle}>
                    <h1 style={{ marginTop: 0 }}>Connexion</h1>
                    <p>Choisis ton nom puis entre ton mot de passe.</p>

                    <form onSubmit={handleSubmit} style={formStyle}>
                        <div style={fieldStyle}>
                            <label htmlFor="player-name">Nom</label>
                            <select
                                id="player-name"
                                value={selectedName}
                                onChange={(e) => setSelectedName(e.target.value)}
                                style={inputStyle}
                                disabled={loadingPlayers || submitting}
                            >
                                <option value="">Sélectionner…</option>
                                {players.map((player) => (
                                    <option key={player.id} value={player.name}>
                                        {player.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={fieldStyle}>
                            <label htmlFor="player-password">Mot de passe</label>
                            <input
                                id="player-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={inputStyle}
                                disabled={submitting}
                            />
                        </div>

                        <button type="submit" style={buttonStyle} disabled={loadingPlayers || submitting}>
                            {submitting ? 'Connexion…' : 'Se connecter'}
                        </button>
                    </form>

                    {error && <p style={errorStyle}>{error}</p>}
                </div>
            </main>
        </Layout>
    );
}

const mainStyle: React.CSSProperties = {
    padding: '2rem 1rem',
};

const cardStyle: React.CSSProperties = {
    maxWidth: 420,
    margin: '0 auto',
    border: '1px solid var(--ifm-color-emphasis-200)',
    borderRadius: 12,
    padding: '1.25rem',
    background: 'var(--ifm-background-surface-color)',
};

const formStyle: React.CSSProperties = {
    display: 'grid',
    gap: '1rem',
};

const fieldStyle: React.CSSProperties = {
    display: 'grid',
    gap: '0.35rem',
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: 8,
    border: '1px solid var(--ifm-color-emphasis-300)',
    background: 'var(--ifm-background-color)',
};

const buttonStyle: React.CSSProperties = {
    padding: '0.8rem 1rem',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
};

const errorStyle: React.CSSProperties = {
    color: '#b42318',
    marginTop: '1rem',
};