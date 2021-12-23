const knex = require("../db");
const jwt = require("jsonwebtoken");


async function jwtAuthentication(req,res,next){
  const authHeader=req.headers.authorization;
  if(authHeader && authHeader.startsWith("Bearer")){
    const token=authHeader.split(" ")[1];
    if(token){
      try{
        const decoded=jwt.verify (token,"secret")
        const user=await knex("profile")
        .select()
        .where({id:decoded.userId})
        .first();
        if(user){
          req.user=user;
          next();
          console.log("***********","user",user)
          return;
        }
      }catch(err){
        res.status(401).send({message:"invalid token provided"});
        return;
      }
    }
  }

next();
}

async function isloggedIn(req, res, next) {
   req.user =  req.user|| req.session.user ;
  // console.log(req.user,")))))((((((((___))))))))"        )
  if (req.user) {
    console.log("***********","user1",req.user)
    next();
  return;
  }
  res.status(401).send({ message: "unauthorized user1" });
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
  jwtAuthentication,
};
