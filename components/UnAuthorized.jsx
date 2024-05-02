import React from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

function UnAuthorized() {
  return (
    <Box w={"100%"} mt={"100px"} textAlign="center" padding="20px">
      <Heading color="#FF3D00">Unauthorized Access</Heading>
      <Text>You do not have permission to access this content.</Text>
      <Link href={"/"}>
        <Button colorScheme="blue">Go Back</Button>
      </Link>
    </Box>
  );
}

export default UnAuthorized;
