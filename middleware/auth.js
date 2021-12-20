const knex = require("../db");
async function isloggedIn(req, res, next) {
  req.user = req.session.user;
  // console.log(req.user,")))))((((((((___))))))))"        )
  if (req.user) {
    next();
    return;
  }
  res.status(401).send({ message: "unauthorized user" });
}

async function isOwnerOfId(req, res, next) {
  const isOwner = await knex("tweets")
    .select("tweets.*")
    .leftJoin("connection", "tweets.user_id", "=", "connection.connect_id")
    .where({ "tweets.id": req.params.id, "tweets.user_id": req.user.id })
    .orWhere({"tweets.id": req.params.id, "connection.user_id": req.user.id })
    .first();

  console.log("^^^^^^^^^^^^^^", isOwner);
  if (isOwner) {
    next();
    return;
  }
}
module.exports = {
  isloggedIn,
  isOwnerOfId,
};
