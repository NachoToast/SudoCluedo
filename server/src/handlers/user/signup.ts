import { Request, Response } from 'express';
import validator from 'validator';
import { FullUser } from '../../../../shared/User';
import userModel from '../../models/UserModel';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';

/** Returns:
 * - 400 (bad request) if anything is invalid, with a string of what specifically was invalid.
 * - 201 (created) with JWT on success.
 * */
async function signup(req: Request, res: Response): Promise<void> {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // type validation
        if (typeof name !== 'string') {
            return void res.status(400).json(`name must be a string (got ${typeof name})`);
        }
        if (typeof email !== 'string') {
            return void res.status(400).json(`email must be a string (got ${typeof email})`);
        }
        if (typeof password !== 'string') {
            return void res.status(400).json(`password must be a string (got ${typeof password})`);
        }
        if (typeof confirmPassword !== 'string') {
            return void res.status(400).json(`confirmPassword must be a string (got ${typeof confirmPassword})`);
        }

        // specific validation
        if (name.length < 2 || name.length > 20) {
            return void res.status(400).json(`Name must be 2-20 (inc) characters long (got ${name.length})`);
        }
        if (!validator.isEmail(email)) {
            return void res.status(400).json('Invalid email');
        }
        if (password.length < 8) {
            return void res.status(400).json(`Password must be at least 8 characters long (got ${password.length})`);
        }
        if (password !== confirmPassword) {
            return void res.status(400).json("Passwords don't match");
        }

        const existingUser = await userModel.findOne<FullUser>({ nameL: name.toLowerCase() });
        if (existingUser) {
            return void res.status(400).json('That username is taken');
        }

        const hashedPassword = await hash(password, 12);
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            console.log('Missing JWT_SECRET from .env');
            process.exit(1);
        }

        const newUser = await userModel.create<FullUser>({
            name,
            nameL: name.toLowerCase(),
            id: uuid(),
            email,
            hashedPassword,
            registeredAt: Date.now(),
            lastLoggedIn: Date.now(),
            stats: {
                guessStats: {
                    correctGuesses: 0,
                    firstGuesses: 0,
                    totalGuesses: 0,
                },
                gamesPlayed: 0,
                gamesWon: 0,
                charactersPlayed: {},
            },
            previousNames: [],
            isAdmin: false,
            isGuest: false,
        });

        const token = sign({ id: newUser.id }, secretKey, { expiresIn: '1h' });

        res.status(201).json(token);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

export default signup;
