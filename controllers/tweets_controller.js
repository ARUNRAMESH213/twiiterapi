const express = require("express");
const app = express.Router();
const tweetsServices = require("../services/tweets_services");
const { isloggedIn, isOwnerOfId, jwtAuthentication } = require("../middleware/auth");

app.post("/",jwtAuthentication, isloggedIn, async (req, res) => {
  const tweets = await tweetsServices.createTweets(
    Number(req.user.id),
    req.body
  );
  res.status(201).send(tweets);
});

app.get("/",jwtAuthentication, isloggedIn, async (req, res) => {
  const tweets = await tweetsServices.getAllTweets(req.user.id);
  if (!tweets) {
    res.send({ message: "there is no tweets" });
  }
  res.send(tweets);
});

app.get("/:id",jwtAuthentication, isloggedIn, isOwnerOfId, async (req, res) => {
  const tweets = await tweetsServices.getTweetById(req.params.id);
  if (!tweets) {
    res.send({ message: "id doesnt exist" });
  }
  res.send(tweets);
});

app.delete("/:id",jwtAuthentication, isloggedIn, isOwnerOfId, async (req, res) => {
  const tweets = await tweetsServices.deleteTweetById(req.params.id);
  if (!tweets) {
    res.send({ message: "id doesnt exist" });
  }
  res.send(tweets);
});

module.exports = app;
