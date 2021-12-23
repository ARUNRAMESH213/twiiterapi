const express = require("express");
const app = express.Router();
const followServices = require("../services/follow_service");
const userServices = require("../services/user_services");
const { isloggedIn, jwtAuthentication } = require("../middleware/auth");

app.get("/",jwtAuthentication, isloggedIn, async (req, res) => {
  const followingData = await followServices.getFollowing(req.user.id);
  if (!followingData) {
    res.send({ message: "id doesn't exist" });
    return;
  }
  res.send(followingData);
});







app.post("/",jwtAuthentication, isloggedIn, async (req, res) => {
  const [id, followId] = [req.user.id, Number(req.body.follow_id)];
  if (id === followId) {
    res.status(400).send({ message: "users cannot follow himself" })
    return;
  }
  if (!followId) {
    res.status(404).send({ message: "follow_id field missing" });
    return;
  }
  const checkingId = await userServices.getUserById(followId);
  if (!checkingId) {
    res.status(404).send({ message: "requested id doesn't id exists" });
  }
  try {
    const follow = await followServices.createFollow(id, followId);
    res
      .status(201)
      .send({ id: follow, message: "requested id following success" });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "requested follow failed or already following" });
  }
});

app.get("/:id",jwtAuthentication, isloggedIn, async (req, res) => {
  const follwingOfFollowing = await followServices.getFollowingOfFollowingByid(
    req.params.id
  );
  if (!follwingOfFollowing) {
    res
      .status(404)
      .send({ message: "id doesnt follow anyone or doesn't exist" });
    return;
  }
  res.send(follwingOfFollowing);
});

app.get("/data/:id", jwtAuthentication, isloggedIn, async (req, res) => {
  const data = await followServices.getFollowingById(
    req.user.id,
    Number(req.params.id)
  );
  if (!data) {
    res.status(404).send({ message: "you are not following thz id" });
    return;
  }
  res.send(data);
});

app.delete("/:id",jwtAuthentication, isloggedIn, async (req, res) => {
    console.log("]]]]]]]]]]][[[[[[[[[[[[[",req.params.id)
  const deleted = await followServices.deleteFollowing(req.user.id,Number(req.params.id));
  if (!deleted) {
    res.send({ message: "you are not following this id" });
  }
  res.send(deleted);
});

module.exports = app;
