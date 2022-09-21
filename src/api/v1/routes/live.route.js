const express = require("express");
const router = express.Router();

const { getCategory, getliveByCategory } = require('../controller/live.controller.js');
const { authenticateVerifiedyUser } = require("../middleware/authToken.js");

router.get('/category', getCategory);
router.get('/category/:categoryId', authenticateVerifiedyUser, getliveByCategory);

module.exports = router;