import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";
import { CiShare2 } from "react-icons/ci";

import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { usePathname } from "next/navigation";
function ShareOn() {
  const shareUrl = usePathname();

  return (
    <Box>
      <Center marginTop={"20px"} fontSize={"18px"} gap={"4%"}>
        <CiShare2 fontSize={"22px"} />
        <Text>SHARE ON</Text>
      </Center>
      <Center padding={"20px 0px"} gap={"5%"}>
        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
      </Center>
    </Box>
  );
}

export default ShareOn;
