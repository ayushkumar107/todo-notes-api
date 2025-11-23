const mongoose=require("mongoose");



const noteSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true

    },
    description:{
        type:String,
        default:"",

    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},{
    timestamps:true
})

const List=mongoose.model("todo",noteSchema);



module.exports=List;