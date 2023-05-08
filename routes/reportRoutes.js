import express from 'express';
import addReport from '../controller/addReport.js';
import deleteReport from '../controller/deleteReport.js';
import updateReport from '../controller/updateReport.js';
import getReport from '../controller/getReport.js';

const router = express.Router();

router.post('/add', addReport);
router.post('/delete/:id', deleteReport);
router.post('/update', updateReport);
router.get('/:id', getReport);

export default router;
