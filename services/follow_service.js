const knex = require("../db");
const userService=require("./user_services")

async function createFollow(id, followId) {
  const [createdId] = await knex("connection").insert({
    user_id: id,
    connect_id: followId,
  });
  return createdId;
}

async function getFollowing(id) {
  const followingData = await knex("connection")
    .leftJoin("profile", "connection.connect_id", "=", "profile.id")
    .select("connection.connect_id")
    .where("user_id", id);

  for (let following of followingData) {
    following.connect_id_data = await userService.getUserById(
      following.connect_id
    );
  }
  if (!followingData) {
    return null;
  }
  return followingData;
}

async function getFollowingOfFollowingByid(id) {
  const FollowingOfFollowing = await getFollowing(id);
  if (!FollowingOfFollowing) {
    return null;
  }
  return FollowingOfFollowing;
}

// async function deleteFollowingByid(id){
//   // const user=await getUserById(id);
//   const deleteFollowing=get f

// }

async function getFollowingById(id, followingId) {
  // let following={};
  let following = await knex("connection")
    .leftJoin("profile", "connection.connect_id", "=", "profile.id")
    .select("connection.connect_id")
    .where({ user_Id: id, connect_id: followingId })
    .first();

  if (!following) {
    return null;
  }

  following.connectId_data = await userServices.getUserById (following.connect_id);

  return following;
}

async function deleteFollowing(id, deleteId) {
  
  const deleted = await getFollowingById(id, deleteId);
  if (!deleted) {
    return null;
  }
  console.log(")))))))))))---", deleted);
  await knex("connection").del().where({ user_id: id, connect_id: deleteId });
  return deleted;
}
module.exports = {
  createFollow,
  getFollowing,
  getFollowingOfFollowingByid,
  getFollowingById,
  deleteFollowing,
};
