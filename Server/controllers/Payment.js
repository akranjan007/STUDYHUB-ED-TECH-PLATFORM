const {instance} = require('../config/razorpay');
const User = require('../models/User');
const Course = require('../models/Course');
const {mailSender} = require('../utils/mailSender');
//import courseEnrollment email template

exports.capturePayment = async(req, res) => {
    try{
        //get courseid and userid
        const {courseId} = req.body;
        const userId = req.user.id;
        //validate courseid
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Course id is not valid.",
            });
        }
        //validate course details corresponding to the coursId
        let course;
        try{
            course = await Course.findById(courseId);
            if(!course){
                return res.status(400).json({
                    success:false,
                    message:"could not find the course ",
                });
            }
            //check for already done payment for the course by the user
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:'User have already paid for course.'
                });
            }
        }
        catch(error){
            console.error(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            })
        }
        
        //create order
        const amount = course.price;
        const currency = "INR";

        const options = {
            amount : amount *100,
            currency,
            receipt:Math.random(Date.now()).toString(),
            notes:{
                courseId,
                userId

            }
        };

        try{
            //initiate payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);
            //return response
            return res.status(200).json({
                success:true,
                message:"Order created successfully.",
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderId:paymentResponse.id,
                amount:paymentResponse.amount,
                currency:paymentResponse.currency,
            });
        }
        catch(error){
            console.log(error);
            return res.status(400).json({
                success:false,
                message:"Could not initiate order."
            });
        }
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error while capturing payment.'
        });
    }
};


//verify signature from razorpay and server
exports.verifySignature = async(req, res) => {
    //fetch server signature
    const webhookSecret = "asdfghjkl";
    //fetch razorpay signature
    const signature = req.headers["x-razorpay-signature"];
    //encryption of webhookSecret for comparison with signature
    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    //comparison 
    if(digest === signature){
        console.log("Payment is authorised.");

        //fetch courseId and userId from the notes object of response sent by razorpay
        const {courseId, usersId} = req.body.payload.payment.entity.notes;
        try{
            //find the course and update db
            const enrolledCourse = await Course.findOneAndUpdate(
                                                                {_id:courseId},
                                                                {$push:{studentsEnrolled:userId}},
                                                                {new:true}
                                                                );
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:'Course not found',
                });
            }
            console.log(enrolledCourse);
            //find the user and update db
            const enrolledStudent = await User.findOneAndUpdate(
                                                                {_id:userId},
                                                                {$push:{courses:courseId}},
                                                                {new:true},
                                                                );
            if(!enrolledStudent){
                return res.status(500).json({
                    success:false,
                    message:"User not found",
                });
            }
            console.log(enrolledStudent);
            //send confirmation email to the user
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congratulations",
                "Congratulations, We come to studyPilot."
            );
            console.log(emailResponse);
            return res.status(200).json({
                success:true,
                message:"Signature verified and confirmation email sent to the user.",
            });
        }
        catch(error){
            console.log(error)
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Signature verification failed. or Invalid Request",
        });
    }

};