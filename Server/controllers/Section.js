const Section = require('../models/Section');
const Course = require('../models/Course');

//handler function for creating section
exports.createSection = async(req, res) => {
    try{
        //data fetch
        const { sectionName, courseId } = req.body;
        //data validation
        if( !sectionName || !courseId ){
            return res.status(400).json({
                success:true,
                message:'Details are not complete, data missing.',

            });
        }
        //create section
        const newSection = await Section.create({sectionName});
        //update course with section objectId
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                            courseId,
                                                            {
                                                                $push:{
                                                                    courseContent:newSection._id,
                                                                }
                                                            },
                                                            {new:true}
                                                            );
        //use populate to add section / sub section details into updataCourseDetails
        //return response
        return res.status(200).json({
            success:true,
            message:'Section details added successfully.',
            updatedCourseDetails,
        });
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:'Error while creating section, please try again later.',
            error:error.message,
        });
    }
};

//handler function for updating section 
exports.updateSection = async(req, res) => {
    try{
        //data fetch
        const { sectionName, sectionId } = req.body;
        //data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:'Fields missing.',
            });
        }
        //update section
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});
        //return response
        return res.status(200).json({
            success:true,
            message:'Section update successful.',
        });
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:'Error while updating section, please try again later.',
            error:error.message,
        });
    }
};

//handler for deleting the section details
exports.deleteSection = async(req, res) => {
    try{
        //get id of section to be deleted - assuming that we are sending id in parameters
        const {sectionId, courseId} = req.body;
        //delete db entry using id
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                success:false, 
                message:"Course not found.",
            });
        }
        //console.log(course);
        //console.log(course.courseContent);
        course.courseContent.pull(sectionId);
        await course.save();
        //console.log(course.courseContent)
        const newSection = await Section.findByIdAndDelete(sectionId);
        //do we need to delete this section from the course schema
        //return response
        return res.status(200).json({
            success:true,
            message:'Section deleted successfully.',
            newSection,
        });
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:'Error while deleting section, please try again later.',
            error:error.message,
        });
    }
};