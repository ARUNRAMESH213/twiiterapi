const knex=require("../db");
const { getUserById } = require("./user_services");



async function getFollowers(id) {
    const followers = await knex("connection")
      .leftJoin("profile", "connection.connect_id", "=", "profile.id")
      .select("user_id")
      .where("connect_id", id);
  
    for (let follower of followers) {
      follower.follower_data = await getUserById(follower.user_id);
    }
    if (!followers) {
      return null;
    }
    return followers;
  }


  async function getFollowersOfFollowersByid(id) {
    const followersOfFollowers = await getFollowers(id);
    if (!followersOfFollowers) {
      return null;
    }
    return followersOfFollowers;
  }

  async function getFollowersById(id, followerId) {
    // let following={};
    let followers= await knex("connection")
      .leftJoin("profile", "connection.connect_id", "=", "profile.id")
      .select("user_id")
      .where({ connect_id: id,user_id : followerId })
      .first();
    
  
    if (!followers) {
      return null;
    }
  
    followers.user_Id_data = await getUserById(followers.user_id);
  
    return followers;
  }
  async function deleteFollowers(id,deleteId) {
    
    const deleted = await getFollowersById(id,deleteId);
    if (!deleted) {
      return null;
    }
    console.log(")))))))))))---",deleted)
    await knex("connection").del().where({"connect_id":id,"user_id": deleteId});
    return deleted;
  }
  
  

  module.exports={
      getFollowers,
      getFollowersOfFollowersByid,
      getFollowersById,
      deleteFollowers,
  }