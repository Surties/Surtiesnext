import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

import Link from "next/link";
import Navbar from "../../components/Navbar";

function ResetPage() {
  const [email, setEmail] = useState("");
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);
  const [emailSentFailed, setEmailSentFailed] = useState(false);
  const handleClick = () => {
    axios
      .post("https://surtiesserver.onrender.com/auth/forgot-password", {
        email,
      })
      .then((res) => {
        setEmailSentSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setEmailSentFailed(true);
      });
  };
  return (
    <>
      <Navbar />
      <Center
        alignItems={{ base: "flex-start", md: "center" }}
        p={8}
        h={"100vh"}
        backgroundColor={"#d91e26"}
      >
        <Center
          borderRadius={"12px"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          {!emailSentSuccess ? (
            <Center w={"400px"} flexDirection={"column"}>
              <Center p={6} alignItems={"baseline"}>
                <FormControl w={"300px"} pos={"static"} id="email" isRequired>
                  <FormLabel color={"black"}>Email address</FormLabel>
                  <Input
                    _placeholder={{ color: "black" }}
                    autoComplete="off"
                    pos={"static"}
                    required
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    focusBorderColor="#d91e26"
                    placeholder="Email"
                    type="email"
                  />
                </FormControl>
              </Center>
              <Center p={6}>
                <Button
                  onClick={handleClick}
                  color={"#d91e26"}
                  _hover={{ backgroundColor: "#d91e26", color: "white" }}
                >
                  Reset Password
                </Button>
              </Center>
            </Center>
          ) : (
            <Box textAlign="center" py={10} px={6}>
              <CheckCircleIcon boxSize={"50px"} color={"yellow.500"} />
              <Heading color={"white"} as="h2" size="xl" mt={6} mb={2}>
                Password reset link has been sent to your email
              </Heading>

              <Link href={"/login"}>
                <Button>Login Page</Button>
              </Link>
            </Box>
          )}
        </Center>
      </Center>
    </>
  );
}

export default ResetPage;
