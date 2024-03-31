"use client";
import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function ImgGallery({ imgs }) {
  const [el, setEl] = useState(0);

  const slideStyles = {
    width: "100%",
    paddingTop: "30%",
    display: "flex",
    color: "white",
    borderRadius: "12px",
  };

  const slideStylesWithBackground = {
    ...slideStyles,
    backgroundImage: `url(${imgs ? imgs[el] : "https://placehold.co/600x400"})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
  };

  const handlePrev = () => {
    setEl((prevIndex) => (prevIndex === 0 ? imgs.length - 1 : prevIndex - 1));
  };
  const handleNext = () => {
    setEl((prevIndex) => (prevIndex + 1) % imgs.length);
  };
  return (
    <Box style={slideStylesWithBackground}>
      <Flex justifyContent={"space-between"} p={"20px"}>
        {" "}
        <Button
          w={"20px"}
          border={"1px solid #FAF5FF"}
          backgroundColor={"transparent"}
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
        <Button
          w={"40px"}
          backgroundColor={"transparent"}
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
