const express=require("express");


const router=express.Router();
const {handleCreateNewTodo,handleViewAllTODO,handleTodoToggleCompletion}=require("../controllers/app")



router.post("/",handleCreateNewTodo);
router.get("/",handleViewAllTODO);
router.patch("/:id/completed",handleTodoToggleCompletion);


module.exports=router;


