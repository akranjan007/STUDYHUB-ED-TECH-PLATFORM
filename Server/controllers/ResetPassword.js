const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');


//resetPasswordToken
exports.resetPasswordToken = async(req, res) => {
    try{
        //extract email from request body
        const email = req.body.email;
        //email verification
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Your email is not registered with us.",
            });
        }
        //generate token
        const token = crypto.randomUUID();
        //update user in database by token and its expiry details
        const updatedDetails = await User.findOneAndUpdate(
                                                            {email:email},
                                                            {
                                                                token:token,
                                                                resetPasswordExpires: Date.now() + 10*60*1000,
                                                            },
                                                            {new:true});
        //create frontend url
        const url = `http://localhost:3000/update-password/${token}`;
        //send mail with resetPassword url
        await mailSender(email,
                            "Password Reset Link",
                            `Password Reset Link : ${url}`);
        //return response
        return res.status(200).json({
            success:true,
            message:"Reset Link sent successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while reseting password, try again later.",
        });
    }
};

//resetPassword
exports.resetPassword = async(req, res) => {
    try{
        //extract data from req body -> confPass, pass, token
        const { password, confirmPassword, token } = req.body;
        //data validation 
        if(!password || !confirmPassword || !token){
            return res.status(401).json({
                success:false,
                message:"All field are mandatory."
            });
        }
        if(password !== confirmPassword){
            return res.status(402).json({
                success:false,
                message:"Password and Confirm Password are not matching",
            });
        }
        //fetch data from database using token
        const userDetails = await User.findOne({token:token});
        console.log(userDetails);
        //if no db entry - invalid token
        if(!userDetails){
            return res.status(402).json({
                success:false,
                message:"Token Invalid",
            });
        }
        //token expiry check 
        if( userDetails.resetPasswordExpires < Date.now() ){
            return res.json({
                success:false,
                message:"Token Expired",
            });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //password update
        await User.findOneAndUpdate({token:token},
                                    {
                                        password:hashedPassword,
                                    },
                                    {new:true});
        //return response
        return res.status(200).json({
            success:true,
            message:"Password reset successfull",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while reseting password, try again later.",
        });
    }
};