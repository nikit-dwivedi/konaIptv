const express = require("express");
const router = express.Router();

require("../v1/config/mongodb");

const userRoute = require("./routes/user.route.js");
const liveRoute = require('./routes/live.route.js')

router.use("/user", userRoute);
router.use('/live',liveRoute)

module.exports = router;
