import jwt from 'jsonwebtoken';
import response from '../utils/response.js';
import HttpError from '../utils/HttpError.js';
import UserModel from '../models/userModel.js';

const getAllReports = async (req, res) => {
  try {
    const { token } = req.headers;

    const { id } = jwt.verify(token, process.env.PROJECT_SECRET, (err, decode) => {
      if (err) {
        throw new HttpError(404, 'Wrong request');
      }
      return decode;
    });

    const { userReports } = await UserModel.findById(id).populate('userReports');

    res.status(200).json(response(true, 'All reports collected', userReports));
  } catch (err) {
    res.json(response(false, err.message, err));
  }
};

export default getAllReports;
