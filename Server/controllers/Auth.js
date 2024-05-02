const User = require('../models/User');
const OTP = require('../models/OTP');
const Profile = require('../models/Profile');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mailTemplates/emailVerification");

//send otp function
exports.sendOTP = async(req, res) => {
    try{

        //fetch email from request body
        const {email} = req.body;
        //check if user already exists
        const chechUserPresence = await User.findOne({email});
        //if user present send a response
        if( chechUserPresence ){
            return res.status(401).json({
                success:"False",
                message:"User already exists.",
            });
        }
        //generate otp 
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false, 
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        //check uniqueness of otp
        let result = await OTP.findOne({otp:otp});

        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false, 
                lowerCaseAlphabets:false,
                specialChars:false,
            });

            result = await OTP.findOne({otp:otp});
        }
        console.log("Generated OTP :", otp);

        const otpPayLoad = { email, otp };

        //create a db entry for otp
        const otpBody = await OTP.create(otpPayLoad);
        console.log(otpBody);

        try {                                                          // Send notification email , here passwordUpdated is template of email which is send to user;
			const emailResponse = await mailSender(email, "Verification mail from StudyPilot", otpTemplate(otp));
			console.log("Email sent successfully:", emailResponse.response);
		   } 
        catch(error) {
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

        //return success response
        res.status(200).json({
            success:true,
            message:"OTP generation successful",
            otp,
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


//sign up function
exports.signup = async(req, res) => {
    try{
        //fetch all the data from the request body
        const {
            firstName, lastName, email,
            password, confirmPassword, accountType,
            contactNumber, otp
        } = req.body;
        //validation of extracted data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"All fields are compulsory",
            });
        }
        //password validation
        if( password !== confirmPassword ){
            return res.status(400).json({
                success:false,
                message:"Password are not matching",
            });
        }
        //check whether user is new or existing 
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists.",
            });
        }
        //find most updated otp for user
        const recentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        //console.log(recentOTP.otp);
        if(recentOTP.length === 0){
            //otp not found
            return res.status(400).json({
                success:false,
                message:"OTP not found.",
            });
        } else if( otp !== recentOTP[0].otp ){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
            });
        }
        //hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // entry creation in db
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });

        const user = await User.create({
            firstName, lastName, email,
            contactNumber, password:hashedPassword, accountType,
            additionalDetails : profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        //return response
        return res.status(200).json({
            success:true,
            message:"SignUp Successful.",
            user,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while registering user. Please try again later.",
        });
    }



};


//login function 
exports.login = async(req,res) =>  {
    try{
        //data fetching from request body
        const { email, password } = req.body;
        //data validation 
        if( !email || !password ){
            return res.status(403).json({
                success:false,
                message:"All fields are mandatory.",
            });
        }
        //validate whether user exists or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User doesnot exists. Please signin first.",
            });
        }
        //validate password and then generate jwt token
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            user.token = token;
            user.password = undefined;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 2*24*60*60*1000),
                httpOnly:true,
            };
            res.cookie("token", token , options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in Successfully",
            })

        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password Incorrect",
            });
        }

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while logging in. Please try again later.",
        });
    }
};

//reset Password
exports.changePassword = async(req, res) => {
    //extract data from request body
    //get oldpassword, newPassword and confirmPassword
    //perform validation -> empty, oldPassword match and newPassword and confirmPassword matching and newPassword not equals to oldPassword
    //update password in data base
    //send mail
    //return response
};