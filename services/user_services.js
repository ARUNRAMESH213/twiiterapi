const knex=require("../db")
async function createUser(user){
    console.log(">>>>>>>>>>PPPPPPP",user);
    user.created_at=new Date();
    user.updated_at=new Date();
    const[id]= await knex("profile").insert (user);
    user.id=id;
    return user;
}
async function logInUser(username,password){
    const user=await knex("profile")
    .select()
    .where({username,password})
    .first()
    return user

}
module.exports={
    createUser,
    logInUser
}