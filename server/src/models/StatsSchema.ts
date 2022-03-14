import { Schema } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import UserStats, { GuessStats } from '../../../shared/UserStats';

const guessStatsSchema = new Schema<GuessStats>({
    correctGuesses: {
        type: Number,
        required: true,
    },
    firstGuesses: {
        type: Number,
        required: true,
    },
    totalGuesses: {
        type: Number,
        required: true,
    },
});

const statsSchema = new Schema<UserStats>({
    guessStats: {
        type: guessStatsSchema,
        required: true,
    },
    gamesPlayed: {
        type: Number,
        required: true,
    },
    gamesWon: {
        type: Number,
        required: true,
    },
    charactersPlayed: {
        type: Map,
        of: Number,
    },
});

export default statsSchema;
