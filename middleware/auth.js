const knex = require("../db");
async function isloggedIn(req, res,next) {

  req.user = req.session.user;
  // console.log(req.user,")))))((((((((___))))))))"        )
  if (req.user) {
    next();
    return;
  }
  res.status(401).send({message:"unauthorized user"})
}
module.exports={
    isloggedIn,
}