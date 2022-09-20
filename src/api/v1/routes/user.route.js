const express = require("express");
const router = express.Router();

const { register, emailVerification, login, sendOtp, otpVerification, changeCurrentPassword } = require('../controller/user.controller.js');
const { authenticateUser } = require("../middleware/authToken.js");

router.post('/register', register);
router.post('/verify', emailVerification);
router.post('/login',login);
router.post('/otp/send',sendOtp);
router.post('/otp/verify',otpVerification);
router.post('/change/password',authenticateUser,changeCurrentPassword);

module.exports = router;