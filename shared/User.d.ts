import UserStats from './UserStats';

/** A base user represents someone who hasn't made an account yet, and just wants to play without going through the hassle. */
export interface BaseUser {
    name: string;
}

/** A full user represents someone who has made an account.
 *
 * Eventually some form of email authentication would be nice here.
 */
export interface FullUser extends BaseUser {
    email: string;
    hashedPassword: string;
    registeredAt: number;
    lastLoggedIn: number;
    stats: UserStats;
    previousNames: string[];
    isAdmin: boolean;
}
