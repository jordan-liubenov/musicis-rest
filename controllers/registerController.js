const { register } = require("../services/userService");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const result = await register(req);
    if (typeof result === "object") {
      if (result.usernameTaken) {
        res.send({ error: result });
      } else if (result.emailTaken) {
        res.send({ error: result });
      }
      return;
    } 
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
