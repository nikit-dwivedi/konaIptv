const mongoose = require('mongoose');
const Schema = mongoose.Schema

const adminSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
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
    reqId: {
        type: String
    },
    otp: {
        type: Number
    }
})

const adminModel = mongoose.model('admin', adminSchema);
module.exports = adminModel