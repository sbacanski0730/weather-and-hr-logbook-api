import jwt from 'jsonwebtoken';
import response from '../utils/response.js';
import UserModel from '../models/userModel.js';
import EmployeeModel from '../models/employeeModel.js';
import HttpError from '../utils/HttpError.js';

const addEmployee = async (req, res) => {
  try {
    const { token } = req.headers;

    if (!token) throw new HttpError('Request has to provides token');

    const { id } = jwt.verify(token, process.env.PROJECT_SECRET, (err, decoded) => {
      if (err) {
        throw new HttpError(err.message, 401);
      }
      return decoded;
    });

    const user = await UserModel.findById(id);
    if (!user) throw new HttpError("This user doesn't exist");

    const { name, surname, position } = req.body;
    const newEmployee = await EmployeeModel.create({ name, surname, position });

    await user.employees.push(newEmployee);
    await user.save();

    res.status(200).json(response(true, 'New employee added', newEmployee));
  } catch (err) {
    res.json(response(false, err.message, err));
  }
};

export default addEmployee;
