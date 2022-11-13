const orderComment = require('../../utils/orderComment.js');
const responseStandard = require('../../utils/responseStandard.js');
const isUserExist = require('../../utils/isUserExist.js');
const jwt = require('jsonwebtoken');
const Report = require('../../models/reportSchema.js');

const deleteReport = async (req, res) => {
	orderComment('delete report');

	try {
		const userId = jwt.decode(req.headers.token);

		if (!(await isUserExist(userId))) {
			throw "This user doesn't exist";
		}

		const reportId = req.params.reportId;

		await Report.deleteOne({ _id: reportId }).catch(err => {
			throw 'Error during delete';
		});

		res.status(200).json(responseStandard(true, 'Report deleted'));
	} catch (err) {
		console.log(err);
		res.json(responseStandard(false, err));
	}
};

module.exports = deleteReport;
