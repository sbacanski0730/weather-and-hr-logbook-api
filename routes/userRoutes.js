import express from 'express';

import getUser from '../controller/getUser.js';
import getAllReports from '../controller/getAllReports.js';

const router = express.Router();

router.get('/get-user', getUser);
router.get('/get-all-reports', getAllReports);

export default router;
