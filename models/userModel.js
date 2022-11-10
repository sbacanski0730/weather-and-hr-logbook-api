const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const employeeSchema = require('./employeeSchema');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
		minLength: 5,
	},
	reportsIds: [
		{
			type: String,
		},
	],
	employees: [
		{
			type: employeeSchema,
		},
	],
});

UserSchema.pre('save', async function () {
	const salt = await bcrypt.genSalt(12);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.isPasswordCorrect = async function (req_password) {
	// TODO: sprawdzic czy usuniecie poniższego console.log() nic nie popsuje
	console.log('user', await bcrypt.compare(req_password, this.password));
	return await bcrypt.compare(req_password, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
