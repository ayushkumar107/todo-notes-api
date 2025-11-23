const mongoose=require("mongoose");



const noteSchema =new mongoose.Schema({
    title:{
        type:String,

    },
    description:{
        type:String,
    }
})