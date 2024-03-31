"use client";
import { Box, Center, Text, useDisclosure } from "@chakra-ui/react";

import { InstagramEmbed } from "react-social-media-embed";

import { useRef } from "react";
import ImgGalleryModel from "./ImgGalleryModel";

function DetailNewsComponent({ para, articleData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const handleClick = () => {
    onOpen();
  };
  return (
    <Center flexDirection={"column"} p={5}>
      <Text
        marginTop={"10px"}
        fontSize="28px"
        lineHeight={"29px"}
        fontWeight="bold"
        marginBottom={"10px"}
      >
        {articleData.heading}
      </Text>
      <ImgGalleryModel
        finalRef={finalRef}
        isOpen={isOpen}
        onOpen={onOpen}
        data={[...articleData.imgs, articleData.thumbnail]}
        onClose={onClose}
      />
      <Center
        alignItems={"flex-end"}
        onClick={handleClick}
        overflow={"hidden"}
        w={{ base: "450px", md: "600px" }}
        h={{ base: "280px", md: "400px" }}
      >
        <img src={articleData.thumbnail} alt="Thumbnail" mt={4} mb={4} />
      </Center>
      <Text marginTop={"10px"} fontSize="md" color="gray.500">
        Author: {articleData.author} | Date:{articleData.date}
      </Text>
      <Text
        marginTop={{ base: "10px", md: "10px" }}
        lineHeight={"20px"}
        fontSize="xl"
        color="gray.600"
      >
        {articleData.subHeading}
      </Text>

      <Text marginTop={"10px"} fontSize="md" whiteSpace="pre-line">
        {articleData.article}
      </Text>

      <Text fontSize="xl" fontWeight="bold" mt={4}>
        Image Gallery
      </Text>
      <Center gap={"10px"} flexDirection={"column"}>
        {articleData.imgs.map((img, index) => {
          return (
            <Box w={{ base: "450px", md: "600px" }}>
              {" "}
              <img
                onClick={handleClick}
                key={img + index}
                alt={index}
                src={img}
              />
            </Box>
          );
        })}
      </Center>
      <Center marginTop={"40px"} w={{ base: "100%", md: "400px" }}>
        {/* <InstagramEmbed url={articleData.instaLink || ""} width={"400px"} /> */}
      </Center>
    </Center>
  );
}

export default DetailNewsComponent;
