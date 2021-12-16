const express=require("express");
const app=express()
const userServices=require("../services/user_services")


app.post("/",async(req,res)=>{
    const user=await userServices.createUser

})