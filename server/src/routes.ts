import { Router } from 'express';
import getNumLobbies from './handlers/getNumLobbies';
import { login, signup } from './handlers/user';
import guestSignup from './handlers/user/guestSignup';

const router = Router();

router.get('/numLobbies', getNumLobbies);

router.get('/', (_, res) => res.status(200).send('sussy'));

router.get('/signup', signup);
router.get('/login', login);
router.get('/guestSignup', guestSignup);

export default router;
