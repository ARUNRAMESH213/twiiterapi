const knex = require("../db");
const bcrypt=require("bcrypt");

async function createUser(user) {
  // console.log(">>>>>>>>>>PPPPPPP", user);
  user.created_at = new Date();
  user.updated_at = new Date();
  const [id] = await knex("profile").insert(user);
  user.id = id;
  console.log(user.id);
  console.log("->>>>>>>>", user);

  return user;
}

async function logInUser(username, password) {
  const user = await knex("profile")
    .select()
    .where({ username })
    .first();
    if(user&& bcrypt.compareSync(password,user.password)){
      return user;
    }
  return null;
}

async function getUser(id) {
  const info = await knex("profile")
    .select(["name", "username", "mail_id", "dob"])
    .where("id", id)
    .first();
  console.log("info");
  return info;
}

async function getUserAll() {
  const info = await knex("profile").select([
    "id",
    "name",
    "username",
    "mail_id",
    "dob",
  ]);
  for (let connect of info) {
    connect.followers = await knex("connection")
      .select("connect_id")
      .where("user_id", connect.id);
      connect.followers= await getUserById(connect.followers.connect_id)
  }

  console.log("info");
  return info;
}

async function getUserById(id) {
  const info = await knex("profile")
    .select(["name", "username", "mail_id", "dob"])
    .where("id", id)
    .first();
    console.log("--------info",info)
  return info;
}

async function updateuser(id, user) {
  // console.log("))))))))))__-----(((((",id,user)

  const updated = await knex("profile").update(user).where("id", id);
  console.log(updated);
  return updated;
}

async function deleteUser(id) {
  const deleted = await getUser(id);
  if (!deleted) {
    return null;
  }
  await knex("profile").del().where("id", id);
  return deleted;
}

// async function getAllusers(){

// }

module.exports = {
  createUser,
  logInUser,
  getUserById,
  getUser,
  updateuser,
  deleteUser,
  getUserAll,
};
