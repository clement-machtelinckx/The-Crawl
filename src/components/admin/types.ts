export type Player = {
    id: number;
    name: string;
    password_hash: string;
    is_admin: boolean;
    is_active: boolean;
    login_token: string | null;
    created_at: string;
};

export type SessionItem = {
    id: number;
    title: string;
    game: string | null;
    starts_at: string;
    location: string | null;
    note: string | null;
    status: string;
    created_at: string;
};