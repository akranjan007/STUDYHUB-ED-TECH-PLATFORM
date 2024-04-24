/*
const Tag = require('../models/Tag');

//tag handler function
exports.createTag = async(req, res) => {
    try{
        //extract data from the request body
        const { name, description } = req.body;
        //data validation
        if(!name || !description){
            return res.status(401).json({
                success:false,
                message:"All fields are mandatory.",
            });
        }
        //create entry in DataBase
        const tagDetails = await Tag.create({
            name:name,
            description:description,
        });
        console.log(tagDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Tag created Successfully.",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while creating Tag.",
        });
    }
};


//getAllTag handler function
exports.getAllTags = async(req, res) => {
    try{
        //fetch all tags from db with name and description details
        const allTags = await Tag.find({}, {name:true, description:true});
        return res.status(200).json({
            success:true,
            message:"All tags fetched Successfully.",
            allTags,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while fetching all Tags.",
        });
    }
};
*/