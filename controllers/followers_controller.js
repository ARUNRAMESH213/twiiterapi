const express = require("express");
const app = express.Router();
const followerServices = require("../services/followers_service");
const userServices = require("../services/user_services");
const { isloggedIn } = require("../middleware/auth");

app.get("/", isloggedIn, async (req, res) => {
  const followers = await followerServices.getFollowers(req.user.id);
  if (!followers) {
    res.send({ message: "no followers" });
    return;
  }
  res.send(followers);
});


app.get("/:id", isloggedIn, async (req, res) => {
  const followersOfFollowers = await followerServices.getFollowersOfFollowersByid  (
    req.params.id
  );
  if (!followersOfFollowers) {
    res
      .status(404)
      .send({ message: "id doesnt  have any followers " });
    return;
  }
  res.send(followersOfFollowers);
});


app.get("/data/:id", isloggedIn, async (req, res) => {
  const data = await followerServices.getFollowersById(
    req.user.id,
    Number(req.params.id)
  );
  if (!data) {
    res.status(404).send({ message: "doesnt have any followers" });
    return;
  }
  res.send(data);
});

app.delete("/:id", isloggedIn, async (req, res) => {
 
const deleted = await followerServices.deleteFollowers (req.user.id,Number(req.params.id));
if (!deleted) {
  res.send({ message: "you are not following this id" });
}
res.send(deleted);
});


module.exports = app;
