import express from 'express';
import addReport from '../controller/addReport.js';

const router = express.Router();

router.post('/add', addReport);

export default router;
