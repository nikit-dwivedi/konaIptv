var schedule = require('node-schedule');
const userModel = require('../models/user.model');


exports.setSchedular =async (userId, date) => {
    schedule.scheduleJob(date,async function () {
        await userModel.findOneAndUpdate({ userId }, { isSub: false })
    });
}