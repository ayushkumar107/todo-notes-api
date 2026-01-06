const List = require("../model/note");

async function handleCreateNewTodo(req, res) {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: "title is required" });
  const newTodo = await List.create({
    title,
    description,
    isCompleted: false,
    createdBy:req.user.userId,
  });

  console.log(newTodo);
  return res
    .status(201)
    .json({ message: "todo created succesfully", data: newTodo });
}

async function handleViewAllTODO(req, res) {
  try{const allTodo = await List.find({createdBy:req.user.userId, isDeleted:false,});

  if(allTodo.length===0){
    return res.status(404).json({msg:"no todo found"});
  }

  return res.status(200).json({msg:"all todo fetched successfully",count:allTodo.length,data:allTodo});
}catch(error){
  return res.status(500).json({msg:"error while fetching todo",error:error.message});
}
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
    const todo = await List.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ msg: "TODO not founded..." });
    }

    if(todo.createdBy.toString() !==req.user.userId){
      return res.status(403).json({msg:"you are not authorized to delete this todo"});
    }
    todo.isDeleted=true;
    todo.deletedAt=new Date();
    await todo.save();
    return res
      .status(200)
      .json({ msg: "TODO deleted successfully", data: todo });
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

    return res.status(200).json({
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

async function handleSearchTodo(req, res) {
  try {
    const {query} = req.query;

    if (!query) {
      return res
        .status(400)
        .json({ msg: "query parameter is required for searching.." });
    }

    const result = await List.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    return res
      .status(200)
      .json({ msg: "search results", count: result.length, data: result });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error while searching TODO", error: error.message });
  }
};


async function handleHardDeleteTodo(req,res) {
  try{
    const id=req.params.id;
    const todo=await List.findById(id);  

   
    if(!todo){
      return res.status(400).json({msg:"Sorry Todo not founded..."})
    } 
    if( todo.createdBy.toString()===req.user.userId){
      return res.status(403).json({msg:"you are not authorized to delete this todo"})
    };
    if(!todo.isDeleted){
      return res.status(400).json({msg:"Todo must be soft deleted brfore hard delete "})
    }

    await List.findByIdAndDelete(id);

    return res.status(200).json({msg:"todo hard deleted successfully",data:todo})


  }catch(error){
    return res.status(500).json({msg:"error while deleting Todo list...",error:error.message});
  }
};

async function handleTodoRestore(req,res) {
  try{

    const id=req.params.id;
    const restoreTodo=await List.findById(req.params.id);

    if(!restoreTodo){
      return res.status(400).json({msg:"Sorry Todo not founded..."})
    }
    if(restoreTodo.createdBy.toString() !== req.user.userId){
      return res.status(403).json({msg:"you are not authorized to restore this todo"})
    }
    if(!restoreTodo.isDeleted){
      return res.status(400).json({msg:"todo is already active "})
    }
    restoreTodo.isDeleted=false;
    restoreTodo.deletedAt=null;
    await restoreTodo.save();


    return res.status(200).json({msg:"Todo restored successfully...",data:restoreTodo})



  }catch(error){
    return res.status(500).json({msg:"error in restoring todo list",error:error.message})

  }
}

async function handleTrashView(req,res) {
 try{
   const trashTodo= await List.find({createdBy:req.user.userId,isDeleted:true})
  if(trashTodo.length==0){
    return res.status(200).json({msg:"no trashed todo...",count:0,trashTodo:[]});
  }
  return res.status(200).json({msg:"here is the trashed todo list",count:trashTodo.length,data:trashTodo})
  
  
  }catch(error){
    console.log(error);
    return res.status(500).json({msg:"error while searching trashed Todo list",error:error.msg});
  }
}




module.exports = {
  handleCreateNewTodo,
  handleViewAllTODO,
  handleTodoToggleCompletion,
  handleDeleteTodo,
  handleUpdateTODO,
  handleViewCheckTodo,
  handleGetTodo,
  handleGetSortTodo,
  handleSearchTodo,handleHardDeleteTodo,handleTodoRestore,handleTrashView,
};
