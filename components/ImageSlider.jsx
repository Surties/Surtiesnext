// "use client";
// import React, { useEffect, useState } from "react";
// import { Box, Text, Flex, Button } from "@chakra-ui/react";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import Link from "next/link";
// const ImageSlider = ({ slides }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? slides.length - 1 : prevIndex - 1
//     );
//   };
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       handleNext();
//     }, 3000);
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <>
//       <Flex
//         alignContent={"center"}
//         justifyContent={"center"}
//         alignItems={"center"}
//         gap={"10px"}
//       >
//         <Button
//           width={{ base: "10px", md: "auto" }}
//           border={"1px solid black"}
//           backgroundColor={"transparent"}
//           onClick={handlePrev}
//           color="black"
//           _hover={{
//             backgroundColor: "RGBA(0, 0, 0, 0.08)",
//             color: "black",
//             border: "1px solid rgba(255, 255, 255, 0.4)",
//           }}
//         >
//           <FaArrowLeft />
//         </Button>
//         <Link href={`/news/${slides[currentIndex]._id}`}>
//           <Box
//             w={{ base: "280px", md: "760px" }}
//             h={{ base: "205px", md: "350px" }}
//             color={"white"}
//             borderRadius={"12px"}
//             backgroundImage={`url(${slides[currentIndex].thumbnail})`}
//             backgroundPosition="center"
//             backgroundRepeat="no-repeat"
//             backgroundSize="100% 100%"
//             paddingTop={{ base: "130px", md: "265px" }}
//           >
//             <Text
//               borderBottomLeftRadius={"12px"}
//               borderBottomRightRadius={"12px"}
//               padding={"10px 20px"}
//               fontSize={{ base: "14px", md: "24px" }}
//               fontWeight="bold"
//               color={"white"}
//               h={{ base: "75px", md: "85px" }}
//               backgroundColor={"RGBA(0, 0, 0, 0.64)"}
//             >
//               {slides[currentIndex].heading}
//             </Text>
//           </Box>
//         </Link>
//         <Button
//           width={{ base: "10px", md: "auto" }}
//           backgroundColor={"transparent"}
//           onClick={handleNext}
//           border={"1px solid black"}
//           color="black"
//           _hover={{
//             backgroundColor: "RGBA(0, 0, 0, 0.08)",
//             color: "black",
//             border: "1px solid rgba(255, 255, 255, 0.4)",
//           }}
//         >
//           <FaArrowRight />
//         </Button>
//       </Flex>
//     </>
//   );
// };

// export default ImageSlider;
"use client";

import React, { useState } from "react";
import { Box, IconButton, Text, useBreakpointValue } from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function ImageSlider({ slides }) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "50%", md: "50%" });
  const side = useBreakpointValue({ base: "5px", md: "10px" });

  // These are the images used in the slide

  console.log(slides);
  return (
    <Box
      borderRadius={"6px"}
      position={"relative"}
      w={{ base: "360px", md: "900px" }}
      h={{ base: "205px", md: "450px" }}
      overflow={"hidden"}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        width={{ base: "10px", md: "auto" }}
        backgroundColor={"white"}
        border={"1px solid black"}
        color="black"
        _hover={{
          backgroundColor: "RGBA(0, 0, 0, 0.24)",
          color: "black",
          border: "1px solid rgba(255, 255, 255, 0.4)",
        }}
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        width={{ base: "10px", md: "auto" }}
        backgroundColor={" white "}
        border={"1px solid black"}
        color="black"
        _hover={{
          backgroundColor: "RGBA(0, 0, 0, 0.24)",
          color: "black",
          border: "1px solid rgba(255, 255, 255, 0.4)",
        }}
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {slides.map((slide, index) => (
          <Box key={index}>
            <Box
              height={{ base: "150px", md: "360px" }}
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={`url(${slide.thumbnail})`}
            />
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
              {slide.heading}
            </Text>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
