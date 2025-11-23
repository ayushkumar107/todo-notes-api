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
    try{
    
    const list= await List.findById(req.params.id);
    if(!list) return res.status(404).json({message:"todo id not founded"});
    list.isCompleted=!list.isCompleted;

    await list.save();
    return res.status(200).json({message:"todo completion status updated"});
    }catch(error){
        return res.status(500).json({message:"error updating status",error:error.message,})
    }
}


module.exports={
    handleCreateNewTodo,
    handleViewAllTODO,
    handleTodoToggleCompletion,
}