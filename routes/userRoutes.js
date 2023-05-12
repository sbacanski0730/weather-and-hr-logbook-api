import express from 'express';

import getUser from '../controller/getUser.js';
import getAllReports from '../controller/getAllReports.js';
import emailVerification from '../controller/emailVerification.js';
import sendEmailAgain from '../controller/sendEmailAgain.js';

const router = express.Router();

router.get('/get-user', getUser);
router.get('/get-all-reports', getAllReports);
router.get('/verify/:id/:token', emailVerification);
router.get('/send-email-again/:id/:token', sendEmailAgain);

export default router;
