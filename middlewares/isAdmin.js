function isAdmin(req,res,next){
    if(req.user.role !== "ADMIN"){
        return res.status(403).json({msg:"ADMIN access only"});
    }
    next();
}


module.exports=isAdmin;