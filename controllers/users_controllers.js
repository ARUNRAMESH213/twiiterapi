const express = require("express");
const { isloggedIn } = require("../middleware/auth");
const app = express.Router();
const userServices = require("../services/user_services");

app.post("/register", async (req, res) => {
  try {
    console.log("suisyyyhgh", req.body);
    const user = await userServices.createUser(req.body);

    res.send(user);

    console.log("))))))))(((((((((((", user);
  } catch (err) {
    if ((err = err.no === 19)) {
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
    req.session.user = user;
    res.send({ message: "logged in succesfully" });
  } else {
    res.status(401).send({ message: "invalid username password" });
  }
});

app.get("/myinfo", isloggedIn, async (req, res) => {
  const user = await userServices.getUser(req.user.id);
  if (user) {
    res.send(user);
    return;
  }
});

app.get("/myinfo/:id", isloggedIn, async (req, res) => {
  const user = await userServices.getUserById(req.params.id);
  if (user) {
    res.send(user);
    return;
  }
  res.status(401).send({ message: "user doesn't exists" });
});

app.put("/myinfo", isloggedIn, async (req, res) => {
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

app.delete("/myinfo",isloggedIn,async(req,res)=>{
  const deleted=await userServices.deleteUser(req.user.id)
  res.send(deleted)


})

module.exports = app;
