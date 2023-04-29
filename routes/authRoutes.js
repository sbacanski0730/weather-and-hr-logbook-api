import express from 'express';
import loginUser from '../controller/loginUser.js';
import registerUser from '../controller/registerUser.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
