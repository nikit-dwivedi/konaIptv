const express = require("express");
const router = express.Router();

const { register, emailVerification, login, sendOtp, otpVerification, changeCurrentPassword, markUserSubscribed, getAllUsers, changeBlockStatus, getBloackedUsers, passwordCheck } = require('../controller/user.controller.js');
const { authenticateUser, authenticateAdmin } = require("../middleware/authToken.js");

router.post('/register', register);
router.post('/verify', emailVerification);
router.post('/login', login);
router.post('/otp/send', sendOtp);
router.post('/otp/verify', otpVerification);
router.get('/block/:userId', changeBlockStatus);
router.get('/block', getBloackedUsers)
router.post('/change/password', authenticateUser, changeCurrentPassword);
router.post('/sub', markUserSubscribed)
router.get('/all', getAllUsers)
router.post('/check', authenticateUser, passwordCheck)

module.exports = router;