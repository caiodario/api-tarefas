const mongoose = require("mongoose");
const List = mongoose.model("List", {
  name: String,
  archived: Boolean,
});

module.exports = List;
