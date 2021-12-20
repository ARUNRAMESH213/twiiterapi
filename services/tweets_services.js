const app = require("../controllers/tweets_controller");
const knex = require("../db");

async function createTweets(id, { message }) {
  const tweets = {
    user_id: id,
    created_at: new Date(),
    updated_at: new Date(),
    message: message,
  };

  const [newId] = await knex("tweets").insert(tweets);
  tweets.id = newId;
  //   message.id = tweets;
  //   message.created_at = new Date();
  //   message.update_at = new Date();

  return tweets;
}

async function getAllTweets(id) {
  const AllTweets = await knex("tweets")
    .select("id", "message", "created_at", "updated_at")
    .where("user_id", id);
  if (!AllTweets) {
    return null;
  }
  return AllTweets;
}

async function getTweetById(tweetId) {
  const tweet = await knex("tweets").select().where("id", tweetId).first();

  if (!tweet) {
    return null;
  }

  return tweet;
}

async function deleteTweetById(id){
    const deleted=await getTweetById(id);
    if(!deleted){
        return null
    }

await knex("tweets").del().where("id",id);
 return deleted;
    
}

module.exports = {
  createTweets,
  getAllTweets,
  getTweetById,
  deleteTweetById,
};
