import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import response from '../utils/response.js';
import HttpError from '../utils/HttpError.js';
import ReportModel from '../models/reportModel.js';

/** https://www.youtube.com/watch?v=S8kmHtQeflo
 * @swagger
 * /report/add:
 *  post:
 *    tags: [reports]
 *    summary: add new Report
 *    description: "This endpoint serves to adding new reports to users accounts"
 *    parameters:
 *      - in: header
 *        required: true
 *        name: token
 *        description: This is the user's token received at sign in.
 *      - in: query
 *        name: title
 *        description: Report title
 *    requestBody:
 *      description: "This is example how request to this endpoint should looks like."
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: #/components/schemas/Report
 *    responses:
 *      201:
 *        description: Report has been added.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Report'
 *      401:
 *          description: __token didn't provided__ or __wrong token__.
 */

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

    const { title, date, skyStatus, shipStatus, windSpeed, shipLocalization, content } = req.body;

    const newReport = await ReportModel.create({
      title,
      date,
      skyStatus,
      shipStatus,
      windSpeed,
      shipLocalization,
      content,
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
