"use client";
import { Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";
import NewsCard from "./NewsCard";
import { Link } from "next/link";

const CategorizedNews2 = ({ data, catagory, cata }) => {
  return (
    <Link href={`/news/catagory/${cata}`}>
      <>
        {" "}
        <Text p={"20px 10px"} fontWeight={"bold"} color={"black"}>
          Related News
        </Text>
        <Flex justifyContent={"flex-start"}>
          <Grid
            mt={"2%"}
            p={"10px"}
            gridGap={"5px"}
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          >
            {data.map((el) => {
              return <NewsCard key={el._id} data={el} />;
            })}
          </Grid>
        </Flex>
      </>
    </Link>
  );
};

export default CategorizedNews2;
