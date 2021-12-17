const res = require("express/lib/response");
const knex = require("../db");
async function createFollow(id, followId) {
  
  const [createdId] = await knex("connection").insert({
    user_id: id,
    connect_id: followId,
  });
  return createdId;
}

// async function getFollowing(id){
//   const followingData=await knex("connection")
//   .select()
//   .where("user_id",id)
//   if(!followingData)
//   {
//     return null
//   }
//   return folloeing data
// }
module.exports={
    createFollow,
}