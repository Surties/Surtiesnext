import connectDB from "../../../../../middleware/connectDB";
import newsModal from "../../../../../model/news.modal";

const singleTopnews = async (req, res) => {
  await connectDB();
  console.log("king last");
  if (req.method === "PATCH") {
    return patchData(req, res);
  }
};

const patchData = async (req, res) => {
  const id = req.query.id;

  try {
    const news = await newsModal.findByIdAndUpdate(
      { _id: id },
      { $inc: { clicks: 1 } }
    );

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.json({ message: "News has been updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export default singleTopnews;
