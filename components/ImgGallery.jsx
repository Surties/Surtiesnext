"use client";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import React, { useState } from "react";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function ImgGallery({ imgs }) {
  const [el, setEl] = useState(0);

  const handlePrev = () => {
    setEl((prevIndex) => (prevIndex === 0 ? imgs.length - 1 : prevIndex - 1));
  };
  const handleNext = () => {
    setEl((prevIndex) => (prevIndex + 1) % imgs.length);
  };
  return (
    <Box>
      <Flex alignItems={"center"} justifyContent={"space-between"} p={"20px"}>
        {" "}
        <Button
          w={"20px"}
          border={"1px solid #FAF5FF"}
          backgroundColor={"black"}
          onClick={handlePrev}
          color="#FAF5FF"
          _hover={{
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            color: "black",
            border: "1px solid black",
          }}
        >
          <FaArrowLeft />
        </Button>
        <Box>
          <Image
            w={{ base: "300px", md: "650px" }}
            h={{ base: "300px", md: "450px" }}
            src={imgs[el]}
            alt=""
          />
        </Box>
        <Button
          w={"40px"}
          backgroundColor={"black"}
          onClick={handleNext}
          border={"1px solid #FAF5FF"}
          color="#FAF5FF"
          _hover={{
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            color: "black",
            border: "1px solid black",
          }}
        >
          <FaArrowRight />
        </Button>
      </Flex>
    </Box>
  );
}

export default ImgGallery;
