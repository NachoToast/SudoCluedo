import UserStats from './UserStats';

export interface BaseUser {
    name: string;
}

export interface FullUser extends BaseUser {
    email: string;
    hashedPassword: string;
    registeredAt: number;
    lastLoggedIn: number;
    stats: UserStats;
    previousNames: string[];
    isAdmin: boolean;
}
