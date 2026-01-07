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
  handleSearchTodo,handleHardDeleteTodo,handleTodoRestore,handleTrashView,
} = require("../controllers/app");
const authMiddleware=require("../middlewares/auth");
const isAdmin=require("../middlewares/isAdmin");


router.post("/",authMiddleware, handleCreateNewTodo);
router.get("/",authMiddleware, handleViewAllTODO);
router.patch("/:id/completed", handleTodoToggleCompletion);
router.delete("/soft/:id",authMiddleware, handleDeleteTodo);
router.put("/:id", handleUpdateTODO);
router.get("/get-all-todo", handleViewCheckTodo);
router.get("/getTodo", handleGetTodo);
router.get("/get-allTodo", handleGetSortTodo);
router.get("/search", handleSearchTodo);
router.delete("/hard/:id",authMiddleware,isAdmin,handleHardDeleteTodo);
router.patch("/restore/:id",authMiddleware,handleTodoRestore);
router.get("/trashed",authMiddleware,handleTrashView);


module.exports = router;
