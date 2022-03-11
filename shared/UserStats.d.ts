import { AllCharacters } from './Characters';

export default interface UserStats {
    gamesPlayed: number;
    gamesWon: number;
    charactersPlayed: Record<AllCharacters, number>;
}
