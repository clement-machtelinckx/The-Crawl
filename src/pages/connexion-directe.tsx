import React from 'react';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { createSupabaseBrowserClient } from '../lib/supabase';
import { saveAuthUser } from '../lib/auth';

type CustomFields = {
    supabaseUrl?: string;
    supabasePublishableKey?: string;
};

type PlayerRow = {
    id: number;
    name: string;
    is_admin: boolean;
    is_active: boolean;
    login_token: string | null;
};

export default function ConnexionDirectePage() {
    const history = useHistory();
    const { siteConfig } = useDocusaurusContext();

    const supabase = React.useMemo(
        () => createSupabaseBrowserClient(siteConfig.customFields as CustomFields),
        [siteConfig.customFields]
    );

    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function run() {
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');

            if (!token) {
                setError('Lien invalide : token manquant.');
                return;
            }

            const { data, error } = await supabase
                .from('players')
                .select('id, name, is_admin, is_active, login_token')
                .eq('login_token', token)
                .eq('is_active', true)
                .maybeSingle();

            if (error) {
                setError(error.message);
                return;
            }

            const player = data as PlayerRow | null;

            if (!player) {
                setError('Lien invalide ou expiré.');
                return;
            }

            saveAuthUser({
                id: player.id,
                name: player.name,
                is_admin: player.is_admin,
                is_active: player.is_active,
            });

            history.replace('/prochaine-session');
        }

        void run();
    }, [history, supabase]);

    return (
        <Layout title="Connexion directe">
            <main style={mainStyle}>
                <div style={cardStyle}>
                    <h1 style={{ marginTop: 0 }}>Connexion directe</h1>
                    {error ? <p style={{ color: '#b42318' }}>{error}</p> : <p>Connexion en cours…</p>}
                </div>
            </main>
        </Layout>
    );
}

const mainStyle: React.CSSProperties = {
    padding: '2rem 1rem',
};

const cardStyle: React.CSSProperties = {
    maxWidth: 500,
    margin: '0 auto',
    border: '1px solid var(--ifm-color-emphasis-200)',
    borderRadius: 12,
    padding: '1.25rem',
    background: 'var(--ifm-background-surface-color)',
};