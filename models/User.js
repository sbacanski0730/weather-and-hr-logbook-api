const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	email: String,
	password: String,
});

UserSchema.pre('save', async function () {
	const salt = await bcrypt.genSalt(12);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.isPasswordCorrect = async function (req_password) {
	console.log('user', await bcrypt.compare(req_password, this.password));
	return await bcrypt.compare(req_password, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;

// TODO: finds out the difference between module.exports and export/exports
