const orderComment = require('../../utils/orderComment');
const responseStandard = require('../../utils/responseStandard');
const isUserExist = require('../../utils/isUserExist.js');
const Report = require('../../models/reportSchema.js');
const jwt = require('jsonwebtoken');

const updateReport = async (req, res) => {
	orderComment('update report');

	try {
		const userId = jwt.decode(req.headers.token);

		if (!(await isUserExist(userId))) {
			throw "This user doesn't exist";
		}
		const reportId = req.params.reportId;
		const updateContent = req.body;

		await Report.updateOne({ _id: reportId }, updateContent);

		res.json(responseStandard(true, 'Report Updated'));
	} catch (e) {
		res.json(responseStandard(false, e));
	}
};

module.exports = updateReport;
