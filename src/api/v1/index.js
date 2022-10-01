const express = require("express");
const router = express.Router();

require("../v1/config/mongodb");

const userRoute = require("./routes/user.route.js");
const liveRoute = require('./routes/live.route.js');
const adminRoute = require('./routes/admin.route.js');

router.use("/user", userRoute);
router.use('/live',liveRoute)
router.use('/admin',adminRoute)

module.exports = router;
