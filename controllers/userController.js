const { getUserById } = require("../services/userService");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const currentId = req.body.id;

  try {
    const find = await getUserById(currentId);
    res.json({ owner: find });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
