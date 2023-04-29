import bcrypt from 'bcrypt';
import UserModel from '../models/userModel.js';
import HttpError from '../utils/HttpError.js';
import response from '../utils/response.js';

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (await UserModel.findOne({ email })) {
      throw new HttpError('This user already exist', 409);
    }

    await UserModel.create({
      email,
      password: await bcrypt.hash(password, 5),
    });

    res.status(201).json(response(true, 'User created', email));
  } catch (error) {
    res.status(error.code).json(response(false, error.message));
  }
};

export default registerUser;
