import connectDB from "../../../middleware/connectDB";
import newsModal from "../../../model/news.modal";

const newsData = async (req, res) => {
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
  const q = req.query.search;
  const filter = req.query.filter;
  let page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * 12;

  try {
    let query = {};
    if (filter) {
      query = { ...query, catagory: { $in: [filter] } };
    }

    if (q) {
      query = { ...query, heading: { $regex: new RegExp(q, "i") } };
    }

    const totalItems = await newsModal.countDocuments(query);
    const totalPages = Math.ceil(totalItems / 12);

    const newsItems = await newsModal
      .find(query)
      .skip(skip)
      .limit(12)
      .sort({ time: -1 });
    res.json({
      newsItems,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const postData = async (req, res) => {
  const newNews = req.body;

  try {
    const news = new newsModal(newNews);
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export default newsData;
