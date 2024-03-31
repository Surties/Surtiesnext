"use client";
import { Box, Flex, Img, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";

function RecommendNews({ data }) {
  return (
    <Flex gap={"20px"} flexDirection={"column"}>
      {data.map((el) => {
        return (
          <Box
            key={el._id}
            boxShadow={
              " rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
            }
            borderRadius={"16px"}
          >
            {
              <Link href={`/news/${el._id}`}>
                <Flex>
                  <Img
                    h={"100px"}
                    borderLeftRadius={"16px"}
                    width={"120px"}
                    src={el.thumbnail}
                    alt=""
                  />
                  <Box padding={"10px"}>
                    <Text fontWeight={"bold"} fontSize={"12px"}>
                      {el.heading.slice(0, 80) + "..."}
                    </Text>
                  </Box>
                </Flex>
              </Link>
            }
          </Box>
        );
      })}
    </Flex>
  );
}

export default RecommendNews;
