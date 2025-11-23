const express=require("express");


const router=express.Router();
const {handleCreateNewTodo,handleViewAllTODO}=require("../controllers/app")



router.post("/",handleCreateNewTodo);
router.get("/",handleViewAllTODO);


module.exports=router;


