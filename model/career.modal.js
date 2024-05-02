const mongoose = require("mongoose");
const careerSchema = new mongoose.Schema({
  file: String,
  name: String,
  email: String,
  phoneNumber: Number,
  postion: String,
});
const Career = mongoose.models.Career || mongoose.model("Career", careerSchema);

export default Career;
