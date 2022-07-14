const { login } = require("../services/userService");
const settings = require("../configurations/settings");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const token = await login(req);

    //TO-DO: add error
    if (!token) {
      //TO-DO add errors
      res.send("error");
      return;
    }

    //if token is valid, send to user
    // res.cookie(settings.sessionTitle, token, { httpOnly: true });
    res.json({ token });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
