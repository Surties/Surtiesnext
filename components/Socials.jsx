import { Center, Flex, Text } from "@chakra-ui/react";
import React from "react";

import Link from "next/link";
function Socials() {
  const data = [
    {
      name: "@surties",
      link: "https://www.instagram.com/surties/",
      logo: "https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Assets%2Finstagram.png?alt=media&token=5ab443b8-9e8f-48d0-949d-436bba1c542c",
    },
    {
      name: "surties",
      link: "https://www.facebook.com/surties.india/",
      logo: "https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Assets%2Ffacebook.png?alt=media&token=e0bdd9fa-2e0c-415f-8dbc-64b6736f70e4",
    },
    {
      name: "@surties",
      link: "https://www.youtube.com/channel/UC9YTQy5MpL5t1ODCQdK0tWA",
      logo: "https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Assets%2Fyoutube.png?alt=media&token=a4d9a55a-b075-4470-b56a-7b759fe49cb0",
    },
    {
      link: "https://twitter.com/i/flow/login?redirect_after_login=%2FSurtiesIndia",
      name: "@Surtiesindia",
      logo: "https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Assets%2Ftwitter.png?alt=media&token=08e479d6-772f-420b-aa32-7a5519ba435f",
    },
  ];
  return (
    <Center color={"black"} flexDirection={"column"} paddingTop={"30px"}>
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
              <a href={el.link}>
                <img width={"25px"} src={el.logo} alt="" />
              </a>
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
