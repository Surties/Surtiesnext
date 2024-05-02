import connectDB from "../../../middleware/connectDB";
import newsLetterModel from "../../../model/newsLetter.modal";

const newsLetter = async (req, res) => {
  await connectDB();
  if (req.method === "GET") {
    return getData(req, res);
  }
  if (req.method === "POST") {
    console.log("last");
    return postData(req, res);
  }
};
const getData = async (req, res) => {
  try {
    const emailsList = await newsLetterModel.find();
    res.status(200).send(emailsList);
  } catch (error) {
    res.status(404).send("something Went Wrong");
  }
};
const postData = async (req, res) => {
  const newEmail = req.body;
  try {
    const emailModel = new newsLetterModel(newEmail);
    await emailModel.save();
    res.status(201).json({ message: "you are subscribed", email: newEmail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export default newsLetter;
