const mongoose = require("mongoose");

const amplifierSchema = mongoose.Schema({
  ownerId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  wattage: {
    type: Number,
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
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Amplifier", amplifierSchema);
