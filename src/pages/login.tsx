import React from 'react';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { createSupabaseBrowserClient } from '../lib/supabase';
import { getAuthUser, saveAuthUser } from '../lib/auth';
import { Button, TextInput, SelectInput, Card } from '../components/ui';

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
        <Layout title="Connexion">
            <main className="app-page-main">
                <div className="app-container-sm">
                    <Card>
                        <h1 style={{ marginTop: 0 }}>Connexion</h1>
                        <p className="app-muted">Choisis ton nom puis entre ton mot de passe.</p>

                        <form onSubmit={handleSubmit} className="app-stack">
                            <SelectInput
                                label="Nom"
                                id="player-name"
                                value={selectedName}
                                onChange={(e) => setSelectedName(e.target.value)}
                                disabled={loadingPlayers || submitting}
                            >
                                <option value="">Sélectionner…</option>
                                {players.map((player) => (
                                    <option key={player.id} value={player.name}>
                                        {player.name}
                                    </option>
                                ))}
                            </SelectInput>

                            <TextInput
                                label="Mot de passe"
                                id="player-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={submitting}
                            />

                            <Button type="submit" variant="primary" fullWidth disabled={loadingPlayers || submitting}>
                                {submitting ? 'Connexion…' : 'Se connecter'}
                            </Button>
                        </form>

                        {error && <p className="alert error">{error}</p>}
                    </Card>
                </div>
            </main>
        </Layout>
    );
}