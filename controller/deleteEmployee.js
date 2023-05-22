import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import HttpError from '../utils/HttpError.js';
import response from '../utils/response.js';
import EmployeeModel from '../models/employeeModel.js';

const deleteEmployee = async (req, res) => {
  try {
    if (!req.headers.token) throw new HttpError("Token didn't provided");
    if (!req.params.id) throw new HttpError('Unknown ID');

    const { id } = jwt.verify(req.headers.token, process.env.PROJECT_SECRET);

    const user = await UserModel.findById(id);
    if (!user) throw new HttpError('Unexpected user');

    await EmployeeModel.findByIdAndDelete(req.params.id);

    user.employees = user.employees.filter((e) => !(e.toString() === req.params.id));
    await user.save();

    res.status(200).json(response(true, 'Employee deleted successfully'));
  } catch (err) {
    res.json(response(false, err.message, err));
  }
};

export default deleteEmployee;
