const express = require("express");
const app = express.Router();
const userServices = require("../services/user_services");

app.post("/register", async (req, res) => {
  try {
    const user = await userServices.createUser(req.body);
    res.send(user);
  } catch (err) {
    if (err = err.no === 19) {
        console.log(err);
      res.status(400).send({ message: "useranme already exists" });
    } else {
      res.status(500).send({ message: "internall server error" });
    }
  }
});

app.post("/login", async (req, res) => {
  const user = await userServices.logInUser(
    req.body.username,
    req.body.password
  );

  if (user) {
    res.session.user=user;
    res.send(user);
  } else {
    res.status(401).send({ message: "invalid username password" });
  }
});

module.exports = app;
