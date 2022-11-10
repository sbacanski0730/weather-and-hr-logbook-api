const User = require('../../models/userModel.js');
const standardResponse = require('../../utils/responseStandard.js');
const orderComment = require('../../utils/orderComment.js');
// const registerValidation = require('../../validation/authValidation.j

const registerFunction = async (req, res) => {
	orderComment('register');
	// TODO: zaimplementować walidację do rejestracji
	// const { error } = registerValidation(req.body);

	// if (error) {
	// 	console.log('REQUEST DATA ERROR');
	// 	console.log(error.details[0].message);
	// 	return res.json({ status: true, message: error.details[0].message });
	// }

	let req_email = req.body.email;
	let req_password = req.body.password;

	try {
		const user = await User.findOne({ email: req_email });

		if (user) {
			throw 'User with that email already exit';
		}
		const newUser = new User({
			email: req_email,
			password: req_password,
		});

		await newUser.save();
		console.log('New User: ', newUser);

		res.json(standardResponse(true, 'User created'));
	} catch (err) {
		res.json(standardResponse(false, err));
	}
};

module.exports = registerFunction;
