import UserModel from "../../../../../model/auth.modal";

const adminPatch = async (req, res) => {
  await connectDB();

  if (req.method === "POST") {
    return patchData(req, res);
  }
  if (req.method === "GET") {
    return getData(req, res);
  }
};
const getData = async () => {
  const { id } = req.params;
  try {
    const user = await UserModel.findOne({ _id: id });
    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).send({ err: err });
  }
};
const patchData = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await UserModel.find({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user[0].role == "admin") {
      return res.status(403).json({ message: "Admin can't be modified" });
    }
    if (user[0].role == "newsEditor") {
      await UserModel.findOneAndUpdate(
        { _id: userId },
        { $set: { role: "user" } }
      );
      return res.status(200).json({ message: "User updated to user" });
    } else {
      await UserModel.findOneAndUpdate(
        { _id: userId },
        { $set: { role: "newsEditor" } }
      );
      return res.status(200).json({ message: "User updated to news editor" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export default adminPatch;
