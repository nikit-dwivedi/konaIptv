const express = require("express");
const router = express.Router();

const { register, login } = require("../controller/admin.controller.js");
// const { authenticateVerifiedyUser, authenticateAdmin } = require("../middleware/authToken.js");

router.post('/register', register);
router.post('/login', login);

module.exports = router;