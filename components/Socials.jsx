"use client";
import { Box, Center, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaFacebookSquare, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function Socials() {
  const data = [
    {
      name: "@surties",
      link: "https://www.instagram.com/surties/",
      logo: <FaInstagram />,
    },
    {
      name: "surties",
      link: "https://www.facebook.com/surties.india/",
      logo: <FaFacebookSquare />,
    },
    {
      name: "@surties",
      link: "https://www.youtube.com/channel/UC9YTQy5MpL5t1ODCQdK0tWA",
      logo: <FaYoutube />,
    },
    {
      link: "https://twitter.com/i/flow/login?redirect_after_login=%2FSurtiesIndia",
      name: "@Surtiesindia",
      logo: <FaSquareXTwitter />,
    },
  ];
  return (
    <Center color={"white"} flexDirection={"column"} paddingTop={"30px"}>
      <Text fontSize={"16px"} fontWeight={"600"} marginBottom={"10px"}>
        Find us on
      </Text>
      <Flex
        w={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"10%"}
      >
        {data.map((el, index) => {
          return (
            <Flex key={el.link + index} fontSize={"24px"} alignItems={"center"}>
              <a href={el.link}>{el.logo}</a>
            </Flex>
          );
        })}
      </Flex>
      <Text padding={"4%"} textAlign={"center"}>
        Find us on Socials or{" "}
        <Link
          href={"/contact-us"}
          style={{
            fontWeight: "600",

            textDecoration: "underline",
          }}
        >
          Contact us
        </Link>{" "}
      </Text>
    </Center>
  );
}

export default Socials;
