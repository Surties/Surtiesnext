import connectDB from "../../../../middleware/connectDB";
import newsModal from "../../../../model/news.modal";

const breakingNews = async (req, res) => {
  await connectDB();
  if (req.method === "GET") {
    return getData(req, res);
  }
};
const getData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const breakingNews = await newsModal
      .find({ breaking: true })
      .sort({ time: -1 })
      .skip(startIndex)
      .limit(limit);

    const totalItems = await newsModal.countDocuments({ breaking: true });

    const response = {
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      breakingNews: breakingNews,
    };

    res.status(200).send(response);
  } catch (error) {
    console.error("Error fetching breaking news:", error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
export default breakingNews;
