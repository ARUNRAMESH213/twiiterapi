const knex=require("../db")
async function createTweets(message){
    const [id]=await knex("tweets")
    .insert(message);
    message.created_at=new Date();
    message.update_at=new Date();
    
}