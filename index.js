const express=require("express");
const {connectDB}=require("./connection")



const app=express();
const PORT=6000;

//connection
connectDB("mongodb://127.0.0.1:27017/todo1").then(()=>{
    console.log("mongodb connected...");
});


app.listen(PORT,()=>{
    console.log(`Server is started at ${PORT}`);
})