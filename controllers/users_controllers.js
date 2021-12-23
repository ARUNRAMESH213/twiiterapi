const express = require("express");
const { isloggedIn, jwtAuthentication } = require("../middleware/auth");
const app = express.Router();
const userServices = require("../services/user_services");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

app.post("/register", async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await userServices.createUser(req.body);
    delete user.password;

    res.send(user);

    console.log("))))))))(((((((((((", user);
  } catch (err) {
    if ((err = err.no === 19)) {
      console.log(err);
      res.status(400).send({ message: "useranme already exists" });
    } else {
      console.log(err);
      res
        .status(500)
        .send({ message: "internall server error or gmail_id exists" });
    }
  }
});

app.post("/login", async (req, res) => {
  const user = await userServices.logInUser(
    req.body.username,
    req.body.password
  );

  if (user) {
    req.session.user = user;
    res.send({ message: "logged in succesfully" });
  } else {
    res.status(401).send({ message: "invalid username password" });
  }
});

app.post("/token", async (req, res) => {
  const user = await userServices.logInUser(
    req.body.username,
    req.body.password
  );

  if (user) {
    const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1d" });
      req.session.user = user;/* here we ares receiving both token and cookie */
    res.send({ message: "logged in succesfully", token });
  } else {
    res.status(401).send({ message: "invalid username password" });
  }
});

app.get("/myinfo", jwtAuthentication, isloggedIn, async (req, res) => {
  const user = await userServices.getUser(req.user.id);
  
  if (user) {
    res.send(user);
    return;
  }
});

app.get("/users", jwtAuthentication, isloggedIn, async (req, res) => {
  const user = await userServices.getUserAll();
  if (user) {
    res.send(user);
    return;
  }
});

app.get("/myinfo/:id",jwtAuthentication, isloggedIn, async (req, res) => {
  const user = await userServices.getUserById(req.params.id);
  if (user) {
    res.send(user);
    
    return;
  }
  res.status(401).send({ message: "user doesn't exists" });
});

app.put("/myinfo", jwtAuthentication, isloggedIn, async (req, res) => {
  try {
    console.log(req.user);
    const user = req.body;
    // console.log("))))))))----999999999", user);
    let updateData = {};
    if (user.name) updateData.name = user.name;
    if (user.mail_id) updateData.mail_id = user.mail_id;
    if (user.username) updateData.username = user.username;
    if (user.dob) updateData.dob = user.dob;
    updateData.updated_at = new Date();
    console.log(updateData, "updated__-----------");
    console.log("66666666^^^^^", updateData, req.user.id);
    await userServices.updateuser(req.user.id, updateData);
    res.status(200).send(await userServices.getUser(req.user.id));
  } catch (err) {
    if (err.errno === 19) {
      res.status(400).send({ message: "name and email id exits" });
    } else {
      res.status(500).send({ message: "internal server error" });
    }
  }
});

app.delete("/myinfo", jwtAuthentication, isloggedIn, async (req, res) => {
  const deleted = await userServices.deleteUser(req.user.id);
  res.send(deleted);
});

app.get("/allUsers", async (req, res) => {
  const allUsers = await userServices.getAllusers;
});
module.exports = app;
