import React from 'react';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';

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
            <Link to="/login" style={linkStyle}>
                Login
            </Link>
        );
    }

    return (
        <div style={wrapperStyle}>
            {user.is_admin && (
                <Link to="/admin" style={linkStyle}>
                    Admin
                </Link>
            )}

            <Link to="/prochaine-session" style={linkStyle}>
                Bonjour {user.name}
            </Link>

            <button type="button" onClick={handleLogout} style={buttonStyle}>
                Déconnexion
            </button>
        </div>
    );
}

const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flexWrap: 'wrap',
};

const linkStyle: React.CSSProperties = {
    textDecoration: 'none',
    fontWeight: 500,
};

const buttonStyle: React.CSSProperties = {
    border: '1px solid var(--ifm-color-emphasis-300)',
    background: 'transparent',
    borderRadius: 8,
    padding: '0.45rem 0.7rem',
    cursor: 'pointer',
    fontWeight: 500,
};