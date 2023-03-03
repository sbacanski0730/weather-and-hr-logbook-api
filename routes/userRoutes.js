import express from 'express';

import { getUser } from '../controller/getUser.js';

const router = express.Router();

router.get('/get-user', getUser);

export default router;
