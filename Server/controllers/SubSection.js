const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

//handler function for creating sub section 
exports.createSubSection = async(req, res) => {
    try{
        //extract data from request 
        const {sectionId, title, timeDuration, description} = req.body;
        //extract video
        const video = req.files.videoFile;
        //validation
        if( !sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:'All fields are mandatory for sub section creation.',
            });
        }
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        //create sub section
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        });
        console.log(subSectionDetails)
        //update section with this sub section object id
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId}, 
                                                                {
                                                                    $push:{
                                                                        subSection:subSectionDetails._id,
                                                                    }
                                                                },
                                                                {new:true});
        //log updatedDetails after populating all the other details
        //return response
        return res.status(200).json({
            success:true,
            message:'Sub section created successfully.',
            updatedSection,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Error while creating sub section , please try again later.',
        });
    }
};

//sub section update handler
exports.updateSubSection = async(req, res) => {

};

//sub section delete handler
exports.deleteSubSection = async(req, res) => {
    try{
        //get id of section to be deleted - assuming that we are sending id in parameters
        const {subSectionId} = req.params;
        //delete db entry using id
        await SubSection.findByIdAndDelete(subSectionId);
        //do we need to delete this section from the course schema
        //return response
        return res.status(200).json({
            success:true,
            message:'Sub Section deleted successfully.',
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Error while deleting sub section, please try again later.',
            error:error.message,
        });
    }
};