import crypto from 'crypto';
import Token from '../models/token.js';
import UserModel from '../models/userModel.js';
import HttpError from '../utils/HttpError.js';
import response from '../utils/response.js';
import sendEmail from '../utils/sendEmail.js';

const sendEmailAgain = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await UserModel.findById(userId);
    if (!user) throw new HttpError('Check is ID ok');

    await Token.findOneAndDelete({ userId: req.params.id });

    const newToken = await Token({
      userId: req.params.id,
      token: crypto.randomBytes(32).toString('hex'),
    }).save();

    const message = `${process.env.WEB_URL}/verification/${user._id}/${newToken.token}`;
    await sendEmail(user.email, 'Next Verification Email', message);

    res.json(response(true, 'Email Sended'));
  } catch (err) {
    res.json(response(false, err.message));
  }
};

export default sendEmailAgain;
