import { Router } from 'express';
import getNumLobbies from '../handlers/getNumLobbies';

const router = Router();

router.get('/numLobbies', getNumLobbies);

export default router;
