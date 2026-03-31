export type AuthUser = {
    id: number;
    name: string;
    is_admin: boolean;
    is_active: boolean;
};

const STORAGE_KEY = 'the-crawl-auth-user';
const EVENT_NAME = 'the-crawl-auth-changed';

export function saveAuthUser(user: AuthUser) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event(EVENT_NAME));
}

export function getAuthUser(): AuthUser | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw) as AuthUser;
    } catch {
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
}

export function clearAuthUser() {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(EVENT_NAME));
}

export function isBrowser() {
    return typeof window !== 'undefined';
}

export const AUTH_CHANGED_EVENT = EVENT_NAME;