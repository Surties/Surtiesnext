import connectDB from "../../../../middleware/connectDB";
import newsModal from "../../../../model/news.modal";


const groupedNews = async (req, res) => {
  await connectDB();
  if (req.method === "GET") {
    return getData(req, res);
  }
 
};
const getData = async (req, res) => {
     try {
       const categories = await newsModal.distinct("catagory", {});

       const groupedDocuments = await Promise.all(
         categories.map(async (category) => {
           const documents = await newsModal.aggregate([
             { $match: { catagory: category } },
             { $sort: { date: -1 } }, // Sort by date in descending order
             { $group: { _id: "$_id", document: { $first: "$$ROOT" } } },
             { $replaceRoot: { newRoot: "$document" } },
             { $limit: 4 },
           ]);
           console.log(category, documents);
           return { category, documents };
         })
       );

       res.send(groupedDocuments).status(200);
     } catch (error) {
       console.error(error);
       res.status(500).json({ error: "Internal Server Error" });
     }
};

export default groupedNews;
