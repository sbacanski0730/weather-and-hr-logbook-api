import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/userModel.js';
import HttpError from '../utils/HttpError.js';
import response from '../utils/response.js';

/**
 *  @swagger
 *   /auth/login:
 *    post:
 *      tags: [auth]
 *      summary: Login user endpoint
 *      description: This endpoint is to log in user to application
 *      parameters:
 *        - in: query
 *          name: email
 *          example: user@user.com
 *        - in: query
 *          name: password
 *          example: 123546
 *      requestBody:
 *        description: This is how query should looks like
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  example: user@user.com
 *                password:
 *                  type: string
 *                  example: 123456
 *      responses:
 *        202:
 *          description: __User is logged__
 *          content:
 *            application/json:
 *              status:
 *                type: boolean
 *                example: true
 *        400:
 *          description: __password is incorrect__ or __this user doesn't exist__.
 *
 */

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const loggingUser = await UserModel.findOne({ email });

    if (!loggingUser) {
      throw new HttpError("This user doesn't exist", 400);
    }

    if (!(await bcrypt.compare(password, loggingUser.password))) {
      throw new HttpError('Wrong password', 400);
    }

    const token = jsonwebtoken.sign({ id: loggingUser._id.toString() }, process.env.PROJECT_SECRET);

    res.status(202).header('token', token).json(response(true, 'User logged'));
  } catch (error) {
    res.status(error.code).json(response(false, error.message));
  }
};

export default loginUser;
