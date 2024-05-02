const mongoose = require("mongoose");
const emailListSchema = new mongoose.Schema({
  email: String,
});
const newsLetterModel =
  mongoose.models.newsLetter || mongoose.model("newsLetter", emailListSchema);

export default newsLetterModel;
