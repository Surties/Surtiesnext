import React, { useEffect, useState } from "react";

import { Box, Flex, Grid, Spinner } from "@chakra-ui/react";
import axios from "axios";

import StickyBox from "react-sticky-box";

import { useRouter } from "next/router";
import Sidebar from "../../../Components/Sidebar";
import NewsCard from "../../../components/NewsCard";
import Navbar from "../../../components/Navbar";

function CatagoryPage() {
  const router = useRouter();
  const catagory = router.query.catagory;
  console.log(catagory);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`https://surtiesserver.onrender.com/news?filter=${catagory}`)
      .then((res) => {
        setData(res.data.newsItems);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  };
  useEffect(() => {
    console.log(catagory);
    fetchData();
  }, [catagory]);
  return (
    <>
      <Navbar/>
      <Box
        display={{ base: "flex", md: "flex" }}
        gap={"2%"}
        flexDirection={{ base: "column", md: "row" }}
        clear={"both"}
      >
        <Box
          backgroundColor={"#d91e26"}
          mb={"20px"}
          width={{ base: "100%", md: "20%" }}
        >
          <StickyBox offsetTop={20} offsetBottom={20}>
            <Sidebar />
          </StickyBox>
        </Box>
        {loading ? (
          <>
            <Flex
              w={{ base: "100%", md: "75%" }}
              justifyContent={"center"}
              mt={"20px"}
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="#d91e26"
                size="xl"
              />
            </Flex>
          </>
        ) : (
          <Grid
            templateColumns={{
              base: "repeat(2,1fr)",
              md: "repeat(4, 1fr)",
              lg: '"repeat(4, 1fr)',
            }}
            gap={{ base: "15px", md: "5px" }}
            w={{ base: "100%", md: "75%" }}
            justifyContent={"center"}
          >
            {data.map((el) => {
              return <NewsCard data={el} key={el._id} />;
            })}
          </Grid>
        )}
      </Box>
    </>
  );
}

export default CatagoryPage;
