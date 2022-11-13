const jwt = require('jsonwebtoken');
const orderComment = require('../../utils/orderComment');
const isUserExist = require('../../utils/isUserExist.js');
const Report = require('../../models/reportSchema.js');
const responseStandard = require('../../utils/responseStandard');

const getAllReports = async (req, res) => {
	orderComment('get all reports');

	try {
		const userId = jwt.decode(req.headers.token);
		if (!(await isUserExist(userId))) {
			throw "This user doesn't exist";
		}
		const userReports = await Report.find({ ownerId: userId });

		if (userReports.length < 1) {
			res.json(responseStandard(true, "User doesn't have any report"));
		} else {
			res.json(responseStandard(true, 'All found reports in content', userReports));
		}
	} catch (err) {
		res.json(responseStandard(false, err));
	}
};

module.exports = getAllReports;
