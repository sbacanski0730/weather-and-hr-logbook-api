import jwt from 'jsonwebtoken';
import HttpError from '../utils/HttpError.js';
import response from '../utils/response.js';
import UserModel from '../models/userModel.js';
import ReportModel from '../models/reportModel.js';

const updateReport = async (req, res) => {
  try {
    const { token } = req.headers;
    if (!token) throw new HttpError('Token is needed', 400);

    const reportUpdate = req.body;

    const { id: userId } = jwt.verify(token, process.env.PROJECT_SECRET, (err, decode) => {
      if (err) {
        throw new HttpError(404, "User didn't recognize");
      }
      return decode;
    });

    const user = await UserModel.findById(userId);

    if (!user.userReports.includes(req.body._id)) {
      throw new HttpError("User doesn't have this report", 400);
    }

    await ReportModel.findByIdAndUpdate({ _id: reportUpdate._id }, reportUpdate);

    res.status(200).json(response(true, 'Report updated'));
  } catch (err) {
    res.json(response(false, err.message, err));
  }
};

export default updateReport;
