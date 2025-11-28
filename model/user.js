const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        lowerCase:true,
    },
    password:{
        type:string,
        required:true,
        minlength:6,
    },
},{timestamps:true});


const User=mongoose.model("user",userSchema);

module.export=User;