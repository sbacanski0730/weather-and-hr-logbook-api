import express from 'express';

import getUser from '../controller/getUser.js';
import getAllReports from '../controller/getAllReports.js';

/**
 * @swagger
 * tags:
 *  name: users
 *  description: All functionalities for user management
 *
 */

const router = express.Router();

router.get('/get-user', getUser);
router.get('/get-all-reports', getAllReports);

export default router;
