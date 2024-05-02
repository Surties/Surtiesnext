import connectDB from "../../../../middleware/connectDB";
import newsModal from "../../../../model/news.modal";

const singleData = async (req, res) => {
  await connectDB();
  if (req.method === "GET") {
    return getData(req, res);
  }
  if (req.method === "PATCH") {
    return patchData(req, res);
  }
  if (req.method === "DELETE") {
    return deleteData(req, res);
  }
};
const getData = async (req, res) => {
  const id = req.query.id;
  try {
    const newsItems = await newsModal.findOne({ _id: id });
    res.json(newsItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  res.send({ message: "last" });
};
const patchData = async (req, res) => {
  const id = req.query.id;
  const data = req.body;
  try {
    const news = await newsModal.findByIdAndUpdate(id, data);
    if (!news) {
      res.status(404).json({ message: "news not found" });
    }
    res.json({ message: "news has Been updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteData = async (req, res) => {
  const id = req.query.id;
  try {
    const news = await newsModal.findByIdAndDelete(id);

    if (!news) {
      res.status(404).json({ message: "news not found" });
    }
    res.json({ message: "news deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export default singleData;
