const mongoose = require('mongoose');
const Schema = mongoose.Schema

const channelSchema = new Schema({
    stream_icon: {
        type: String
    },
    name: {
        type: String
    },
    playableUrl: {
        type: String
    }
})

const playlistSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    playlistId: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    channel: {
        type: [channelSchema],
        required: true,
        default: []
    },
})

const playlistModel = mongoose.model('playlist', playlistSchema);
module.exports = playlistModel