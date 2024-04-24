const Course = require('../models/Course');
const Tag = require('../models/Tag');
const Category = require('../models/categories');
const User = require('../models/User');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

//createCourse handler function
exports.createCourse = async(req, res) => {
    try{
        //fetch data from request body
        const { courseName, courseDescription, whatYouWillLearn, price, tag, category } = req.body;
        //get thumbnail
        const thumbnail = req.files.thumbnailImage;
        console.log(thumbnail);
        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !category || !thumbnail){
            return res.status(401).json({
                success:false,
                message:"All fields are required.",
            });
        }
        //check for instructor
        const userId = req.user.id;
        //to be checked if userId and instructorDetails._id are same
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details : ", instructorDetails );
        //validate instructor details
        if(!instructorDetails){
            return res.status(401).json({
                success:false,
                message:"Instructor details not found",
            });
        }
        //validate the category details
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(401).json({
                success:false,
                message:"Category details not found",
            });
        }
        //upload thumbnail to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        //create a  new course entry for database
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag,
            categories:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
        });
        //add new course id into the user schema of instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses : newCourse._id,
                }
            },
            {new:true},
        )
        //update tag schema
        //self

        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while creating course",
        });
    }
};

//getAllCourses handler function
exports.showAllCourses = async(req, res) => {
    try{
        const allCourses = await Course.find({}, {courseName:true,
                                                    price:true,
                                                    thumbnail:true,
                                                    instructor:true,
                                                    ratingAndReviews:true,
                                                    studentsEnrolled:true,
                                                    }).populate("instructor").exec();
        return res.status(200).json({
            success:true,
            message:"All courses are fetched successfully.",
            data:allCourses,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while fetching all courses.",
        });
    }
};

//getCourseDetails
exports.getCourseDetails = async(req, res) => {
    try{
        //get id
        const {courseId} = req.body;
        //find course details
        const courseDetails = await Course.find(
                                                {_id:courseId})
                                                .populate(
                                                    {
                                                        path:"instructor",
                                                        populate:{
                                                            path:"additionalDetails",
                                                        }
                                                    } 
                                                )
                                                .populate("categories")
                                                .populate("ratingAndReviews")
                                                .populate({
                                                    path:"courseContent",
                                                    populate:{
                                                        path:"subSection",
                                                    },
                                                })
                                                .exec();
        //validation of coureDetails
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find the course details of coures id ${courseId}`,
            });
        }
        //return response 
        return res.status(200).json({
            success:true,
            message:"Course Details has been fetched successfully.",
            data:courseDetails,
        });
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};