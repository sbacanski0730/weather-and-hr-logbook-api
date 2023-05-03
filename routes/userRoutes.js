import express from 'express';

import getUser from '../controller/getUser.js';
import getAllReports from '../controller/getAllReports.js';
import emailVerification from '../controller/emailVerification.js';

const router = express.Router();

router.get('/get-user', getUser);
router.get('/get-all-reports', getAllReports);
router.get('/verify/:id/:token', emailVerification);

export default router;
