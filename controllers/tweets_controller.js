const express=require("express");
const app=express.Router();
const tweetsServices=require("../services/tweets_services")

app.post("/",async(req,res)=>{
    return await tweetsServices.
})
module.exports=app;