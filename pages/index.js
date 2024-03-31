"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import StickyBox from "react-sticky-box";

import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";

import { LOGIN_LOADING } from "../redux/auth/auth.actiontype";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Sidebar from "../Components/Sidebar";
import ImageSlider from "../components/ImageSlider";
import BreakingNews from "../components/BreakingNews";
import CategorizedNews from "../components/CategorizedNews";
import Navbar from "../components/Navbar";

axios.defaults.withCredentials = true;

export default function Home() {
  const [slides, setSlides] = useState([{ img: "" }]);
  const [loading, setLoading] = useState(true);
  const [error1, setError] = useState(false);
  const [first, SetFirst] = useState(true);
  const [breakingNews, setBreakingNews] = useState([
    { thumbnail: "", heading: "" },
    { thumbnail: "", heading: "" },
  ]);
  const [news, setNews] = useState([{ documents: [] }]);
  const [loading2, setLoading2] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://surtiesserver.onrender.com/news/breaking-news"
      );
      setSlides(response.data);
    } catch (error) {
      setError(!!error1);
    } finally {
      setLoading(false);
    }
  };
  const getNews = () => {
    setLoading2(true);
    axios
      .get("https://surtiesserver.onrender.com/news/grouped")
      .then((response) => {
        setNews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading2(false);
        console.error("Error:", error.message);
      });
  };

  const getUser = () => {
    if (first) {
      dispatch({
        type: LOGIN_LOADING,
      });
      axios
        .get("https://surtiesserver.onrender.com/auth/signin-token", {
          withCredentials: true,
        })
        .then((res) => {
          SetFirst(false);

          router.push("/");
        })
        .catch((err) => {});
    } else SetFirst(true);
  };
  const breakingNewsFun = () => {
    axios
      .get("https://surtiesserver.onrender.com/news/breaking-news")
      .then((res) => {
        console.log(res.data);
        setBreakingNews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
    getNews();
    getUser();
    breakingNewsFun();
  }, []);
  return (
    <>
      <Navbar />
      <Flex flexDirection={{ base: "column", md: "row" }}>
        <Box backgroundColor={"#d91e26"} width={{ base: "100%", md: "20%" }}>
          <StickyBox offsetTop={20} offsetBottom={20}>
            <Sidebar />
          </StickyBox>
        </Box>
        <Box w={{ base: "100%", md: "76%" }}>
          <Flex marginTop={"20px"} justifyContent={"center"}>
            <Box>
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
                <ImageSlider slides={slides} />
              )}
            </Box>
          </Flex>
          <>
            {loading ? (
              <></>
            ) : (
              <>
                <Box
                  marginLeft={"5%"}
                  marginTop={"20px"}
                  marginBottom={"-30px"}
                  fontWeight={"bold"}
                  color={"#d91e26"}
                >
                  <Text>Top News</Text>
                </Box>
                <BreakingNews data={breakingNews} />
              </>
            )}
          </>
          {!loading ? (
            !loading2 ? (
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
              <Box ml={"20px"}>
                {news.map((el, index) => {
                  return (
                    <CategorizedNews
                      key={index}
                      catagory={el.category}
                      data={el.documents}
                      cata={el.category}
                    />
                  );
                })}
              </Box>
            )
          ) : (
            ""
          )}
        </Box>
      </Flex>
    </>
  );
}
