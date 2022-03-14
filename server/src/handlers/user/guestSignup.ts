import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { serverHub } from '../..';

/** Returns:
 * - 400 (bad request) if anything is invalid, with a string of what specifically was invalid.
 * - 201 (created) with JWT on success.
 * */
function guestSignup(req: Request, res: Response): void {
    try {
        const { name } = req.body;

        if (typeof name !== 'string') {
            return void res.status(400).json(`name must be a string (got ${typeof name})`);
        }
        if (name.length < 2 || name.length > 20) {
            return void res.status(400).json(`Name must be 2-20 (inc) characters long (got ${name.length})`);
        }

        const existingGuest = serverHub.guestTracker.has(name);

        if (existingGuest) {
            return void res.status(400).json('That username is currently in use');
        }

        serverHub.guestTracker.add(name);

        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            console.log('Missing JWT_SECRET from .env');
            process.exit(1);
        }

        const token = sign({ id: null }, secretKey, { expiresIn: '1h' });

        res.status(201).json(token);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

export default guestSignup;
