const express=require("express");
const {connectDB}=require("./connection")
const todoRouter=require("./routes/app")


const app=express();
const PORT=6000;

//connection
connectDB("mongodb://127.0.0.1:27017/todo1").then(()=>{
    console.log("mongodb connected...");
});


//middleware

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//routes


app.use("/api/notes",todoRouter);



app.listen(PORT,()=>{
    console.log(`Server is started at ${PORT}`);
})