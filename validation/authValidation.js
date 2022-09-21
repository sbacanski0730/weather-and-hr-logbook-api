const Joi = require('joi');

const validateRegister = request_body => {
	const registerValidationSchema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(5).max(128).required(),
	});

	return registerValidationSchema.validate(request_body);
};
module.exports = validateRegister;

const validateLogin = request_body => {
	const loginValidationSchema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(5).max(128).required(),
	});

	return loginValidationSchema.validate(request_body);
};
module.exports = validateLogin;
