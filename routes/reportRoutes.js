import express from 'express';
import addReport from '../controller/addReport.js';
import deleteReport from '../controller/deleteReport.js';

const router = express.Router();

router.post('/add', addReport);
router.post('/delete', deleteReport);

export default router;
