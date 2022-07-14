const User = require("../models/User");

const { register } = require("../services/userService");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    await register(req);

    res.send({ msg: "All good chief" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
