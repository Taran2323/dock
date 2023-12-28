var express = require('express');
const signupConroller = require('../controller/signupConroller');
const { verifyToken } = require("../middleware/helper");
const loginController = require('../controller/loginController');
const { changePassword } = require("../controller/changepasswordController");
const changepasswordController = require('../controller/changepasswordController');


var router = express.Router();
const authenticateJWT = require("../middleware/helper").authenticateJWT;
/* GET home page. */
router.post("/signup",signupConroller.signup)
router.post("/verfy",signupConroller.verifyOtp);
router.post("/login", authenticateJWT,loginController.postlogin);
router.post( "/changepass",authenticateJWT,changepasswordController.changePassword);
router.get("/getprofile", authenticateJWT,signupConroller.getProfile);
router.post(
  "/updateprofile",
  authenticateJWT,signupConroller.updateprofile
);


module.exports = router;
