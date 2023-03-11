const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const contents = mongoose.model("contents", contentSchema);
module.exports = contents;
