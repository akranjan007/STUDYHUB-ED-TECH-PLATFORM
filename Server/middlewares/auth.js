const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

//auth
exports.auth = async(req, res, next) => {
    try{
        //extract token
        const token = req.cookies.token
                        || req.body.token
                        || req.header("Authorisation").replace("Bearer ", "");
        console.log(token);

        //token validation -> missing token
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is Missing",
            });
        }

        //token verification
        try{
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(error){
            //verification issue
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
            });
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating token.",
        });
    }
};

//isStudent
exports.isStudent = async(req, res, next) => {
    try{
        //accoun role check
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Students.",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while verifying account role, please try again later.",
        });
    }
};

//isInstructor
exports.isInstructor = async(req, res, next) => {
    try{
        //accoun role check
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructors.",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while verifying account role, please try again later.",
        });
    }
};

//isAdmin
exports.isAdmin = async(req, res, next) => {
    try{
        //accoun role check
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin.",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while verifying account role, please try again later.",
        });
    }
};