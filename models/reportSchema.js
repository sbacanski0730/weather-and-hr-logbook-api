const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
	ownerId: {
		type: String,
		require: true,
	},
	title: {
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

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
