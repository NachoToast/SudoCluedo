import { Router } from 'express';
import getNumLobbies from '../handlers/getNumLobbies';

const router = Router();

router.get('/numLobbies', getNumLobbies);

router.get('/', (req, res) => res.status(200).send('sussy'));

export default router;
