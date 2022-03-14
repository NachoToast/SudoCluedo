import { Characters } from './Characters';

export interface GuessStats {
    correctGuesses: number;
    firstGuesses: number;
    totalGuesses: number;
}

export default interface UserStats {
    guessStats: GuessStats;
    gamesPlayed: number;
    gamesWon: number;
    charactersPlayed: { [k in Characters]?: number };
}
