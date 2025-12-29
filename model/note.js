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
        required:true,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    deletedAt:{
        type:Date,
        default:null,
    }
},{
    timestamps:true
})

const List=mongoose.model("todo",noteSchema);



module.exports=List;