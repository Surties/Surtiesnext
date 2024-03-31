"use client";
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  Box,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

function NewsSlider() {
  const [uploading, setUploading] = useState(false);

  const [loading, setloading] = useState("");
  const init = {
    heading: "",
    img: null,
    link: "",
  };
  const [formData, setFormData] = useState(init);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for empty fields
    const emptyFieldsArray = Object.entries(formData).filter(([key, value]) =>
      Array.isArray(value) ? value.length === 0 : !value
    );

    if (emptyFieldsArray.length > 0) {
      // Set empty fields to state for displaying error message
      setEmptyFields(emptyFieldsArray.map(([key, _]) => key));
      return;
    }

    try {
      const response = await axios.post(
        "https://surtiesserver.onrender.com/slider",
        formData
      );
      console.log(response);
      setUploading(false);
      setFormData(init);
      setEmptyFields([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      setUploading(false);
    }
  };

  const handleUploadImg = async () => {
    const file = formData.img[0];

    if (file === null) return;
    setUploading(true);
    const imgRef = ref(storage, `images/${file.name + Date.now()}`);
    try {
      const snapshot = await uploadBytes(imgRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setFormData({
        ...formData,
        img: downloadURL,
      });

      setUploading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Clear error for the changed field
    setEmptyFields((prev) => prev.filter((field) => field !== name));

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDelete = () => {
    setFormData({ ...formData, img: null });
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <FormControl id="file">
              <FormLabel>Upload File</FormLabel>
              <Flex gap={"10px"}>
                <Input
                  focusBorderColor="#d91e26"
                  type="file"
                  name="img"
                  onChange={handleChange}
                />
                <Button
                  pos={"static"}
                  loadingText=""
                  bg={"#d91e26"}
                  color={"white"}
                  _hover={{
                    bg: "yellow",
                    color: "#d91e26",
                  }}
                  isLoading={uploading}
                  onClick={handleUploadImg}
                >
                  <FaUpload />
                </Button>
              </Flex>
              <Box mt={"20px"}>
                {typeof formData.img !== "string" ? (
                  <></>
                ) : (
                  <div>
                    <Flex
                      justifyContent={"center"}
                      alignItems={"center"}
                      gap={"10px"}
                      flexDirection={"column"}
                    >
                      <img
                        style={{ width: "180px", borderRadius: "10px" }}
                        src={formData.img}
                        alt=""
                      />
                      <Button
                        onClick={handleDelete}
                        width={"100px"}
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </Flex>
                  </div>
                )}
              </Box>
            </FormControl>

            <FormControl id="heading">
              <FormLabel>Heading</FormLabel>
              <Input
                focusBorderColor="#d91e26"
                type="text"
                name="heading"
                onChange={handleChange}
                placeholder="Enter heading"
                value={formData.heading}
              />
            </FormControl>

            <FormControl id="link">
              <FormLabel>Link</FormLabel>
              <Input
                name="link"
                value={formData.link}
                focusBorderColor="#d91e26"
                type="text"
                onChange={handleChange}
                placeholder="Enter link"
              />
            </FormControl>

            {emptyFields.length > 0 && (
              <Text color={"red"} textAlign={"center"}>
                {`Please fill in the following fields: ${emptyFields.join(
                  ", "
                )}`}
              </Text>
            )}

            <Stack spacing={10} pt={2}>
              <Button
                isLoading={uploading}
                loadingText={"Loading..."}
                bg={"#d91e26"}
                color={"white"}
                _hover={{
                  bg: "yellow",
                  color: "#d91e26",
                }}
                type="submit"
                mt={4}
                isDisabled={emptyFields.length > 0}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default NewsSlider;
