import UserModel from '../models/userModel.js';
import HttpError from '../utils/HttpError.js';
import response from '../utils/response.js';
import sendEmail from '../utils/sendEmail.js';

const sendEmailAgain = async (req, res) => {
  try {
    console.log('sending again');
    const userId = req.params.id;

    const user = await UserModel.findById(userId);
    if (!user) throw new HttpError('Check is ID ok');

    console.log('user: ', user);

    const message = `${process.env.BASE_URL}/user/verify/${req.params.id}/${req.params.token}`;
    await sendEmail(user.email, 'Email Verification', message);

    res.json(response(true, 'Email Sended'));
  } catch (err) {
    res.json(response(false, err.message));
  }
};

export default sendEmailAgain;
