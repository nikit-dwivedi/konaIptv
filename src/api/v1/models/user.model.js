const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isSub: {
    type: Boolean,
    default: false
  },
  startDate:{
    type:String
  },
  endDate:{
    type:String
  },
  otp: {
    type: String,
  },
  reqId: {
    type: String,
    unique: true
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isLogin: {
    type: Boolean,
    default: true
  },
  noOfOtp: {
    type: Number,
    default: 0
  },
  date: {
    type: Number,
  }
}, { timestamps: true })

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;