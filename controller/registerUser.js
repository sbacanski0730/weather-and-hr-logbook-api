import bcrypt from 'bcrypt';
import crypto from 'crypto';
import UserModel from '../models/userModel.js';
import HttpError from '../utils/HttpError.js';
import response from '../utils/response.js';
import Token from '../models/token.js';
import sendEmail from '../utils/sendEmail.js';

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (await UserModel.findOne({ email })) {
      throw new HttpError('This user already exist', 409);
    }

    const newUser = await UserModel.create({
      email,
      password: await bcrypt.hash(password, 5),
    });

    const token = await new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString('hex'),
    }).save();

    // const message = `${process.env.BASE_URL}/user/verify/${newUser._id}/${token.token}`;
    const message = `${process.env.WEB_URL}/verification/${newUser._id}/${token.token}`;
    await sendEmail(newUser.email, 'Verify Email', message);

    res.status(201).json(response(true, 'Email send to verify new user', email));
  } catch (error) {
    res.status(error.code).json(response(false, error.message));
  }
};

export default registerUser;
