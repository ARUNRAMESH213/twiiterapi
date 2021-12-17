const express=require("express");
const app=express.Router();
const followServices=require("../services/follow_service")
const userServices=require("../services/user_services")
const{isloggedIn}=require("../middleware/auth")


// app.get("/",isloggedIn,async(req,res)=>{
//     const following=await followServices.
// })


app.post("/",isloggedIn, async(req,res)=>{
    const [id,followId]=[req.user.id,Number(req.body.follow_id)]
    if(id===followId){
        res.status(400).send({message:"users cannot follow himself"})
    }
    if(!followId){
        res.status(404).send({message:"follow_id field missing"})
        return;
    }
    const checkingId=await  userServices.getUserById(followId)
    if(!checkingId){
        res.status(404).send({message:"requested id doesn't id exists"})
    }
    try{
        const follow=await followServices.createFollow(id,followId)
        res.status(201).send({id:follow,message:"requested id following success"})
    }catch(err){
        console.log(err)
        res.status(404).send({message:"requested follow failed"})
    }
})


module.exports=app;