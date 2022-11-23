const express = require('express');
const { login, loginStatus, logout } = require('../controllers/AuthController');
const loginLimiter = require('../middleware/loginLimiter');

const router = express.Router();

router.post('/login', loginLimiter, login);
router.get('/loginStatus', loginStatus);
router.get('/logout', logout);

module.exports = router;
