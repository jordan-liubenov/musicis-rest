const { register } = require("../services/userService");

const router = require("express").Router();

router.post("/", async (req, res) => {
  //TODO add error-sending from server to client like in login controler
  try {
    await register(req);

    res.send({ msg: "All good chief" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
