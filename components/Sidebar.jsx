"use client";
import React, { useState } from "react";

import Link from "next/link";

import { Box, Button, Image, ListItem, UnorderedList } from "@chakra-ui/react";

import Socials from "./Socials";
import Newsletter from "./NewsLetter";

function Sidebar() {
  const [show, setShow] = useState(false);
  return (
    <Box>
      <Box
        overflow={"hidden"}
        backgroundColor={"#E2E8F0"}
        width={{ base: "100%", md: "100%" }}
        height={{ base: `${!show ? "44px" : "140px"}`, md: "auto" }}
        mb={{ base: "40px", md: "" }}
      >
        <UnorderedList
          ml={"0px"}
          display={"grid"}
          gridTemplateColumns={{ base: "repeat(3,auto)", md: "repeat(1,1fr)" }}
          listStyleType={"none"}
          alignItems={"center"}
          gap={"20px"}
          pl={"6%"}
          position={"sticky"}
          color={"#E2E8F0"}
          mt={"10px"}
          justifyContent={{ base: "center", md: "flex-start" }}
          fontSize={{ base: "12px", md: "16px" }}
          fontWeight={{ base: "bold", md: "600" }}
        >
          {[
            {
              link: "country",
              icon: "https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Assets%2Findia.png?alt=media&token=eefb7660-71f3-494d-968a-8214a1756bb3",
            },
            {
              link: "gujarat",
              icon: "https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Assets%2Fkite.png?alt=media&token=1b1c0b56-2ea5-4a33-82b8-ab5184a2af8e",
            },
            {
              link: "surat",
              icon: "https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Assets%2Fdiamond.png?alt=media&token=1cbef06d-a956-4bf2-9e2b-b81431bd6493",
            },
            {
              link: "national",
              icon: "https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Assets%2Ftaj-mahal%20(1).png?alt=media&token=43b739c3-dca5-42a4-9f3e-afc146870640",
            },
            {
              link: "entertainment",
              icon: "https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Assets%2Fpopcorn.png?alt=media&token=32b6c98e-8b50-417f-accb-7e40160eb1c3",
            },
            {
              link: "cricket",
              icon: "https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Assets%2Fcricket.png?alt=media&token=5b90ce28-c707-4a43-b307-6ec5862058aa",
            },
            {
              link: "religion",
              icon: "https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Assets%2Ftemple.png?alt=media&token=baf49e30-cbac-4931-a690-acd7448c14ec",
            },
            {
              link: "surties",
              icon: "https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Assets%2Fexclusive.png?alt=media&token=1571677c-2faa-4fb1-89f9-e52f6993f4d5",
            },
          ].map((el, index) => (
            <ListItem
              border={{ base: "1px solid black ", md: "none" }}
              backgroundColor={"#E2E8F0"}
              color={{ base: "black", md: "black" }}
              display={"flex"}
              borderRadius={"10px"}
              alignItems={"center"}
              justifyContent={{ base: "center", md: "flex-start" }}
              gap={"4px"}
              key={index + el.link}
              _hover={{}}
              p={"2px"}
            >
              <Link
                style={{
                  textTransform: "capitalize",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
                href={`/news/catagory/${el.link}`}
              >
                <Image
                  width={{ base: "20px", md: "25px" }}
                  src={el.icon}
                  alt=""
                />
                {el.link}
              </Link>
            </ListItem>
          ))}
        </UnorderedList>
        <Box marginTop={"30px"}>
          <hr h={"2px"} />

          <Socials />
          <Box padding={"0px 20px"} backgroundColor={"#E2E8F0"}>
            {" "}
            <Newsletter />
          </Box>
        </Box>
      </Box>
      <Box
        marginTop={"-50px"}
        position={"static"}
        top={`${show ? "0%" : "2%"}`}
        left={"0%"}
        display={{ base: "flex", md: "none" }}
        justifyContent={"center"}
      >
        <Button
          h={"30px"}
          onClick={() => setShow(!show)}
          backgroundColor={"white"}
          fontSize={"8px"}
          p={"5px 25px 5px 25px"}
          border={"1px solid black"}
          color={"black"}
          top={"15px"}
          borderRadius={"40px"}
        >
          {!show ? "View All" : "Hide"}
        </Button>
      </Box>
    </Box>
  );
}

export default Sidebar;
