const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  patient: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    required: true
  }
});

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;