const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  filename: String,
  path: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

module.exports = mongoose.model("Document", documentSchema);