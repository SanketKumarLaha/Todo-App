const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    taskname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("todo", todoSchema);
