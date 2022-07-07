const User = require("../models/User");

const register = require("../services/userService");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const email = req.body.email;
  const username = req.body.user;
  const password = req.body.pass;

  try {
    const newUser = { email, username, password };

    await register(req);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
