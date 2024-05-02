"use client";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Center,
  Spinner,
} from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { EMAIL_UPDATE } from "../redux/auth/auth.actiontype";

const Profile = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: "",
    name: "",
    profilePic: "",
  });
  const { email, id } = useSelector((store) => {
    return store.auth;
  });

  const dispatch = useDispatch();
  const inputFileRef = useRef();
  const onBtnClick = () => {
    inputFileRef.current.click();
  };
  const onFileChangeCapture = async (e) => {
    const file = e.target.files[0];

    if (file === null) return;

    const imgRef = ref(storage, `profiles/${file.name + Date.now()}`);
    try {
      setLoading2(true);
      const snapshot = await uploadBytes(imgRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setContactInfo({
        ...contactInfo,
        profilePic: downloadURL,
      });
      setLoading2(false);
    } catch (error) {
      setLoading2(false);
      console.error("Error uploading image:", error);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };
  const getData = () => {
    axios
      .get(`https://surtiesserver.onrender.com/auth/${id}?email=${email}`)
      .then((res) => {
        setContactInfo({
          email: res.data.email,
          name: res.data.name,
          profilePic: res.data.profilePic,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const postData = async () => {
    setLoading(true);
    await axios
      .patch(`https://surtiesserver.onrender.com/auth/user/${id}`, contactInfo)
      .then((res) => {
        setLoading(false);
        dispatch({ type: EMAIL_UPDATE, payload: contactInfo });
        getData();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Flex
      minH={{ base: "0vh", md: "30vh", lg: "100vh" }}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      {loading ? (
        <Center mt={"20px"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#d91e26"
            size="xl"
          />
        </Center>
      ) : (
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            rounded={"lg"}
            marginTop={"20px"}
            boxShadow={"lg"}
            p={8}
          >
            <Box
              onClick={onBtnClick}
              borderRadius={"50%"}
              top={{ base: "90px", md: "190px" }}
              pos={"absolute"}
              w={"100px"}
              h={"100px"}
              //   bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              cursor={"pointer"}
              overflow={"hidden"}
            >
              {loading2 ? (
                <Center mt={"20px"}>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="#d91e26"
                    size="xl"
                  />
                </Center>
              ) : (
                <>
                  <img
                    width={"150px"}
                    h={"150px"}
                    src={contactInfo.profilePic}
                    alt=""
                  />
                  <input
                    ref={inputFileRef}
                    onChangeCapture={onFileChangeCapture}
                    style={{ display: "none" }}
                    type="file"
                  />
                </>
              )}
            </Box>
            <Stack spacing={4}>
              <HStack>
                <Box paddingTop={"40px"}>
                  <FormControl pos={"static"} id="firstName">
                    <FormLabel>First Name</FormLabel>
                    <Input
                      pos={"static"}
                      focusBorderColor="#d91e26"
                      name="name"
                      onChange={handleChange}
                      type="text"
                      value={contactInfo.name}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl pos={"static"} id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  pos={"static"}
                  focusBorderColor="#d91e26"
                  onChange={handleChange}
                  name="email"
                  type="email"
                  value={contactInfo.email}
                />
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={loading}
                  pos={"static"}
                  loadingText="Submitting"
                  size="lg"
                  bg={"#d91e26"}
                  color={"white"}
                  _hover={{
                    bg: "yellow",
                    color: "#d91e26",
                  }}
                  onClick={postData}
                >
                  Update
                </Button>
                <Text color={"red"} textAlign={"center"}>
                  {message}
                </Text>
                {/* <OAuth /> */}
              </Stack>
            </Stack>
          </Flex>
        </Stack>
      )}
    </Flex>
  );
};
export default Profile;
