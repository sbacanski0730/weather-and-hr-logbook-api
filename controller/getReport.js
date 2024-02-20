import jwt from 'jsonwebtoken';
import response from '../utils/response.js';
import ReportModel from '../models/reportModel.js';
import UserModel from '../models/userModel.js';
import HttpError from '../utils/HttpError.js';

const getReport = async (req, res) => {
  try {
    if (!req.headers.token) throw new HttpError('Token has to be provided');

    const { id } = jwt.verify(req.headers.token, process.env.PROJECT_SECRET);

    if (!(await UserModel.findById(id))) throw new HttpError('User Error');

    const foundReport = await ReportModel.findById(req.params.id);

    if (!foundReport) throw new HttpError("Report of given ID doesn't exist");

    res.status(200).json(response(true, 'Report founded', foundReport));
  } catch (err) {
    res.json(response(false, err.message, err));
  }
};
export default getReport;
