"use client";
import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Flex
        alignContent={"center"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"10px"}
      >
        <Button
          width={{ base: "10px", md: "auto" }}
          border={"1px solid black"}
          backgroundColor={"transparent"}
          onClick={handlePrev}
          color="black"
          _hover={{
            backgroundColor: "RGBA(0, 0, 0, 0.08)",
            color: "black",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          }}
        >
          <FaArrowLeft />
        </Button>
        <Link href={`/news/${slides[currentIndex]._id}`}>
          <Box
            w={{ base: "280px", md: "760px" }}
            h={{ base: "205px", md: "350px" }}
            color={"white"}
            borderRadius={"12px"}
            backgroundImage={`url(${slides[currentIndex].thumbnail})`}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="100% 100%"
            paddingTop={{ base: "130px", md: "265px" }}
          >
            <Text
              borderBottomLeftRadius={"12px"}
              borderBottomRightRadius={"12px"}
              padding={"10px 20px"}
              fontSize={{ base: "14px", md: "24px" }}
              fontWeight="bold"
              color={"white"}
              h={{ base: "75px", md: "85px" }}
              backgroundColor={"RGBA(0, 0, 0, 0.64)"}
            >
              {slides[currentIndex].heading}
            </Text>
          </Box>
        </Link>
        <Button
          width={{ base: "10px", md: "auto" }}
          backgroundColor={"transparent"}
          onClick={handleNext}
          border={"1px solid black"}
          color="black"
          _hover={{
            backgroundColor: "RGBA(0, 0, 0, 0.08)",
            color: "black",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          }}
        >
          <FaArrowRight />
        </Button>
      </Flex>
    </>
  );
};

export default ImageSlider;
