import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import response from '../utils/response.js';
import HttpError from '../utils/HttpError.js';

export const getUser = async (req, res) => {
	try {
		const { token } = req.headers;

		const { id } = jwt.verify(
			token,
			process.env.PROJECT_SECRET,
			function (err, decoded) {
				if (err) {
					throw new HttpError(err.message, 401);
				}

				return decoded;
			}
		);

		console.log('id: ', id);

		if (!id) {
			throw new HttpError('Token invalid', 400);
		}

		const user = await UserModel.findById(id);

		if (!user) {
			throw new HttpError("This user doesn't exist", 400);
		}

		res.status(200).json(response(true, 'User info in content', user));
	} catch (error) {
		res.status(error.code).json(response(false, error.message));
	}
};
