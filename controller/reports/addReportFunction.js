// TODO: stworzyc dodawanie reportow z odpowiednim endpointem
const Report = require('../../models/reportSchema.js');
const jwt = require('jsonwebtoken');
const orderComment = require('../../utils/orderComment.js');
const responseStandard = require('../../utils/responseStandard');
const isUserExist = require('../../utils/isUserExist');

const addReport = async (req, res) => {
	orderComment('add report');

	try {
		const ownerId = jwt.decode(req.headers.token);

		if (!(await isUserExist(ownerId))) {
			throw "User doesn't exist";
		}

		let req_title = req.body.title;
		let req_content = req.body.content;
		let req_date = req.body.date;
		let req_temperature = req.body.weather.temperature;
		let req_windSpeed = req.body.weather.windSpeed;
		let req_pressure = req.body.weather.pressure;
		let req_skyCondition = req.body.weather.skyCondition;

		const newReport = new Report({
			ownerId: ownerId,
			title: req_title,
			content: req_content,
			date: req_date,
			weather: {
				temperature: req_temperature,
				windSpeed: req_windSpeed,
				pressure: req_pressure,
				skyCondition: req_skyCondition,
			},
		});

		console.log('newReport: ', newReport);
		await newReport.save();
		res.json(responseStandard(true, 'Report added', newReport));
	} catch (e) {
		console.log(e);
		res.json(responseStandard(false, e));
	}
};

module.exports = addReport;
