const List = require("../model/note");

async function handleCreateNewTodo(req, res) {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: "title is required" });
  const newTodo = await List.create({
    title,
    description,
    isCompleted: false,
  });

  console.log(newTodo);
  return res
    .status(201)
    .json({ message: "todo created succesfully", data: newTodo });
}

async function handleViewAllTODO(req, res) {
  const allTodo = await List.find({});
  return res.send(allTodo);
}

async function handleTodoToggleCompletion(req, res) {
  try {
    const list = await List.findById(req.params.id);
    if (!list) return res.status(404).json({ message: "todo id not founded" });
    list.isCompleted = !list.isCompleted;

    await list.save();
    return res.status(200).json({ message: "todo completion status updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error updating status", error: error.message });
  }
}

async function handleDeleteTodo(req, res) {
  try {
    const deleteTODO = await List.findByIdAndDelete(req.params.id);
    if (!deleteTODO) {
      return res.status(404).json({ msg: "TODO not founded..." });
    }

    return res
      .status(200)
      .json({ msg: "TODO deleted successfully", deleteTODO });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error while deleting TODO", error: error.message });
  }
}

async function handleUpdateTODO(req, res) {
  try {
    const { title, description, isCompleted } = req.body;
    const id = req.params.id;
    const updateTodo = await List.findByIdAndUpdate(
      id,
      { title, description, isCompleted },
      { new: true, runValidators: true }
    );
    if (!updateTodo) {
      return res.status(404).json({ msg: "todo not found" });
    }

    return res
      .status(200)
      .json({ msg: "todo updated successfully", data: updateTodo });
  } catch (error) {
    return res
      .status(404)
      .json({ msg: "error in updating TODO list", error: error.message });
  }
}

async function handleViewCheckTodo(req, res) {
  try {
    const { completed } = req.query;

    let filter = {};

    if (completed !== undefined) {
      filter.isCompleted = completed === "true";
    }

    const allTodo = await List.find(filter);

    return res
      .status(200)
      .json({ msg: "filtered todo list successfully..", data: allTodo });
  } catch (error) {
    return res
      .status(404)
      .json({ msg: "error in fetching todo", error: error.message });
  }
}

async function handleGetTodo(req, res) {
  try {
    const { completed, page = 1, limit = 5 } = req.query;
    if (completed !== undefined) {
      filter.isCompleted = completed === "true";
    }

    let filter = {};
    const skip = (page - 1) * limit;

    const allTodo = await List.find(filter).skip(skip).limit(limit);

    console.log(allTodo);
    return res
      .status(200)
      .json({ msg: "paginated todo list fetched successfully", data: allTodo });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error in fetching todo list", error: error.message });
  }
}

async function handleGetSortTodo(req, res) {
  try {
    const { completed, page = 1, limit = 5, sort = "desc" } = req.query;

    let filter = {};

    if (completed !== undefined) {
      filter.isCompleted = completed === "true";
    }

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const sortValue = sort.toLowerCase();
    const sortOrder = sortValue === "asc" ? 1 : -1;
    const allTodo = await List.find(filter)
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: sortOrder });

    return res
      .status(200)
      .json({
        msg: "Sorted & pagination and filtered Todo list",
        currentPage: pageNumber,
        limit: limitNumber,
        count: allTodo.length,
        sortOrder,
        data: allTodo,
      });
  } catch {
    return res
      .status(500)
      .json({ msg: "error while fetching todo ", error: error.message });
  }
}

module.exports = {
  handleCreateNewTodo,
  handleViewAllTODO,
  handleTodoToggleCompletion,
  handleDeleteTodo,
  handleUpdateTODO,
  handleViewCheckTodo,
  handleGetTodo,handleGetSortTodo,
};
