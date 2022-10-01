const { addAdmin, checkLogin } = require("../helpers/admin.helper")
const { success, badRequest, unknownError } = require("../helpers/response_helper")

exports.register = async (req, res) => {
    try {
        const { status, message, data } = await addAdmin(req.body)
        return status ? success(res, message) : badRequest(res, message)
    } catch (error) {
        unknownError(res, error.message)
    }
}
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        const { status, message, data } = await checkLogin(username, password)
        return status ? success(res, message,data) : badRequest(res, message)
    } catch (error) {
        unknownError(res, error.message)
    }
}