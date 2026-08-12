const mongoose = require("mongoose");

const bedSchema = new mongoose.Schema({
  ward: {
    type: String,
    required: true
  },
  bedNumber: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

const Bed = mongoose.model("Bed", bedSchema);

module.exports = Bed;