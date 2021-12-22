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
    .orWhere({ "tweets.id": req.params.id, "connection.user_id": req.user.id })
    .first();

  
  if (isOwner) {
    next();
    return;
  }
  res.status(404).send({ message: "you are not following the tweet owner" });
}
module.exports = {
  isloggedIn,
  isOwnerOfId,
};
