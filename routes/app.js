const express = require("express");

const router = express.Router();
const {
  handleCreateNewTodo,
  handleViewAllTODO,
  handleTodoToggleCompletion,
  handleDeleteTodo,
  handleUpdateTODO,
  handleViewCheckTodo,
  handleGetTodo,
  handleGetSortTodo,
  handleSearchTodo,handleSoftDeleteTodo,handleTodoRestore,
} = require("../controllers/app");
const authMiddleware=require("../middlewares/auth");


router.post("/",authMiddleware, handleCreateNewTodo);
router.get("/",authMiddleware, handleViewAllTODO);
router.patch("/:id/completed", handleTodoToggleCompletion);
router.delete("/:id",authMiddleware, handleDeleteTodo);
router.put("/:id", handleUpdateTODO);
router.get("/get-all-todo", handleViewCheckTodo);
router.get("/getTodo", handleGetTodo);
router.get("/get-allTodo", handleGetSortTodo);
router.get("/search", handleSearchTodo);
router.delete("/soft/:id",handleSoftDeleteTodo);
router.patch("/restore/:id",handleTodoRestore);


module.exports = router;
