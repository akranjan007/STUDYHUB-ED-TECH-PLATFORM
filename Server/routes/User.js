const express = require('express');
const router = express.Router();

const { login , signUp , sendOTP, changePassword } = require('../controllers/Auth');
const { resetPasswordToken , resetPassword } = require('../controllers/ResetPassword');
const { auth } = require('../middlewares/auth');


//routes for login , singup and authentication

//login route
router.post("/login", login);
//signup route
router.post("/signup", signUp);
//route for sending otp to user mail
router.post("/sendotp", sendOTP);
//route for changing the password
router.post("/changepassword", auth, changePassword);


//reset password

//route for generating reset password token
router.post("/reset-password-token", resetPasswordToken);
//route for resetting password after verification
router.post("/reset-password", resetPassword);


//exporting
module.exports = router;