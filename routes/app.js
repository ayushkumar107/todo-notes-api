const express = require("express");

const router = express.Router();
const {
  handleCreateNewTodo,
  handleViewAllTODO,
  handleTodoToggleCompletion,
  handleDeleteTodo,
  handleUpdateTODO,handleViewCheckTodo,
} = require("../controllers/app");

router.post("/", handleCreateNewTodo);
router.get("/", handleViewAllTODO);
router.patch("/:id/completed", handleTodoToggleCompletion);
router.delete("/:id", handleDeleteTodo);
router.put("/:id", handleUpdateTODO);
router.get("/get-all-todo",handleViewCheckTodo);

module.exports = router;
