const { categoryList, liveByCategory } = require("../helpers/live.helper");
const { success, badRequest, unknownError } = require("../helpers/response_helper");

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
        return data ? success(res, "list of live channel", data) : badRequest(res, "no category found", [])
    } catch (error) {
        return unknownError(res, "unknown error")
    }
}
