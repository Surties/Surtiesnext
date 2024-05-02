import connectDB from "../../../../middleware/connectDB";
import newsModal from "../../../../model/news.modal";

const topNews = async (req, res) => {
  await connectDB();
  if (req.method === "GET") {
    return getData(req, res);
  }
};
const getData = async (req, res) => {
  try {
    const oneWeekAgo = new Date() - 7 * 24 * 60 * 60 * 1000;

    const popularNews = await newsModal
      .find({ time: { $gte: oneWeekAgo } })
      .sort({ clicks: -1 })
      .limit(4);

    res.json(popularNews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default topNews;
