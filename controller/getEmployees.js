import jwt from 'jsonwebtoken';
import response from '../utils/response.js';
import UserModel from '../models/userModel.js';
import HttpError from '../utils/HttpError.js';

const getEmployees = async (req, res) => {
  try {
    const { token } = req.headers;
    if (!token) throw new HttpError('Token is needed');

    const { id } = jwt.verify(token, process.env.PROJECT_SECRET, (err, decoded) => {
      if (err) {
        throw new HttpError(err.message, 401);
      }
      return decoded;
    });

    const user = await UserModel.findById(id).populate('employees');
    if (!user) throw new HttpError('User not find');

    res.status(200).json(response(true, 'User employees in content', user.employees));
  } catch (err) {
    res.json(response(false, err.message, err));
  }
};

export default getEmployees;
