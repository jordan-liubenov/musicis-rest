const { login } = require("../services/userService");
const settings = require("../configurations/settings");

const router = require("express").Router();

const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const username = req.body.user;

    const result = await login(req); //if successful, will return json web token

    if (!result) {
      res.send(result);
      return;
    }

    if (typeof result === "object") {
      if (result.usernameErr) {
        res.send({ error: result });
      } else if (result.passwordErr) {
        res.send({ error: result });
      }

      return;
    } else {
      jwt.verify(result, settings.secret);
      res.json({ result, username });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
