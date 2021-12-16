const knex=require("../db")
async function createUser(user){
    const[id]= await knex("profile").insert (user);
    user.id=id;
    return user;
}