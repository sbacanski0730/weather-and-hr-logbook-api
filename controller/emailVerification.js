import HttpError from '../utils/HttpError.js';
import User from '../models/userModel.js';
import response from '../utils/response.js';
import Token from '../models/token.js';

const emailVerification = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) throw new HttpError("User with this id doesn't exist", 404);

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) throw HttpError('Invalid token', 400);

    await user.updateOne({ verified: true });
    await Token.findByIdAndRemove(token._id);

    res.send('Email Verified');
  } catch (err) {
    res.status(400).json(response(false, err.message, err));
  }
};

export default emailVerification;
