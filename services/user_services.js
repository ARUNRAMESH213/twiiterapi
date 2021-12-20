const knex = require("../db");
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
    .where({ username, password })
    .first();
  return user;
}

async function getUser(id) {
  const info = await knex("profile")
    .select(["name", "username", "mail_id", "dob"])
    .where("id", id)
    .first();
  console.log("info");
  return info;
}

async function getUserById(id) {
  const info = await knex("profile")
    .select(["name", "username", "mail_id", "dob"])
    .where("id", id)
    .first();
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

module.exports = {
  createUser,
  logInUser,
  getUser,
  updateuser,
  getUserById,
 deleteUser
};
