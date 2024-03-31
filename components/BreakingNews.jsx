"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

function BreakingNews({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(1);

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
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        alignContent={"center"}
      >
        {" "}
        <Link href={`/news/id/${data[currentIndex]._id}`}>
          <Flex>
            <Center>
              <img width={"300px"} src={data[currentIndex].thumbnail} alt="" />
            </Center>
            <Box textAlign={"left"} p={"10px"}>
              <Text>{data[currentIndex].heading}</Text>
            </Box>
          </Flex>
        </Link>
      </Flex>
      <Flex
        overflow={"hidden"}
        w={{ base: "90%", md: "45%" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        alignContent={"center"}
      >
        <Link href={`/news/id/${data[currentIndex2]._id}`}>
          {" "}
          <Flex>
            <Center>
              <img width={"300px"} src={data[currentIndex2].thumbnail} alt="" />
            </Center>
            <Box p={"10px"} textAlign={"left"}>
              <Text>{data[currentIndex2].heading}</Text>
            </Box>
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
}

export default BreakingNews;
