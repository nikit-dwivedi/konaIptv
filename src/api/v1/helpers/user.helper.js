const userModel = require('../models/user.model');
const { randomBytes } = require('node:crypto');
const { encryption, generateUserToken, checkEncryption, generateVerifiedyUserToken } = require('../middleware/authToken');
const { sendMail } = require('../service/mail.service');
const { setSchedular } = require('../service/schedule.service');

module.exports = {
  addUser: async (bodyData) => {
    try {
      const userId = randomBytes(4).toString('hex')
      const otp = Math.floor(Math.random() * (9999 - 1000) + 1000)
      const reqId = randomBytes(4).toString('hex')
      const encryptedPassword = await encryption(bodyData.password)
      const formattedData = {
        userId: userId,
        username: bodyData.username,
        fullName: bodyData.fullName,
        phone: bodyData.phone,
        password: encryptedPassword,
        email: bodyData.email,
        otp: otp,
        reqId: reqId
      }
      const saveData = await userModel(formattedData);
      await sendMail(bodyData.email, otp)
      return await saveData.save() ? reqId : false;
    } catch (error) {
      return false
    }
  },
  genrateOtp: async (email) => {
    const date = new Date
    const otp = Math.floor(Math.random() * (9999 - 1000) + 1000)
    const reqId = randomBytes(4).toString('hex')
    const updatedData = await userModel.findOne({ email })
    if (updatedData.noOfOtp >= 500 && updatedData.date == date.getDate()) {
      return 1
    }
    updatedData.otp = otp;
    updatedData.reqId = reqId;
    updatedData.noOfOtp += 1
    updatedData.date = date.getDate()
    const saveData = await updatedData.save()
    if (!saveData) {
      return false
    }
    await sendMail(email, otp)
    return reqId
  },
  verifyEmail: async (reqId, otp) => {
    try {
      const userData = await userModel.findOne({ reqId });

      if (!userData) {
        return false
      }
      if (userData.otp != otp) {
        return false
      }
      const token = generateVerifiedyUserToken(userData);
      userData.isVerified = true;
      userData.save()
      return token
    } catch (error) {
      return false
    }
  },
  checkLogin: async (username, password) => {
    try {
      const userData = await userModel.findOne({ username });
      if (!userData) {
        return false;
      }
      const passwordCheck = await checkEncryption(password, userData.password);
      console.log(passwordCheck);
      if (!passwordCheck) {
        return false;
      }
      if (userData.isSub) {
        userData.isLogin = true
        const token = generateVerifiedyUserToken(userData);
        await userData.save()
        return { token: token, isSub: userData.isSub }
      }
      const token = generateUserToken(userData);
      userData.isLogin = true
      await userData.save()
      return { token: token, isSub: userData.isSub };
    } catch (error) {
      console.log(error);
      return false
    }
  },
  changeSubscribeStatus: async (userId, status) => {
    try {
      const d = new Date()
      const newDate = addOneYear();
      let endDate = newDate.toDateString()
      let startDate = d.toDateString()
      const userData = await userModel.findOneAndUpdate({ userId }, { isSub: status, startDate, endDate })
      await setSchedular(userId, newDate)
      return userData ? true : false;
    } catch (error) {
      console.log(error);
      return false
    }
  },
  blockUser: async (userId) => {
    try {
      const userData = await userModel.findOne({ userId });
      if (!userData) {
        return false
      }
      userData.isBlocked = !userData.isBlocked
      return await userData.save() ? true : false;
    } catch (error) {
      return false
    }
  },
  allUsers: async () => {
    try {
      const subscribedUserList = await userModel.find({ isVerified: true, isActive: true, isSub: true, isBlocked: false }).select('userId username email endDate startDate')
      const unSubscribedUserList = await userModel.find({ isVerified: true, isActive: true, isSub: false, isBlocked: false }).select('userId username email')
      return subscribedUserList[0] || unSubscribedUserList[0] ? { subscribedUserList, unSubscribedUserList } : false;
    } catch (error) {
      return false
    }
  },
  blockUserList: async () => {
    try {
      const blockedUserList = await userModel.find({ isBlocked: true }).select('userId username email')
      return blockedUserList ? blockedUserList : false;
    } catch (error) {
      return false
    }
  },
  checkByEmail: async (email) => {
    try {
      const userData = await userModel.findOne({ email })
      return userData ? userData : false;
    } catch (error) {
      return true
    }
  },
  checkByUsername: async (username) => {
    try {
      const userData = await userModel.findOne({ username, isActive: true }).select('-_id userId username profileUrl phone email isVerified')
      return userData ? userData : false;
    } catch (error) {
      return false
    }
  },
  verifyOtp: async (reqId, otp) => {
    try {
      const newReqId = randomBytes(4).toString('hex')
      const userData = await userModel.findOne({ reqId });
      if (!userData) {
        return false
      }
      if (userData.otp == otp) {
        if (!userData.isVerified) {
          userData.isVerified = true
        }
        userData.isLogin = true
        const token = generateVerifiedyUserToken(userData);
        userData.noOfOtp = 0
        userData.otp = 0
        userData.reqId = newReqId
        await userData.save()
        return token
      }
      return false
    } catch (error) {
      return false
    }
  },
  changePassword: async (email, oldPassword, newPassword) => {
    try {
      const userData = await userModel.findOne({ email });
      if (oldPassword) {
        const passwordCheck = await checkEncryption(oldPassword, userData.password);
        if (!passwordCheck) {
          return false
        }
      }
      const encryptedPassword = await encryption(newPassword);
      userData.password = encryptedPassword;
      return await userData.save() ? true : false
    } catch (error) {
      return false
    }
  }

}
const genrateOtp = async (email) => {
  try {
    const otp = Math.floor(Math.random() * (9999 - 1000) + 1000)
    const reqId = randomBytes(4).toString('hex')
    const updatedData = await userModel.findOneAndUpdate({ email }, { otp, reqId })
    if (!updatedData) {
      return false
    }
    await sendMail(email, otp)
    return reqId
  } catch (error) {
    return false
  }
}
function addOneYear() {
  const d = new Date()
  d.setFullYear(d.getFullYear() + 1);
  return d;
}