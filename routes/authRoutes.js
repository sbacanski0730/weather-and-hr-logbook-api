import express from 'express';
import loginUser from '../controller/loginUser.js';
import registerUser from '../controller/registerUser.js';

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *     post:
 *       tags:
 *         - Auth
 *       summary: Register user
 *       description: Allows to register user
 *       requestBody:
 *         description: Request body of user's register
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     example: admin@admin.com
 *                   password:
 *                     type: string
 *                     example: admin123
 *       responses:
 *         202:
 *           description: Register user
 *           content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: boolean
 *                              example: true
 *                          message:
 *                              type: string
 *                              example: Email send to verify new user
 *                          content:
 *                              type: string
 *                              example: "admin@admin.com"
 *         409:
 *           description: User with those email already exist or  provided credentials are invalid
 */

router.post('/register', registerUser);

/**
 * @openapi
 * /auth/login:
 *  post:
 *     tags:
 *     - Auth
 *     summary: Login user
 *     description: Allows to login user
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          example: admin@admin.com
 *                      password:
 *                          type: string
 *                          example: admin123
 *     responses:
 *          202:
 *              description: Proper login
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: boolean
 *                                  example: true
 *                              message:
 *                                  type: string
 *                                  example: "User logged"
 *          400:
 *              description: Wrong token, password or other credentials
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: boolean
 *                                  example: false
 *                              message:
 *                                  type: string
 *                                  example: Wrong credentials
 *
 */
router.post('/login', loginUser);

export default router;
