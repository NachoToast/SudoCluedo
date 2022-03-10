import { Request, Response } from 'express';
import { serverHub } from '..';

function getNumLobbies(req: Request, res: Response): void {
    try {
        const numGames = serverHub.numLobbies;
        res.status(200).json(numGames);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

export default getNumLobbies;
