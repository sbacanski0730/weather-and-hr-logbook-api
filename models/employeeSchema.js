const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			require: true,
		},
		lastName: {
			type: String,
			require: true,
		},
	},
	{
		_id: false,
	}
);

module.exports = employeeSchema;
