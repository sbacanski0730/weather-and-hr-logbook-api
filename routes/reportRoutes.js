const router = require('express').Router();
const addReport = require('../controller/reports/addReportFunction');
const deleteRouter = require('../controller/reports/deleteReportFunction.js');
const getAllReports = require('../controller/reports/getAllReportsFunction');
const getReportById = require('../controller/reports/getReportByIdFunction');
const updateReport = require('../controller/reports/updateReportFunction');

router.get('/all', getAllReports);
router.get('/:reportId', getReportById);
router.post('/add', addReport);
router.put('/update/:reportId', updateReport);
router.delete('/delete/:reportId', deleteRouter);

module.exports = router;
