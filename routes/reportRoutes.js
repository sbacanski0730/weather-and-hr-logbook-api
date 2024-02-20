import express from 'express';
import addReport from '../controller/addReport.js';
import deleteReport from '../controller/deleteReport.js';
import updateReport from '../controller/updateReport.js';
import getReport from '../controller/getReport.js';

const router = express.Router();

/**
 *  @swagger
 *  /report/add:
 *      post:
 *          tags:
 *          - Report
 *          summary: Report adding
 *          description: Allows adding reports
 *          parameters:
 *              - name: token
 *                in: header
 *                schema:
 *                  type: string
 *                required: true
 *                example: 1d23asd1a1wd35ad1as3d1
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              title:
 *                                  type: string
 *                              date:
 *                                  type: string
 *                              sky_status:
 *                                  type: string
 *                              ship_status:
 *                                  type: string
 *                              wind_speed:
 *                                  type: integer
 *                              ship_localization:
 *                                  type: string
 *                              startHarbour:
 *                                  type: string
 *                              destinationHarbour:
 *                                  type: string
 *                              watchNumber:
 *                                  type: string
 *                              content:
 *                                  type: string
 *          responses:
 *              201:
 *                  description: Report created
 *              400:
 *                  description: Credentials problem
 *              401:
 *                  description: Invalid token
 */
router.post('/add', addReport);
/**
 *  @swagger
 *  /report/delete/:id:
 *  delete:
 *      tags:
 *      - Report
 *      summary: Delete report
 *      description: Delete report
 *      parameters:
 *          - name: token
 *            in: header
 *            schema:
 *                  type: string
 *            require: true
 *            example: 1d23asd1a1wd35ad1as3d1
 *          - name: id
 *            in: path
 *            schema:
 *              type: string
 *              example: 23154asd42qak54e
 *      responses:
 *          200:
 *              description: Proper report delete
 *          400:
 *              description: Wrong request
 */
router.delete('/delete/:id', deleteReport);
/**
 *  @swagger
 *  /report/update/:
 *  put:
 *      tags:
 *      - Report
 *      summary: Update report
 *      description: Update report
 *      parameters:
 *          - name: token
 *            in: header
 *            schema:
 *                  type: string
 *            require: true
 *            example: 1d23asd1a1wd35ad1as3d1
 *      requestBody:
 *          description: Report update data
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                          title:
 *                              type: string
 *                          data:
 *                              type: string
 *                          sky_state:
 *                              type: string
 *      responses:
 *          200:
 *              description: Report updated
 *          400:
 *              description: Report doesn't exist
 *          404:
 *              description: Wrong credentials
 */
router.put('/update', updateReport);
/**
 *  @swagger
 *  /report/:id/:
 *  get:
 *      tags:
 *      - Report
 *      summary: Get report
 *      description: Get report by id
 *      parameters:
 *          - name: id
 *            in: header
 *            schema:
 *                  type: string
 *            require: true
 *            example: 1d23asd1a1wd35ad1as3d1
 *      responses:
 *          200:
 *              description: Report updated
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
 *                                  example: Report found
 *                              content:
 *                                  type: object
 *          400:
 *              description: Wrong credentials
 */
router.get('/:id', getReport);

export default router;
