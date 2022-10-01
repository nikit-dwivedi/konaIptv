const adminModel = require('../models/admin.model');
const { randomBytes } = require('node:crypto');
const { encryption, checkEncryption, generateAdminToken } = require('../middleware/authToken');


exports.addAdmin = async (bodyData) => {
    try {
        const { email, username, password } = bodyData
        if (!email && !username && !password) {
            return { staus: false, message: "please provide proper feild", data: {} }
        }
        const adminCheck =await adminModel.find()
        if (adminCheck[0]) {
            return { staus: false, message: "can't added multiple admin", data: {} }
        }
        const userId = randomBytes(4).toString('hex')
        const encryptedPassword = await encryption(password)
        const formattedData = { userId, email, username, password: encryptedPassword }
        const saveData = new adminModel(formattedData)
        await saveData.save()
        return { status: true, message: "admin added", data: {} }
    } catch (error) {
        return { staus: false, message: error.message, data: {} }
    }
}

exports.checkLogin = async (username, password) => {
    try {
        const userData = await adminModel.findOne({ username });
        if (!userData) {
            return { status: false, message: "wrong credential", data: "" };
        }
        const passwordCheck = await checkEncryption(password, userData.password);
        if (!passwordCheck) {
            return { status: false, message: "wrong credential", data: "" };
        }
        const token = generateAdminToken(userData);
        return { status: true, message: "successfully login", data: token };
    } catch (error) {
        console.log(error);
        return { status: false, message: error.message, data: "" };
    }
}