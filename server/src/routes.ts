import { Router } from 'express';
import getNumLobbies from './handlers/getNumLobbies';
import { login, signup } from './handlers/user';
import guestSignup from './handlers/user/guestSignup';

const router = Router();

router.get('/numLobbies', getNumLobbies);

router.get('/', (_, res) => res.status(200).send('sussy'));

router.post('/signup', signup);
router.post('/login', login);
router.post('/guestSignup', guestSignup);

export default router;
