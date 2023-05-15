import jwt from 'jsonwebtoken';
import response from '../utils/response.js';
import HttpError from '../utils/HttpError.js';
import ReportModel from '../models/reportModel.js';
import UserModel from '../models/userModel.js';

const deleteReport = async (req, res) => {
  console.log('usuwam');
  try {
    if (!req.headers.token) throw new HttpError("Token didn't provided");
    if (!req.params.id) throw new HttpError('Unknown ID');

    const { id } = jwt.verify(req.headers.token, process.env.PROJECT_SECRET);

    const user = await UserModel.findById(id);
    if (!user) throw new HttpError('Unexpected user');

    await ReportModel.findByIdAndDelete(req.params.id);

    user.userReports = user.userReports.filter((e) => !(e.toString() === req.params.id));
    await user.save();

    res.status(200).json(response(true, 'Report deleted successfully'));
  } catch (err) {
    res.json(response(false, err.message, err));
  }
};

export default deleteReport;
