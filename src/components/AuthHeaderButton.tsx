import React from 'react';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import { Button } from './ui';

import { clearAuthUser, getAuthUser, type AuthUser, AUTH_CHANGED_EVENT } from '../lib/auth';

export default function AuthHeaderButton() {
    const history = useHistory();
    const [user, setUser] = React.useState<AuthUser | null>(null);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setUser(getAuthUser());
        setMounted(true);

        function syncAuthState() {
            setUser(getAuthUser());
        }

        window.addEventListener('focus', syncAuthState);
        window.addEventListener('storage', syncAuthState);
        window.addEventListener(AUTH_CHANGED_EVENT, syncAuthState);

        return () => {
            window.removeEventListener('focus', syncAuthState);
            window.removeEventListener('storage', syncAuthState);
            window.removeEventListener(AUTH_CHANGED_EVENT, syncAuthState);
        };
    }, []);

    function handleLogout() {
        clearAuthUser();
        setUser(null);
        history.push('/login');
    }

    if (!mounted) {
        return null;
    }

    if (!user) {
        return (
            <Link to="/login" style={{ textDecoration: 'none', fontWeight: 500 }}>
                Login
            </Link>
        );
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {user.is_admin && (
                <Link to="/admin" style={{ textDecoration: 'none', fontWeight: 500 }}>
                    Admin
                </Link>
            )}

            <Link to="/prochaine-session" style={{ textDecoration: 'none', fontWeight: 500 }}>
                Bonjour {user.name}
            </Link>

            <Button type="button" variant="ghost" onClick={handleLogout}>
                Déconnexion
            </Button>
        </div>
    );
}