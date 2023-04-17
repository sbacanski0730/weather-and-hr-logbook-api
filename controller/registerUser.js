import bcrypt from 'bcrypt';
import UserModel from '../models/userModel.js';
import HttpError from '../utils/HttpError.js';
import response from '../utils/response.js';

/**
 *
 * @swagger
 * /auth/register:
 *  post:
 *    tags: [auth]
 *    summary: Register user endpoint
 *    description: This endpoint allows to register user to application
 *    parameters:
 *        - in: query
 *          name: email
 *          example: user@user.com
 *        - in: query
 *          name: password
 *          example: 123546
 *    requestBody:
 *      description: This is how query should looks like
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: user@user.com
 *              password:
 *                type: string
 *                example: 123456
 *      responses:
 *        201:
 *          description: __User registered successfully__
 *          content:
 *            application/json:
 *            status:
 *        409:
 *          description: __User of this properties already exist__
 */

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (await UserModel.findOne({ email })) {
      throw new HttpError('This user already exist', 409);
    }

    await UserModel.create({
      email,
      password: await bcrypt.hash(password, 5),
    });

    res.status(201).json(response(true, 'User created', email));
  } catch (error) {
    res.status(error.code).json(response(false, error.message));
  }
};

export default registerUser;
