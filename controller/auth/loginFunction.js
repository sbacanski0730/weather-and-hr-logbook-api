const User = require('../../models/userModel.js');
const orderComment = require('../../utils/orderComment.js');
const jwt = require('jsonwebtoken');
const standardResponse = require('../../utils/responseStandard.js');

const loginFunction = async (req, res) => {
	orderComment('login');
	// TODO: zaimplementować walidację do logowania
	// const { error } = loginValidation(req.body);
	// if (error) {
	// 	console.log('REQUEST DATA ERROR');
	// 	console.log(error.details[0].message);
	// 	return res.json({ status: true, message: error.details[0].message });
	// }

	let req_email = req.body.email;
	let req_password = req.body.password;

	try {
		const userFromRequest = await User.findOne({ email: req_email });

		if (!userFromRequest) {
			throw "User with that email doesn't exist";
		}

		if (!(await userFromRequest.isPasswordCorrect(req_password))) {
			throw 'Wrong Password';
		}

		const token = jwt.sign(userFromRequest._id.toString(), process.env.TOKEN_SECRET);

		res.header('token', token).json({
			status: true,
			message: 'User logged',
		});
	} catch (e) {
		res.json(standardResponse(false, e));
	}
};

module.exports = loginFunction;
