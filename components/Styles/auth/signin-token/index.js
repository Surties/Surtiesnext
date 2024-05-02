import connectDB from "../../../../middleware/connectDB";
import userModel from "../../../../model/auth.modal";
import cookieParser from "cookie-parser";
const signinToken = async (req, res) => {
  await connectDB();

  if (req.method === "GET") {
    return getData(req, res);
  }
};

const getData = async (req, res) => {
  const userId = req.id;
  let user;
  try {
    user = await userModel.findById(userId, "-pass");
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  return res.status(200).json({
    msg: "LOGIN SUCCESS",
    auth: true,
    email: user.email,
    userName: user.name,
    id: user._id,
    role: user.role,
    profilePic: user.profilePic,
  });
};
export default signinToken;
