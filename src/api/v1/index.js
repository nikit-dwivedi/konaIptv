const express = require("express");
const router = express.Router();

require("../v1/config/mongodb");

const userRoute = require("./routes/user.route.js");

router.use("/user", userRoute);

module.exports = router;
