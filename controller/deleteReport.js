import jwt from 'jsonwebtoken';
import response from '../utils/response.js';
import HttpError from '../utils/HttpError.js';
import ReportModel from '../models/reportModel.js';
import UserModel from '../models/userModel.js';

const deleteReport = async (req, res) => {
  try {
    const { token } = req.headers;
    if (!token) throw new HttpError("Request has to contains user's token");

    const { reportId } = req.body;
    if (!reportId) throw new HttpError("This report id doesn't exist", 400);

    const { id: userId } = jwt.verify(token, process.env.PROJECT_SECRET, (err, decode) => {
      if (err) {
        throw new HttpError(err.message, 401);
      }
      return decode;
    });

    const user = await UserModel.findById(userId);
    if (!user) throw new HttpError("User of this token doesn't exist", 404);

    const reportToDelete = await ReportModel.findById(reportId);
    if (!reportToDelete) throw new HttpError("The report of this id can't be find", 404);

    const { _id: reportToDeleteObjectId } = reportToDelete;

    if (!user.userReports.includes(reportToDeleteObjectId)) {
      throw new HttpError("User doesn't have this report", 404);
    }

    user.userReports.splice(user.userReports.indexOf(reportToDeleteObjectId), 1);

    user.save();

    res.status(200).json(response(true, 'Report deleted successfully'));
  } catch (err) {
    res.json(response(false, err.message, err));
  }
};

export default deleteReport;
