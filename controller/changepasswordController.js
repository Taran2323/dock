const User = require("../models/clockSchema");
var CryptoJS = require("crypto-js");
const { Validator } = require("node-input-validator");
const helper = require("../middleware/helper");
// const helper3 =require("../midlleware/helper")

const secret = "testingEncription123@";
module.exports = {
   changePassword: async (req, res) => {
    try {
      const id = req.user._id;

      const userInfo = await User.findOne({
        _id: id,
      });

      var passwordBytes = CryptoJS.AES.decrypt(userInfo.password, secret);

      var originalText = passwordBytes.toString(CryptoJS.enc.Utf8);

      const v = new Validator(req.body, {
        oldPassword: "required",
        newPassword: "required",
        confirmNewPassword: "required|same:newPassword",
      });

      const values = JSON.parse(JSON.stringify(v));

      let errorsResponse = await helper.checkValidation(v);

      if (errorsResponse) {
        return helper.failed(res, errorsResponse);
      }

      if (originalText == req.body.oldPassword) {
        var cipherPass = CryptoJS.AES.encrypt(
          values.inputs.newPassword,
          secret
        ).toString();

        await User.findByIdAndUpdate(
          { _id: id },
          {
            password: cipherPass,
          }
        );

        return helper.success(res, "Password Change successfully");
          }  else {
        return helper.failed(res, "old password does Not matched");
      }
    } catch (error) {
      helper.error(res, error);
      console.log(error);
    }
  },
};

