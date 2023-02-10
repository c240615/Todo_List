const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});
// 透過 mongoose 建立 Todo model
module.exports = mongoose.model("Todo", todoSchema);
