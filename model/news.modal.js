const mongoose = require("mongoose");
const newsSchema = new mongoose.Schema({
  heading: String,
  subHeading: String,
  thumbnail: String,
  time: { type: String, default: Date.now() },
  imgs: [Object],
  embededLink: Object,
  breaking: Boolean,
  author: String,
  date: { type: String, default: new Date(Date.now()) },
  trending: Boolean,
  numberOfClick: Number,
  catagory: [String],
  article: String,
  clicks: { type: Number, default: 0 },
});
const newsModal = mongoose.models.news || mongoose.model("news", newsSchema);

export default newsModal;
