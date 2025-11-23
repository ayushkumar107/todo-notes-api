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
    
}


module.exports={
    handleCreateNewTodo,
    handleViewAllTODO,
}