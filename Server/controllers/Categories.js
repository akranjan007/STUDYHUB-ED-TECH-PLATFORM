const Categories = require('../models/categories');

//category creation handler function
exports.createCategory = async(req, res) => {
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
        const categoryDetails = await Categories.create({
            name:name,
            description:description,
        });
        console.log(categoryDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Category created Successfully.",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while creating Category.",
        });
    }
};


//getAllCategory handler function
exports.getAllCategories = async(req, res) => {
    try{
        //fetch all Categories from db with name and description details
        const allCategories = await Categories.find({}, {name:true, description:true});
        return res.status(200).json({
            success:true,
            message:"All Categories fetched Successfully.",
            allCategories,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while fetching all Categories.",
        });
    }
};

//category page details handler 
exports.categoryPageDetails = async(req, res) => {
    try{
        //get category id
        const {categoryId} = req.body;
        //fetch courses corresponding to the categoryId
        const selectedCategory = await Categories.findById(categoryId)
                                                    .populate("courses")
                                                    .exec();
        
        //validation 
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Date not found.",
            });
        }

        //get courses for different category id
        const differentCategory = await Categories.find({_id:{$ne:categoryId}})
                                                            .populate("courses")
                                                            .exec();
        //get top selling courses
        //return response
        return res.status(200).json({
            success:true,
            message:"All course corresponding to categoryId fetched.",
            data:{
                selectedCategory,
                differentCategory
            },
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while fetching categoryPageDetails.",
            mes:error.message,
        })
    }
};