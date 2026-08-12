const mongoose = require("mongoose");
const { type } = require("node:os");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  taskName: {
    type: String,
    required: true,
  },

  isDone: {
    type: Boolean,
    required: true,
  },
});

const TaskModel = mongoose.model("todos", TaskSchema);

module.exports = TaskModel;
