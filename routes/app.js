const express = require("express");

const router = express.Router();
const {
  handleCreateNewTodo,
  handleViewAllTODO,
  handleTodoToggleCompletion,
  handleDeleteTodo,
} = require("../controllers/app");

router.post("/", handleCreateNewTodo);
router.get("/", handleViewAllTODO);
router.patch("/:id/completed", handleTodoToggleCompletion);
router.delete("/:id",handleDeleteTodo);

module.exports = router;
