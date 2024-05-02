import connectDB from "../../../../middleware/connectDB";
import userModel from "../../../../model/auth.modal";
const bcrypt = require("bcrypt");
const signup = async (req, res) => {
  await connectDB();

  if (req.method === "POST") {
    return postData(req, res);
  }
};

const postData = async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    const eUser = await userModel.findOne({ email });
    if (eUser) {
      return res.status(409).send({ error: "Email already registered" });
    }

    const hash = await bcrypt.hash(pass, 10);
    const user = new userModel({
      name,
      email,
      pass: hash,
    });
    await user.save();

    return res.status(201).send({ msg: "User Created" });
  } catch (e) {
    return res.status(500).send({ error: "An error occurred during signup" });
  }
};
export default signup;
