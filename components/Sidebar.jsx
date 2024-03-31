"use client";
import React, { useState } from "react";
import { FaCity, FaFootballBall, FaGuilded } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";

import { BiCricketBall } from "react-icons/bi";
import { GiByzantinTemple, GiDramaMasks, GiIndianPalace } from "react-icons/gi";
import { RiGovernmentFill, RiMapPin5Fill, RiWomenFill } from "react-icons/ri";
import { CiGlobe } from "react-icons/ci";
import { TbHandFinger, TbWriting } from "react-icons/tb";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { Box, Button, ListItem, UnorderedList } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Socials from "./Socials";
import Newsletter from "./NewsLetter";
import Link from "next/link";

function Sidebar() {
  const [show, setShow] = useState(false);
  return (
    <Box>
      <Box
        overflow={"hidden"}
        backgroundColor={"#d91e26"}
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
          color={"white"}
          mt={"10px"}
          justifyContent={{ base: "center", md: "flex-start" }}
          fontSize={{ base: "12px", md: "16px" }}
          fontWeight={{ base: "bold", md: "600" }}
        >
          {[
            { link: "country", icon: <GiIndianPalace /> },
            { link: "gujrat", icon: <FaGuilded /> },
            { link: "surat", icon: <FaCity /> },
            { link: "national", icon: <RiMapPin5Fill /> },
            { link: "entertainment", icon: <GiDramaMasks /> },
            { link: "cricket", icon: <BiCricketBall /> },
            { link: "religion", icon: <GiByzantinTemple /> },
            { link: "surties", icon: <RiGovernmentFill /> },
          ].map((el, index) => (
            <ListItem
              border={{ base: "1px solid #d91e26 ", md: "none" }}
              backgroundColor={{ base: "white", md: "#d91e26" }}
              color={{ base: "#d91e26", md: "white" }}
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
                {el.icon}
                {el.link}
              </Link>
            </ListItem>
          ))}
        </UnorderedList>
        <Box marginTop={"30px"}>
          <hr h={"2px"} />

          <Socials />
          <Box padding={"0px 20px"} backgroundColor={"#d91e26"}>
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
          border={"1px solid #d91e26"}
          color={"#d91e26"}
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
