import UserStats from './UserStats';

/** A base user represents someone who hasn't made an account yet, and just wants to play without going through the hassle. */
interface BaseUser {
    /** Valid names are between 2 and 20 (inclusive) characters long. */
    name: string;
    isGuest: boolean;
}

export interface GuestUser extends BaseUser {
    isGuest: true;
}

/** A full user represents someone who has made an account.
 *
 * Eventually some form of email authentication would be nice here.
 */
export interface FullUser extends BaseUser {
    /** Name but in lowercase. */
    nameL: string;
    id: string;
    email: string;
    hashedPassword: string;
    registeredAt: number;
    lastLoggedIn: number;
    stats: UserStats;
    previousNames: string[];
    isAdmin: boolean;
    isGuest: false;
}
