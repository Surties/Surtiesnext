"use client";
import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";
import NewsCard from "./NewsCard";
import Link from "next/link";

function CategorizedNews({ data, catagory, cata }) {
  return (
    <Link href={`/news/catagory/${cata}`}>
    <>
      <Flex alignItems={"center"} mt={"3%"} mr={"2.4%"}>
        <Text
          fontWeight={"500"}
          fontSize={"12px"}
          color={"#d91e26"}
          border={"1px solid #d91e26"}
          textAlign={"center"}
          padding={{ base: "5px", md: "5px 10px" }}
          borderRadius={"40px"}
          cursor={"default"}
          height={"30px"}
          textTransform={"capitalize"}
          width={{ base: "120px", md: "120px" }}
        >
          {catagory}
        </Text>
        <Box
          h={"0.5px"}
          w={"75%"}
          border={"1px solid #718096 "}
          opacity={"0.5"}
        ></Box>
        <Button
          height={"30px"}
          fontSize={"12px"}
          padding={"10px 18px"}
          backgroundColor={"#d91e26"}
          color={"white"}
          borderRadius={"40px"}
          border={"1px solid #d91e26"}
          _hover={{
            color: "#d91e26",
            backgroundColor: "white",
            border: "1px solid #d91e26",
          }}
        >
          View all
        </Button>
      </Flex>
      <Flex justifyContent={"flex-start"}>
        <Grid
          mt={"2%"}
          p={"10px"}
          gridGap={"5px"}
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
        >
          {data.map((el) => {
            return <NewsCard key={el._id} data={el} />;
          })}
        </Grid>
      </Flex>
    </>
     </Link>
  );
}

export default CategorizedNews;
