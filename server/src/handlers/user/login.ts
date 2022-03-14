import { Request, Response } from 'express';
import { FullUser } from '../../../../shared/User';
import userModel from '../../models/UserModel';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

/** Returns:
 * - 400 (bad request) if anything is invalid, with a string of what specifically was invalid.
 * - 401 (unauthorized) if password is incorrect.
 * - 404 (not found) if no user exists with that name.
 * - 202 (accepted) with JWT on success.
 */
async function login(req: Request, res: Response): Promise<void> {
    try {
        const { name, password } = req.body;

        if (typeof name !== 'string') {
            return void res.status(400).json(`name must be a string (got ${typeof name})`);
        }
        if (typeof password !== 'string') {
            return void res.status(400).json(`password must be a string (got ${typeof password})`);
        }

        const existingUser = await userModel.findOne<FullUser>({ nameL: name.toLowerCase() });

        if (!existingUser) {
            return void res.status(404).json(`User '${name}' not found`);
        }

        const isPasswordCorrect = await compare(password, existingUser.hashedPassword);

        if (!isPasswordCorrect) {
            return void res.status(401).json('incorrect password u sussy baka');
        }

        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            console.log('Missing JWT_SECRET from .env');
            process.exit(1);
        }

        const token = sign({ id: existingUser.id }, secretKey, { expiresIn: '30d' });

        res.status(202).json(token);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

export default login;
