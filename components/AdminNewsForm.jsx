"use client";
import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Stack,
  useColorModeValue,
  Grid,
  Text,
  Switch,
} from "@chakra-ui/react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { app, storage } from "../firebase/firebase";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
const initialFormData = {
  heading: "",
  subHeading: "",
  author: "",
  trending: false,
  instaLink: { link: "", content: "" },
  catagory: [],
  article: "",
  imgs: [],
  twitterLink: { link: "", content: "" },
  facebookLink: { link: "", content: "" },
  youtubeLink: { link: "", content: "" },
  breaking: false,
  thumbnail: null,
  imgDescribtion: [],
};
const linkinit = {
  instaLink: { link: "", content: "" },
  youtubeLink: { link: "", content: "" },
  facebookLink: { link: "", content: "" },
  twitterLink: { link: "", content: "" },
};
const AdminNewsForm = () => {
  const [files, setFiles] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [uploading1, setUploading1] = useState(false);
  const [uploading2, setUploading2] = useState(false);
  const [imgArticle, setImgArticle] = useState([]);
  const [embededLink, setEmbededLink] = useState(linkinit);
  const [loading, setloading] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: [files],
      });
    }
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
      if (
        name === "instaLink" ||
        name === "twitterLink" ||
        name === "youtubeLink" ||
        name === "facebookLink"
      ) {
        setFormData({
          ...formData,
          instaLink: {
            ...formData.instaLink,
            link: value,
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const { user } = useSelector((el) => {
    return el.auth;
  });
  const handleChangeImg1 = async () => {
    const file = thumbnail;
    setUploading1(true);
    if (file === null) return;
    const imgRef = ref(storage, `images/${file.name + Date.now()}`);
    try {
      const snapshot = await uploadBytes(imgRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      setFormData({
        ...formData,
        thumbnail: downloadURL,
      });

      setUploading1(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading1(false);
    }
  };
  const handleChangeImg2 = async () => {
    const array = [];

    if (files.length <= 2) {
      setUploading2(true);

      for (var i = 0; i < files.length; i++) {
        array.push(storeImg(files[i]));
      }
    }
    Promise.all(array).then((urls) => {
      const objs = urls.map((url) => ({ img: url, content: "" }));
      setImgArticle(objs);
      setUploading2(false);
    });
  };
  const storeImg = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      author: user,
      imgs: imgArticle,
      embededLink: embededLink,
    };
    setFormData(updatedFormData);
    setloading(true);
    try {
      const response = await axios.post(
        "https://surtiesserver.onrender.com/news",
        updatedFormData
      );
      console.log(response);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.error("Error:", error);
    }
    setFormData(initialFormData);
    setEmbededLink(linkinit);
    setImgArticle([]);
  };
  const handleDelete = () => {
    setFormData({ ...formData, thumbnail: null });
  };
  const handleDelete1 = (el) => {
    const newData = imgArticle.filter((element) => {
      return element !== el;
    });
    setImgArticle(newData);
  };
  const handleButtonClick = (lable) => {
    setFormData({ ...formData, catagory: lable });
  };

  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["image", "link", "html"], // Change "htmls" to "html"
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            // Color options
          ],
        },
      ],
    ],
  };

  var formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "align",
    "size",
    "images",
    "html",
  ];

  const handleProcedureContentChange = (content) => {
    setFormData({ ...formData, article: content });
  };
  const handleProcedureContentChange2 = (index, newContent) => {
    const updatedImgArticle = [...imgArticle];
    updatedImgArticle[index].content = newContent;
    setImgArticle(updatedImgArticle);
  };
  const handleQuillChange = (name, content) => {
    setEmbededLink((prevLinks) => ({
      ...prevLinks,
      [name]: { ...prevLinks[name], content: content },
    }));
  };
  const handleChange3 = (e) => {
    const { name, value } = e.target;

    setEmbededLink((prevLinks) => ({
      ...prevLinks,
      [name]: { ...prevLinks[name], link: value },
    }));
  };
  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack
          mt={"50px"}
          mb={"50px"}
          spacing={8}
          mx={"auto"}
          w={"100%"}
          py={18}
          px={6}
        >
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={10}
          >
            <form onSubmit={handleSubmit}>
              <FormControl mb={4}>
                <FormLabel fontWeight={"bold"}>Heading</FormLabel>
                <Input
                  focusBorderColor="#d91e26"
                  type="text"
                  name="heading"
                  value={formData.heading}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel fontWeight={"bold"}>Subheading</FormLabel>
                <Input
                  focusBorderColor="#d91e26"
                  type="text"
                  name="subHeading"
                  value={formData.subHeading}
                  onChange={handleChange}
                />
              </FormControl>
              <Box
                marginTop={"20px"}
                marginBottom={"60px"}
                display={"grid"}
                justifyContent={"center"}
              >
                <ReactQuill
                  value={formData.article}
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  placeholder="write your content ...."
                  onChange={handleProcedureContentChange}
                  style={{ height: "220px" }}
                ></ReactQuill>
              </Box>
              <FormControl mb={4}>
                <FormLabel fontWeight={"bold"}>Thumbnail</FormLabel>
                <Flex gap={"10px"}>
                  <Input
                    focusBorderColor="#d91e26"
                    type="file"
                    name="thumbnail"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                  />
                  <Button
                    isDisabled={thumbnail === null}
                    pos={"static"}
                    loadingText=""
                    bg={"#d91e26"}
                    color={"white"}
                    _hover={{
                      bg: "yellow",
                      color: "#d91e26",
                    }}
                    isLoading={uploading1}
                    onClick={handleChangeImg1}
                    type="button"
                  >
                    <FaUpload />
                  </Button>
                </Flex>
              </FormControl>
              <Box>
                {typeof formData.thumbnail !== "string" ? (
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
                        src={formData.thumbnail}
                        alt=""
                      />
                      <Button
                        onClick={handleDelete}
                        width={"100px"}
                        colorScheme="red"
                        type="button"
                      >
                        Delete
                      </Button>
                    </Flex>
                  </div>
                )}
              </Box>
              <FormControl mb={4}>
                <FormLabel fontWeight={"bold"}>Images</FormLabel>
                <Flex gap={"10px"}>
                  <Input
                    max
                    focusBorderColor="#d91e26"
                    multiple="multiple"
                    type="file"
                    name="imgs"
                    onChange={(e) => {
                      setFiles(e.target.files);
                    }}
                  />
                  <Button
                    type="button"
                    pos={"static"}
                    bg={"#d91e26"}
                    color={"white"}
                    _hover={{
                      bg: "yellow",
                      color: "#d91e26",
                    }}
                    isLoading={uploading2}
                    onClick={handleChangeImg2}
                    isDisabled={!files[0]}
                  >
                    <FaUpload />
                  </Button>
                </Flex>
              </FormControl>
              <Box>
                {!typeof imgArticle[0] ? (
                  <></>
                ) : (
                  <Grid templateColumns={"repeat(2,1fr)"} gap={"10px"}>
                    {imgArticle.map((el, index) => {
                      return (
                        <Flex
                          justifyContent={"center"}
                          direction={"column"}
                          alignItems={"center"}
                          gap={"10px"}
                          key={index}
                        >
                          <img
                            style={{ width: "200px", borderRadius: "10px" }}
                            src={el.img}
                            alt=""
                          />
                          <Button
                            type="button"
                            onClick={() => handleDelete1(el)}
                            width={"100px"}
                            colorScheme="red"
                          >
                            Delete
                          </Button>
                          <Flex h={{ base: "334px", md: "" }} mb={4}>
                            <ReactQuill
                              theme="snow"
                              modules={modules}
                              value={el.content}
                              formats={formats}
                              placeholder="Write your content ..."
                              onChange={(newContent) =>
                                handleProcedureContentChange2(index, newContent)
                              }
                              style={{ height: "200px" }}
                            ></ReactQuill>
                          </Flex>
                        </Flex>
                      );
                    })}
                  </Grid>
                )}
              </Box>
              <FormControl marginTop={"10px"} mb={4}>
                <FormLabel fontWeight={"bold"}>Instagram Link</FormLabel>
                <Input
                  focusBorderColor="#d91e26"
                  type="text"
                  name="instaLink"
                  value={embededLink.instaLink.link}
                  onChange={handleChange3}
                />
                <Box
                  marginTop={"20px"}
                  marginBottom={"60px"}
                  display={"grid"}
                  justifyContent={"center"}
                >
                  <ReactQuill
                    value={embededLink.instaLink.content}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    placeholder="write your content ...."
                    onChange={(content) =>
                      handleQuillChange("instaLink", content)
                    }
                    style={{ height: "220px" }}
                  ></ReactQuill>
                </Box>
              </FormControl>

              <FormControl marginTop={"10px"} mb={4}>
                <FormLabel fontWeight={"bold"}>YouTube Link</FormLabel>
                <Input
                  focusBorderColor="#d91e26"
                  type="text"
                  name="youtubeLink"
                  value={embededLink.youtubeLink.link}
                  onChange={handleChange3}
                />
                <Box
                  marginTop={"20px"}
                  marginBottom={"60px"}
                  display={"grid"}
                  justifyContent={"center"}
                >
                  <ReactQuill
                    value={embededLink.youtubeLink.content}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    placeholder="write your content ...."
                    onChange={(content) =>
                      handleQuillChange("youtubeLink", content)
                    }
                    style={{ height: "220px" }}
                  ></ReactQuill>
                </Box>
              </FormControl>

              <FormControl marginTop={"10px"} mb={4}>
                <FormLabel fontWeight={"bold"}>Facebook Link</FormLabel>
                <Input
                  focusBorderColor="#d91e26"
                  type="text"
                  name="facebookLink"
                  value={embededLink.facebookLink.link}
                  onChange={handleChange3}
                />
                <Box
                  marginTop={"20px"}
                  marginBottom={"60px"}
                  display={"grid"}
                  justifyContent={"center"}
                >
                  <ReactQuill
                    value={embededLink.facebookLink.content}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    placeholder="write your content ...."
                    onChange={(content) =>
                      handleQuillChange("facebookLink", content)
                    }
                    style={{ height: "220px" }}
                  ></ReactQuill>
                </Box>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel fontWeight={"bold"}>Twitter Link</FormLabel>
                <Input
                  focusBorderColor="#d91e26"
                  type="text"
                  name="twitterLink"
                  value={embededLink.twitterLink.link}
                  onChange={handleChange3}
                />
                <Box
                  marginTop={"20px"}
                  marginBottom={"60px"}
                  display={"grid"}
                  justifyContent={"center"}
                >
                  <ReactQuill
                    value={embededLink.twitterLink.content}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    placeholder="write your content ...."
                    onChange={(content) =>
                      handleQuillChange("twitterLink", content)
                    }
                    style={{ height: "220px" }}
                  ></ReactQuill>
                </Box>
              </FormControl>
              <Flex mt={"20px"} mb={"20px"} gap={"10px"}>
                <FormControl columns={{ base: 2, lg: 4 }}>
                  <Flex alignItems={"center"}>
                    <FormLabel fontWeight={"bold"}>Breaking News</FormLabel>
                    <Switch
                      size={"lg"}
                      colorScheme="red"
                      name="breaking"
                      isChecked={formData.breaking}
                      onChange={handleChange}
                      color={"#d91e26"}
                    />
                  </Flex>
                </FormControl>
                <FormControl columns={{ base: 2, lg: 4 }}>
                  <Flex alignItems={"center"}>
                    <FormLabel fontWeight={"bold"}>Trending News</FormLabel>
                    <Switch
                      size={"lg"}
                      colorScheme="red"
                      name="trending"
                      isChecked={formData.trending}
                      onChange={handleChange}
                    />
                  </Flex>
                </FormControl>
              </Flex>
              <Box>
                <FormLabel fontWeight={"bold"}>Catagory</FormLabel>
                <Grid
                  fontSize={{ base: "14px", md: "16px" }}
                  templateColumns={"repeat(2, 1fr)"}
                  gap={"10px"}
                  mb={4}
                >
                  {[
                    "country",
                    "gujarat",
                    "surat",
                    "national",
                    "entertainment",
                    "cricket",
                    "religion",
                    "surties",
                  ].map((label, index) => (
                    <Button
                      key={index}
                      _hover={{ border: "1px solid #d91e26" }}
                      fontSize={"14px"}
                      fontWeight={"400"}
                      color={formData.catagory == label ? "white" : "#d91e26"}
                      onClick={() => handleButtonClick(label)}
                      backgroundColor={
                        formData.catagory == label ? "#d91e26" : "transparent"
                      }
                    >
                      <Text textTransform={"capitalize"}> {label}</Text>
                    </Button>
                  ))}
                </Grid>
              </Box>
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={loading}
                  loadingText={"Uplaoding..."}
                  bg={"#d91e26"}
                  color={"white"}
                  _hover={{
                    bg: "yellow",
                    color: "#d91e26",
                  }}
                  type="submit"
                  mt={4}
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default AdminNewsForm;
