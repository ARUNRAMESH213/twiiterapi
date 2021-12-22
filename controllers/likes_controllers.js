const express = require("express");
const app = express.Router();
const likeServices = require("../services/likes_service");
const { isloggedIn, isOwnerOfId } = require("../middleware/auth");

app.post("/:id", isloggedIn, isOwnerOfId, async (req, res) => {
  const likes = await likeServices.createlikes(
    req.user.id,
    Number(req.params.id)
  );
  if (!likes) {
    res.send({ message: "tweets doesnt exist or you are not allowed" });
  }
  res.status(201).send(likes);
});

app.get("/:id", isloggedIn, isOwnerOfId, async (req, res) => {
  const allLikes = await likeServices.getAllLikes(req.params.id);
  if (!allLikes) {
    res.send("no one likrd thz tweets");
  }
  res.send(allLikes);
});

app.delete("/:id",isloggedIn,isOwnerOfId,async(req,res)=>{
    const deleted=await likeServices.DeleteLike(req.params.id,req.user.id)
    if(!deleted){
        res.send({message:"tweet  doesnt exists"})
    }
    res.status(201).send({message:"unliked thz tweet"});
})

module.exports = app;
