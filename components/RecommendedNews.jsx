"use client";
import { Box, Flex, Img, Text } from "@chakra-ui/react";
import Link from "next/link";

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
            background={"#EDF2F7"}
            borderRadius={"6px"}
          >
            {
              <Link href={`/news/id/${el._id}`}>
                <Flex>
                  <Img
                    h={"100px"}
                    borderLeftRadius={"6px"}
                    width={"120px"}
                    src={el.thumbnail}
                    alt=""
                  />
                  <Box padding={"10px"}>
                    <Text fontWeight={"bold"} fontSize={"12px"}>
                      {el.heading}
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
