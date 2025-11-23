const List=require("../model/note");

async function handleCreateNewTodo(req,res) {
    const {title,description}=req.body;
if (!title) return res.status(400).json({message:"title is required"});
    const newTodo=await List.create({
        title,
        description,
        isCompleted:false
    });
    
    console.log(newTodo);
    return res.status(201).json({message:"todo created succesfully",data:newTodo});
};


async function handleViewAllTODO(req,res) {
    const allTodo=await List.find({});
    return res.send(allTodo);
    
};

async function handleTodoToggleCompletion(req,res) {
    const list= await List.findById(req.params.id);
    
    list.isCompleted=!list.isCompleted;

    await list.save();
    return res.status(200).json({message:"todo completion status updated"});
}


module.exports={
    handleCreateNewTodo,
    handleViewAllTODO,
    handleTodoToggleCompletion,
}