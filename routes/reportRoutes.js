const router = require('express').Router();
const addReport = require('../controller/reports/addReportFunction');

// get all reports
// get report by id
// add report
router.post('/add', addReport);
// update report
// delete report

module.exports = router;
