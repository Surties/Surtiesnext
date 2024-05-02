"use client";
import React, { useState, useEffect } from "react";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

function BreakingNews({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      setCurrentIndex2((prevIndex) => (prevIndex + 1) % data.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [data.length]);

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={{ base: "column-reverse", md: "row" }}
      marginTop={"40px"}
      gap={"30px"}
    >
      <Flex
        overflow={"hidden"}
        w={{ base: "90%", md: "45%" }}
        bg={"#E2E8F0"}
        boxShadow={"2xl"}
        borderRadius={"6px"}
        alignContent={"center"}
      >
        <Link href={`/news/${data[currentIndex]._id}`}>
          <Flex h={"150px"} overflow={"hidden"}>
            <Center>
              <img width={"150px"} src={data[currentIndex].thumbnail} alt="" />
              <Box textAlign={"left"} p={"10px"}>
                <Text fontWeight={"bold"}>{data[currentIndex].heading}</Text>
              </Box>
            </Center>
          </Flex>
        </Link>
      </Flex>
      <Flex
        overflow={"hidden"}
        w={{ base: "90%", md: "45%" }}
        bg={"#E2E8F0"}
        boxShadow={"2xl"}
        rounded={"6px"}
        alignContent={"center"}
      >
        <Link href={`/news/${data[currentIndex2]._id}`}>
          {" "}
          <Flex>
            <Center h={"150px"} overflow={"hidden"}>
              <img width={"150px"} src={data[currentIndex2].thumbnail} alt="" />

              <Box p={"10px"} textAlign={"left"}>
                <Text fontWeight={"bold"}>{data[currentIndex2].heading}</Text>
              </Box>
            </Center>
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
}

export default BreakingNews;
