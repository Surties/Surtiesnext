"use client";
import React, { useState } from "react";
import {
  Box,
  FormControl,
  Input,
  Textarea,
  Button,
  FormLabel,
  Heading,
  Center,
} from "@chakra-ui/react";
import axios from "axios";

const ContactPageComp = () => {
  const [contactData, setContactData] = useState({});
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
  };

  const isValidMobile = (mobileno) => {
    return /^[6-9]\d{9}$/.test(mobileno);
  };

  const validateField = (field, value) => {
    if (value.length <= 0) {
      return (
        <>
          <span className="text-capitalize">{field}</span> is required field.
        </>
      );
    } else {
      if (field === "email") {
        if (!isValidEmail(value)) return "Invalid Email.";
      } else if (field === "mobile") {
        if (!isValidMobile(value)) return "Invalid Mobile Number.";
      } else {
        return "";
      }
    }
  };

  const handleBlur = (event) => {
    setErrorMsg(validateField(event.target.name, event.target.value));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContactData({
      ...contactData,
      [name]: value,
    });

    if (name === "mobile") {
      setContactData({
        ...contactData,
        mobile: value.replace(/\D/, ""),
      });
    }
  };

  const handleSubmit = (e) => {
    console.log();
    e.preventDefault();

    if (
      !contactData.name ||
      !contactData.mobile ||
      !contactData.email ||
      !contactData.subject ||
      !contactData.message
    ) {
      return;
    }
    console.log(contactData);

    handlePostRequest(contactData);
  };

  const handlePostRequest = async (postData) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/contacts", postData);
      console.log(response);
      setSuccessMsg(true);
      setLoading(false);

      console.log(response);
    } catch (error) {
      setLoading(false);

      setError(error);
      console.error("Error:", error);
    }
  };
  return (
    <Box
      backgroundColor={"white"}
      borderRadius={"8px"}
      width={{ base: "85%", md: "550px" }}
      id="contact"
      p={8}
    >
      <Center color={"#d91e26"}>
        {" "}
        <Heading>Contact Us</Heading>
      </Center>
      <Box className="form">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          autoComplete="off"
        >
          {successMsg ? (
            <Box h={"80vh"}>
              <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  color={"black"}
                  name="name"
                  type="text"
                  value={contactData.name || ""}
                  onChange={(e) => handleChange(e)}
                  onBlur={handleBlur}
                  focusBorderColor="#d91e26"
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Contact Number</FormLabel>{" "}
                <Input
                  name="mobile"
                  type="text"
                  maxLength={10}
                  onBlur={handleBlur}
                  focusBorderColor="#d91e26"
                  value={contactData.mobile || ""}
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Subject</FormLabel>{" "}
                <Input
                  name="subject"
                  type="text"
                  color={"black"}
                  value={contactData.subject || ""}
                  onChange={(e) => handleChange(e)}
                  onBlur={handleBlur}
                  focusBorderColor="#d91e26"
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Email</FormLabel>{" "}
                <Input
                  name="email"
                  type="email"
                  value={contactData.email || ""}
                  onChange={(e) => handleChange(e)}
                  onBlur={handleBlur}
                  color={"black"}
                  focusBorderColor="#d91e26"
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Message</FormLabel>{" "}
                <Textarea
                  name="message"
                  type="text"
                  color={"black"}
                  value={contactData.message || ""}
                  onChange={(e) => handleChange(e)}
                  onBlur={handleBlur}
                  focusBorderColor="#d91e26"
                  rows="5"
                />
              </FormControl>
              <p className="text-right mb-0">
                <Button
                  isDisabled={errorMsg}
                  isLoading={loading}
                  loadingText="Submitting"
                  type="submit"
                  color={"white"}
                  backgroundColor={"#d91e26"}
                  _hover={{}}
                >
                  Submit Now
                </Button>
              </p>
            </Box>
          ) : (
            <Box
              h={"80vh"}
              className="show"
              id="sendmessage"
              color="#007bff"
              textAlign="center"
                padding="15px"
                fontSize={'20px'}
              fontWeight="700"
              marginBottom="15px"
            >
              Thank you for your message. We will contact you soon.
            </Box>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default ContactPageComp;
