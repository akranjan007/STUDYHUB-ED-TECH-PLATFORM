const express = require('express');
const router = express.Router();


const { auth, isStudent, isAdmin, isInstructor } = require('../middlewares/auth');

const { createCourse, showAllCourses, getCourseDetails } = require('../controllers/Course');
const {createCategory, getAllCategories, categoryPageDetails} = require('../controllers/Categories');
const {createRating, getAverageRating, getAllRatingAndReviews} = require('../controllers/RatingAndReview');
const {createSection, updateSection, deleteSection} = require('../controllers/Section');
const {createSubSection, updateSubSection, deleteSubSection} = require('../controllers/SubSection');

//    <---   course routes   --->

//course creation
router.post("/createCourse", auth, isInstructor, createCourse);
//show all courses route
router.get("/showAllCourses", showAllCourses);
//get course details route
router.get("/getCourseDetails", getCourseDetails);

//SECTION ROUTES
//create/add section
router.post("/createSection", auth, isInstructor, createSection);
//delete section
router.delete("/deleteSection", auth, isInstructor, deleteSection);
//update section
router.put("/updateSection", auth, isInstructor, updateSection);

//SUB-SECTION ROUTES
//create/add subsection
router.post("/createSubSection", auth, isInstructor, createSubSection);
//delete sub section
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);
//update sub section
router.put("/updateSubSection", auth, isInstructor, updateSubSection);




//categories routes
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/getAllCategories", getAllCategories);
router.post("/categoryPageDetails", categoryPageDetails);


//rating and review route
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getAllRatingsAndReviews", getAllRatingAndReviews);


//exporting
module.exports = router;
