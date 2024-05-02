import connectDB from "../../../../middleware/connectDB";
import newsModal from "../../../../model/news.modal";

const treandingNews = async (req, res) => {
  await connectDB();
  if (req.method === "GET") {
    return getData(req, res);
  }
};
const getData = async (req, res) => {
  try {
    // Default page number is 1 and items per page is 12
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    console.log(page);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const slider = await newsModal
      .find({ trending: true })
      .sort({ time: -1 })
      .skip(startIndex)
      .limit(limit);

    const totalItems = await newsModal.countDocuments({ trending: true });

    const response = {
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      slider: slider,
    };

    res.status(200).send(response);
  } catch (error) {
    console.error("Error fetching slider:", error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
export default treandingNews;
