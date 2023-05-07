import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import response from '../utils/response.js';
import HttpError from '../utils/HttpError.js';
import ReportModel from '../models/reportModel.js';

const addReport = async (req, res) => {
  try {
    const { token } = req.headers;

    if (!token) throw new HttpError('This functionality needs token', 401);

    const { id } = jwt.verify(token, process.env.PROJECT_SECRET, (err, decoded) => {
      if (err) {
        throw new HttpError(err.message, 401);
      }
      return decoded;
    });

    const user = await UserModel.findById(id);

    if (!user) throw new HttpError("This user doesn't exist", 400);

    console.log('req.body: ', req.body);

    const {
      title,
      date,
      skyStatus,
      shipStatus,
      windSpeed,
      shipLocalization,
      content,
      startHarbour,
      destinationHarbour,
      watchNumber,
      watchOfficer,
    } = req.body;

    const newReport = await ReportModel.create({
      title,
      date,
      skyStatus,
      shipStatus,
      windSpeed,
      shipLocalization,
      content,
      startHarbour,
      destinationHarbour,
      watchNumber,
      watchOfficer,
    });

    await user.userReports.push(newReport);
    await user.save();

    res
      .status(201)
      .json(response(true, 'Report successfully added to user reports list', newReport));
  } catch (err) {
    res.json(response(false, err.message, err));
  }
};

export default addReport;
