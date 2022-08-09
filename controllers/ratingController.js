const { addRating } = require("../services/ratingService");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    await addRating(req);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
