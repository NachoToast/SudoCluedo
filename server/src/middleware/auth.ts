import { NextFunction, Request, Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseUser, FullUser } from '../../../shared/User';
import validator from 'validator';
import { verify } from 'jsonwebtoken';

/**
 * Basic user authentication for both {@link BaseUser } and {@link FullUser }.
 *
 * A JWT must be in the `authorization` header of the request.
 *
 * Returns:
 * - 401 if any checks fail.
 */
export function auth(req: Request, res: Response, next: NextFunction): void {
    try {
        const token = req.headers.authorization;

        // has token
        if (!token) {
            return void res.status(401).json("Missing 'authorization' token in header");
        }

        // token in jwt
        if (!validator.isJWT(token)) {
            return void res.status(401).json('Invalid auth token (not a JWT)');
        }

        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            console.log('Missing JWT_SECRET from .env');
            process.exit(1);
        }

        try {
            const validatedToken = verify(token, secretKey);
            if (typeof validatedToken === 'string') {
                return void res.status(401).json('Invalid auth token (bad payload shape)');
            }

            if (!validatedToken.exp) {
                return void res.status(401).json('Invalid auth token (no expiry date)');
            }

            if (validatedToken.exp * 1000 < Date.now()) {
                return void res.status(401).json('Expired auth token');
            }

            next();
        } catch (error) {
            console.log(error);
            return void res.status(401).json('Invalid auth token (unknown error occurred)');
        }
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}
