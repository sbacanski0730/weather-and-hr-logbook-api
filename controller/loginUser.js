import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/userModel.js';
import Token from '../models/token.js';
import HttpError from '../utils/HttpError.js';
import response from '../utils/response.js';

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const loggingUser = await UserModel.findOne({ email });

    if (!loggingUser) {
      throw new HttpError("This user doesn't exist", 400);
    }

    if (await Token.findOne({ userId: loggingUser._id }))
      throw new HttpError("This user doesn't have verified email.", 400);

    if (!(await bcrypt.compare(password, loggingUser.password))) {
      throw new HttpError('Wrong credentials', 400);
    }

    const token = jsonwebtoken.sign({ id: loggingUser._id.toString() }, process.env.PROJECT_SECRET);

    res.status(202).header('token', token).json(response(true, 'User logged'));
  } catch (err) {
    res.status(err.code).json(response(false, err.message));
  }
};

export default loginUser;
