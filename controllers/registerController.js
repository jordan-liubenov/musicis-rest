const User = require("../models/User");

const router = require("express").Router();


router.post("/", (req, res) => {
  const email = req.body.email;
  const username = req.body.user;
  const password = req.body.pass;

  const newUser = { email, username, password };

  //TO-DO: create a new User entry in the DB
});

module.exports = router;
