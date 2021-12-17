const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const userRouter = require("./controllers/users_controllers");
const followRouter = require("./controllers/follow_controller");
const app = express();
app.use(morgan("combined"));
app.use(
  session({
    secret: "messi",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 600000,
    },
  })
);
app.use(async function (req, res, next) {
  try {
    await next();
  } catch (err) {
    res.status(500).send({ message: "interna server error" });
  }
});
app.use(express.json());
app.use("/api/v1/auth", userRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1/follow", followRouter);

app.listen(3000);
