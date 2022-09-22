const { categoryList, liveByCategory } = require("../helpers/live.helper");
const { success, badRequest, unknownError } = require("../helpers/response_helper");
const { livePlayableUrl } = require("../service/url.service");

exports.getCategory = async (req, res) => {
    try {
        const data = await categoryList();
        return data ? success(res, "category list", data) : badRequest(res, "no category found", [])
    } catch (error) {
        return unknownError(res, "unknown error")
    }
}
exports.getliveByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params
        const data = await liveByCategory(categoryId);
        let channelList = []
        for (const channel of data) {
            let { stream_icon, name, stream_id } = channel
            const playableUrl = livePlayableUrl(stream_id)
            channelList.push({ stream_icon, name, playableUrl })
        }
        return data ? success(res, "list of live channel", channelList) : badRequest(res, "no category found", [])
    } catch (error) {
        return unknownError(res, "unknown error")
    }
}
