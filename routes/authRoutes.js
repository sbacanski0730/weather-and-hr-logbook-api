const router = require('express').Router();

const registerFunction = require('../controller/auth/registerFunction');
const loginFunction = require('../controller/auth/loginFunction.js');

router.post('/register', registerFunction);
router.post('/login', loginFunction);

module.exports = router;
