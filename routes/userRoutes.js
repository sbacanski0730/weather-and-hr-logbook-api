import express from 'express';

import getUser from '../controller/getUser.js';
import getAllReports from '../controller/getAllReports.js';
import emailVerification from '../controller/emailVerification.js';
import sendEmailAgain from '../controller/sendEmailAgain.js';

const router = express.Router();

/**
 * @swagger
 * /user/get-user:
 *  post:
 *      tags:
 *      - User
 *      summary: Get user
 *      description: Get users info
 *      parameters:
 *          - name: token
 *            in: header
 *            schema:
 *              type: string
 *            required: true
 *      responses:
 *          200:
 *              description: Users info in response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: boolean
 *                              message:
 *                                  type: string
 *                              content:
 *                                  type: object
 *          400:
 *              description: Wrong token
 *          401:
 *              description: Invalid headers credentials
 */
router.get('/get-user', getUser);

router.get('/get-all-reports', getAllReports);
router.get('/verify/:id/:token', emailVerification);
router.get('/send-email-again/:id/:token', sendEmailAgain);

export default router;
