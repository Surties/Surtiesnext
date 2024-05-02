import connectDB from "../../../../../middleware/connectDB";

const userPatch = async (req, res) => {
  await connectDB();

  if (req.method === "PATCH") {
    return postData(req, res);
  }
};

const patchData = async (req, res) => {
  const id = req.params.id;
  const params = req.params.email;
  const { profilePic, name, email } = req.body;

  try {
    const user = await userModel.findByIdAndUpdate(
      { _id: id },
      { profilePic, name, email }
    );
    res.status(200).send({ message: "user is updated" });
  } catch (err) {
    console.log(err);
  }
};
export default userPatch;
