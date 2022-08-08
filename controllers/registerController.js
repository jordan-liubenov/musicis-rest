const { register, getCurrentUserId } = require("../services/userService");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const result = await register(req);
    if (typeof result === "object") {
      if (result.usernameTaken) {
        res.json({ error: result });
      } else if (result.emailTaken) {
        res.json({ error: result });
      }
      return;
    } else {
      res.json({ msg: "Success" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
