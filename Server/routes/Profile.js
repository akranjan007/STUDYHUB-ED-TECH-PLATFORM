const express = require('express');
const router = express.Router();

const { updateProfile, deleteAccount , getUserDetails, updateProfilePicture, getEnrolledCourses } = require('../controllers/Profile');
const { auth } = require('../middlewares/auth');


//profile routes

//delete route
router.delete("/deleteProfile", auth,  deleteAccount);
//update profile route
router.put("/updateProfile", auth, updateProfile);
//get user details routes
router.get("/getUserDetails", auth, getUserDetails);
//get enrolled courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
//update profile picture
router.put("/updateProfilePicture", auth, updateProfilePicture);



//exporting
module.exports = router;