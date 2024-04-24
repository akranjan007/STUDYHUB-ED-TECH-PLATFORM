const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');

//create rating
exports.createRating = async(req, res) => {
    try{
        //fetch userId
        const userId = req.user.id;
        //fetch data from the request body
        const { rating, review, courseId } = req.body;
        //validate data
        //check if user is enrolled or not
        const courseDetails = await Course.findOne({_id:courseId, studentsEnrolled : {$eleMatch:{$eq:userId}}});
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course.',
            });
        }
        //check if user has already rated or not
        const alreadyReviewed = await RatingAndReview.findOne({
                                                                user:userId,
                                                                course:courseId,
                                                            });
        if(alreadyReviewed){
            return res.status(400).json({
                success:false,
                message:'Course already reviewed by the user.',
            });
        }
        //create rating and review
        const ratingReview = await RatingAndReview.create({
                                                            rating, review,
                                                            course:courseId,
                                                            user:userId
                                                        });

        //update course with this rating and review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                        {
                                            $push:{
                                                ratingAndReviews:ratingReview._id,
                                            }
                                        },
                                        {new:true});
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review added successfully.",
            ratingReview,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error while creating rating and review.'
        })
    }
};

//find average rating
exports.getAverageRating = async(req, res) => {
    try{
        //fetch courseId
        const courseId = req.body.courseId;
        //calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ]);

        //return response rating 
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            });
        }
        //if no rating available
        return res.status(200).json({
            success:true,
            message:"No ratings till now.",
            averageRating:0,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error while fetching average rating and review.'
        })
    }
};

//fetch all the ratings and reviews
exports.getAllRatingAndReviews = async(req, res) => {
    try{
        //fetch all ratings and reviews
        const allReviews = await RatingAndReview.find({})
                                                .sort({rating:"desc"})
                                                .populate({
                                                    path:"user",
                                                    select:"firstName lastName email image",
                                                })
                                                .populate({
                                                    path:"course",
                                                    select:"courseName",
                                                })
                                                .exec();
        //return response
        return res.status(200).json({
            success:true,
            message:"All ratings and reviews are fetched.",
            data:allReviews,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error while fetching all ratings and reviews.'
        })
    }
};