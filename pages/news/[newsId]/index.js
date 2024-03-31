import React, { useEffect, useState } from "react";

import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";

import StickyBox from "react-sticky-box";

import axios from "axios";
import { useRouter } from "next/router";
import Sidebar from "../../../Components/Sidebar";
import DetailNewsComponent from "../../../components/DetailNewsComponent";
import ShareOn from "../../../components/ShareOn";
import RecommendNews from "../../../components/RecommendedNews";
import Navbar from "../../../components/Navbar";

function DetailNews() {
  // const router = useRouter;
  // // const id = router.query.id;
  const id = "6603113481d2b4376b8e0660";
  const [responseData, setResponseData] = useState([]);
  const [articleData, setArticleData] = useState({ imgs: [] });
  const [loading, setLoading] = useState(false);
  const [error1, setError] = useState(false);
  const fetchData2 = () => {
    setLoading(true);
    axios
      .get(`https://surtiesserver.onrender.com/news/${id}`)
      .then((response) => {
        setArticleData(response.data);

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
      .patch(`https://surtiesserver.onrender.com/news/topweek/${id}`)
      .then((response) => {})
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://surtiesserver.onrender.com/news/topweek"
      );
      setResponseData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    patchData();
    fetchData2();
  }, [id]);
  return (
    <>
      <Navbar/>
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
          <Box backgroundColor={"#d91e26"} width={{ base: "100%", md: "20%" }}>
            <StickyBox offsetTop={20} offsetBottom={20}>
              <Sidebar />
            </StickyBox>
          </Box>
          <Flex
            w={{ base: "100%", md: "50%" }}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Box>
              <DetailNewsComponent articleData={articleData} para={id} />
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
    </>
  );
}

export default DetailNews;
