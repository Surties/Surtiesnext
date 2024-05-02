const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  email: { type: String, unique: true },
  pass: String,
  name: String,
  profilePic: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Assets%2Fman.svg?alt=media&token=e8791da4-7514-4695-9dd5-6cb9e0277409",
  },
  lockUntil: {
    type: Number,
    required: true,
    default: new Date(),
  },
  block: {
    type: Boolean,
    require: true,
    default: false,
  },
  role: {
    type: String,
    enum: ["admin", "user", "newsEditor"],
    default: "user",
  },
});
const userModel = mongoose.model.users || mongoose.model("users", userSchema);

export default userModel;
