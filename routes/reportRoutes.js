import express from 'express';
import addReport from '../controller/addReport.js';
import deleteReport from '../controller/deleteReport.js';
import updateReport from '../controller/updateReport.js';

/**
 * @swagger
 * tags:
 *  name: reports
 *  description: All functionalities to manage reports
 *
 */

const router = express.Router();

router.post('/add', addReport);
router.post('/delete', deleteReport);
router.post('/update', updateReport);

export default router;
