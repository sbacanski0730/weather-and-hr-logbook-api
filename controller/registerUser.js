import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import HttpError from '../utils/HttpError.js';
import response from '../utils/response.js';

export const registerUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (await UserModel.findOne({ email: email })) {
			throw new HttpError('This user already exist', 409);
		}

		await UserModel.create({
			email: email,
			password: await bcrypt.hash(password, 5),
		});

		res.status(201).json(response(true, 'User created', email));
	} catch (error) {
		res.status(error.code).json(response(false, error.message));
	}
};
