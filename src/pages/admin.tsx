import React from 'react';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { createSupabaseBrowserClient } from '../lib/supabase';
import { getAuthUser, clearAuthUser } from '../lib/auth';
import PlayersCrud from '../components/admin/PlayersCrud';
import SessionsCrud from '../components/admin/SessionsCrud';
import AuthHeaderButton from '../components/AuthHeaderButton';
import PlayerMessagesAdmin from '../components/admin/PlayerMessagesAdmin';

type CustomFields = {
    supabaseUrl?: string;
    supabasePublishableKey?: string;
};

export default function AdminPage() {
    const history = useHistory();
    const { siteConfig } = useDocusaurusContext();
    const [ready, setReady] = React.useState(false);
    const [allowed, setAllowed] = React.useState(false);

    const supabase = React.useMemo(
        () => createSupabaseBrowserClient(siteConfig.customFields as CustomFields),
        [siteConfig.customFields]
    );

    React.useEffect(() => {
        const user = getAuthUser();

        if (!user) {
            history.replace('/login');
            return;
        }

        if (!user.is_admin) {
            history.replace('/prochaine-session');
            return;
        }

        setAllowed(true);
        setReady(true);
    }, [history]);

    function handleLogout() {
        clearAuthUser();
        history.push('/login');
    }

    if (!ready) {
        return (
            <Layout title="Admin">
                <main style={{ padding: '2rem 1rem' }}>
                    <p>Chargement…</p>
                </main>
            </Layout>
        );
    }

    if (!allowed) {
        return null;
    }

    return (
        <Layout title="Admin">
            <main style={{ padding: '2rem 1rem 3rem' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gap: '1.5rem' }}>
                    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <div>
                            <h1 style={{ marginBottom: '0.5rem' }}>Admin</h1>
                            <p style={{ margin: 0, opacity: 0.85 }}>
                                Gestion minimale des joueurs et des sessions.
                            </p>
                        </div>

                        <AuthHeaderButton />
                    </header>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <PlayersCrud supabase={supabase} />
                        <SessionsCrud supabase={supabase} />
                        <PlayerMessagesAdmin supabase={supabase} />
                    </div>
                </div>
            </main>
        </Layout>
    );
}