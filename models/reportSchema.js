const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	content: {
		type: String,
		require: true,
		minLength: 20,
	},
	date: {
		type: String,
		require: true,
	},
	weather: {
		temperature: {
			type: String,
			require: true,
		},
		windSpeed: {
			type: String,
			require: true,
			default: '0',
		},
		pressure: {
			type: String,
			require: true,
		},
		skyCondition: {
			type: String,
			require: true,
		},
	},
});

module.exports = reportSchema;
