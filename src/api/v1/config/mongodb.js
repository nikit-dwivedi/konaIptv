const mongoose = require("mongoose");
db = mongoose.connect(
  "",
  (err) => {
    console.log("Database connected");
    if (err) {
      console.log(err);
    }
  }
);
module.exports = { db };
