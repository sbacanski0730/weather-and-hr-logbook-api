const jwt = require('jsonwebtoken');
const orderComment = require('../../utils/orderComment');
const responseStandard = require('../../utils/responseStandard');
const Report = require('../../models/reportSchema.js');
const isUserExist = require('../../utils/isUserExist');

const getReportById = async (req, res) => {
	orderComment('get report by id');
	// TODO: dokończyć!!!!

	try {
		const userId = jwt.decode(req.headers.token);

		if (!(await isUserExist(userId))) {
			throw "This user doesn't exist";
		}

		const reportId = req.params.reportId;

		const foundReport = await Report.findById(reportId);

		if (!foundReport) {
			throw "Report doesn't exist";
		}

		res.json(responseStandard(true, 'Report found', foundReport));
	} catch (err) {
		res.json(responseStandard(false, err));
	}
};

module.exports = getReportById;
