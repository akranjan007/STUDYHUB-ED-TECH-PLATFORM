const Profile = require('../models/Profile');
const User = require('../models/User');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

//update profile handler function 
exports.updateProfile = async(req, res) => {
    try{
        //fetch data from request body
        const {dateOfBirth="", about="", gender, contactNumber } = req.body;
        //get userId
        const id = req.user.id;
        //validate data
        if(!gender || !contactNumber || !id){
            return res.status(400).json({
                success:false,
                message:'All mandatory marked fields are must.',
            });
        }
        //find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        //update data into database
        profileDetails.dateOfBirth =  dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();
        //return response
        return res.status(200).json({
            success:true,
            message:'Profile Update Successfull.',
            profileDetails,
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while updating profile, please try again later.",
        });
    }
};

//delete profile handler
exports.deleteAccount = async(req,res) => {
    try{
        //get id
        const id = req.user.id;
        //validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:'User not found.',
            });
        }
        //un enroll user from courses
        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //delete user
        await User.findByIdAndDelete({_id:id});
        //return response
        return res.status(200).json({
            success:true,
            message:'User Account deleted successfully.'
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error while deleting Account.',
            message1:error.message,
        });
    }
};

//getAllUserDetails handler
exports.getUserDetails = async(req, res) => {
    try{
        //get id
        const id = req.user.id;
        console.log(id)
        //fetch all detailse
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        //validate
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found.",
            });
        }
        //return response
        return res.status(200).json({
            success:true,
            message:"All user details have been fetched.",
            userDetails,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while fetching all users details.",
        });
    }
};

//update profile picture handler function
exports.updateProfilePicture = async(req, res) => {
    try{
        const userId = req.user.id;
        const file = req.files.file;
        console.log(file);
        /*let path = __dirname + "/files/" + Date.now()+".png";
        file.mv(path, (error) => {
            console.log(error);
            return res.json({
                success:false
            })
        })*/
        if(!userId || !file){
            return res.status(400).json({
                success:false,
                message:"Informations are missing.",
                userId,
                file,
            });
        }
        const newDP = await uploadImageToCloudinary(file, process.env.FOLDER_NAME);
        const user = await User.findByIdAndUpdate({_id:userId},
                                                        {
                                                            $set: {        // Use $set to update the 'image' field
                                                                image: newDP.secure_url
                                                            }
                                                        },
                                                        {new:true});
        return res.status(200).json({
            success:true,
            message:"New Profile picture updated",
            user,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while updating profile picture.",
            mes:error.message,
        });
    }
};

//all enrolled courses fetching function
exports.getEnrolledCourses = async(req, res) => {
    try {
        const userId = req.user.id
        let userDetails = await User.findOne({
          _id: userId,
        })
          .populate({
            path: "courses",
            populate: {
              path: "courseContent",
              populate: {
                path: "subSection",
              },
            },
          })
          .exec()
        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
          let totalDurationInSeconds = 0
          SubsectionLength = 0
          for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
            totalDurationInSeconds += userDetails.courses[i].courseContent[
              j
            ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
            userDetails.courses[i].totalDuration = convertSecondsToDuration(
              totalDurationInSeconds
            )
            SubsectionLength +=
              userDetails.courses[i].courseContent[j].subSection.length
          }
          let courseProgressCount = await CourseProgress.findOne({
            courseID: userDetails.courses[i]._id,
            userId: userId,
          })
          courseProgressCount = courseProgressCount?.completedVideos.length
          if (SubsectionLength === 0) {
            userDetails.courses[i].progressPercentage = 100
          } else {
            // To make it up to 2 decimal point
            const multiplier = Math.pow(10, 2)
            userDetails.courses[i].progressPercentage =
              Math.round(
                (courseProgressCount / SubsectionLength) * 100 * multiplier
              ) / multiplier
          }
        }
    
        if (!userDetails) {
          return res.status(400).json({
            success: false,
            message: `Could not find user with id: ${userDetails}`,
          })
        }
        return res.status(200).json({
          success: true,
          data: userDetails.courses,
        })
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })
      }
};