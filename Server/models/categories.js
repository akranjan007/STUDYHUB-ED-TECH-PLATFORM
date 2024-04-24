const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
        },
    ],
});

module.exports = mongoose.model("Categories", categoriesSchema);