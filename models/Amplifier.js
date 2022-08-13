const mongoose = require("mongoose");

const amplifierSchema = mongoose.Schema({
  ownerUsername: {
    type: String,
  },
  ownerId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  wattage: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  valves: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  dislikes: {
    type: Number,
    required: true,
  },
  ratedBy: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Amplifier", amplifierSchema);
