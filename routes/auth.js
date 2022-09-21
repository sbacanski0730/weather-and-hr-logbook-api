const router = require('express').Router();
const User = require('../models/User.js');
const registerValidation = require('../validation/authValidation.js');
const loginValidation = require('../validation/authValidation.js');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
	console.log('SERVER GOT ORDER: "register"');

	const { error } = registerValidation(req.body);
	if (error) {
		console.log('REQUEST DATA ERROR');
		console.log(error.details[0].message);
		return res.json({ status: true, message: error.details[0].message });
	}

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
		console.log('User created');

		res.json({ status: true, message: 'User created' });
	} catch (err) {
		res.json({ status: false, message: err });
	}
});

router.post('/login', async (req, res) => {
	console.log('SERVER GOT ORDER: "login"');

	const { error } = loginValidation(req.body);
	if (error) {
		console.log('REQUEST DATA ERROR');
		console.log(error.details[0].message);
		return res.json({ status: true, message: error.details[0].message });
	}

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

		console.log('User log in');
		res.header('Authorization', `Bearer ${token}`).json({
			status: true,
			message: 'User login',
		});
	} catch (err) {
		console.log(err);
		res.json({ status: false, message: err });
	}
});

module.exports = router;
