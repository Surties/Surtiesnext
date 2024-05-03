"use-client";
import React, { useEffect, useState } from "react";
import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import StickyBox from "react-sticky-box";
import axios from "axios";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import DetailNewsComponent from "../../../components/DetailNewsComponent";
import RecommendNews from "../../../components/RecommendedNews";
import ShareOn from "../../../components/ShareOn";
import { useRouter } from "next/router";
function DetailNews() {
  const [responseData, setResponseData] = useState([]);
  const [articleData, setArticleData] = useState({ imgs: [] });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const [error1, setError] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const fetchData2 = () => {
    setLoading(true);
    axios
      .get(`https://surtiesserver.onrender.com/news/${id}`)
      .then((response) => {
        setArticleData(response.data);
        setCategory(response.data.catagory);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        setError(!error1);
      });
  };
  const patchData = () => {
    setLoading(true);
    axios
      .patch(`/api/newsData/topweek/${id}`)
      .then((response) => {})
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/newsData/topweek");
      setResponseData(response.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData3 = async () => {
    try {
      const response = await axios.get(
        `/api/newsData/catagory?filter=${category}`
      );
      setData(response.data.newsItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchData2();
    patchData();
    fetchData3();
  }, [id]);
  return (
    <div>
      <Navbar />
      {loading ? (
        <Center mt={"20px"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#d91e26"
            size="xl"
          />
        </Center>
      ) : (
        <Flex flexDirection={{ base: "column", md: "row" }}>
          <Box backgroundColor={"#E2E8F0"} width={{ base: "100%", md: "20%" }}>
            <StickyBox offsetTop={20} offsetBottom={20}>
              <Sidebar />
            </StickyBox>
          </Box>
          <Flex
            w={{ base: "100%", md: "50%" }}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Box>
              {!articleData.article ? (
                ""
              ) : (
                <DetailNewsComponent
                  articleData={articleData}
                  category={category}
                  data={data}
                />
              )}
            </Box>
          </Flex>

          <Box backgroundColor="#ffffff" width={{ base: "100%", md: "30%" }}>
            <StickyBox offsetTop={20} offsetBottom={20}>
              <ShareOn />
              <Box p={"10px"}>
                <Text
                  color={"#d91e26"}
                  fontWeight={"bold"}
                  marginBottom={"15px"}
                >
                  You Might Also Instersted
                </Text>
                <RecommendNews data={responseData} />
              </Box>
            </StickyBox>
          </Box>
        </Flex>
      )}
    </div>
  );
}

export default DetailNews;
