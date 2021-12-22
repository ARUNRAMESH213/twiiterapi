const { all } = require("express/lib/application");
const knex = require("../db");
const { getUserById } = require("../services/user_services");
async function createlikes(userId, tweetId) {
  const tweets = {
    created_at: new Date(),
    updated_at: new Date(),
    user_id: userId, 
    tweet_id: tweetId,
  };
  const [likes] = await knex("likes").insert(tweets);
  tweets.id = likes;
  console.log("77777777777777", tweets);
  return tweets;
}
async function getAllLikes(tweetId) {
  const allLikes = await knex("likes")
    .select("likes.user_id")
    .leftJoin("profile", "likes.user_id", "=", "profile.id")
    .where("tweet_id", tweetId);

  for (let like of allLikes) {
    like.liked_by = await getUserById(like.user_id);
  }

  if (!allLikes) {
    return null;
  }
  console.log(allLikes, "@@@@@@@@@@@@@");
  return allLikes;
}


async function DeleteLike(tweetId,userId){
    const deleted=await knex("likes")
    .del()
    .where({"tweet_id":tweetId,"user_id":userId})
    return deleted;
}
module.exports = {
  createlikes,
  getAllLikes,
  DeleteLike,
};
