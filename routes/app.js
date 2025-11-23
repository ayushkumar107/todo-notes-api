const express=require("express");


const router=express.Router();
const {handleCreateNewTodo}=require("../controllers/app")



router.post("/",handleCreateNewTodo);


module.exports=router;


