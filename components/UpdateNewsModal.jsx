"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Flex,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Grid,
  Text,
  Textarea,
  Radio,
  RadioGroup,
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
const initialFormData = {
  heading: "",
  subHeading: "",
  author: "",
  trending: false,
  numberOfClick: 0,
  catagory: [],
  article: "",
  imgs: [],
  thumbnail: null,
  breakingL: false,
};

function UpdateNewsModal({ id, fetchData }) {
  const [files, setFiles] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [uploading1, setUploading1] = useState(false);
  const [uploading2, setUploading2] = useState(false);

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
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const getSingleData = () => {
    axios.get(`https://surtiesserver.onrender.com/news/${id}`).then((res) => {
      setFormData(res.data);
      setSelectedButtons(res.data.catagory);
    });
  };

  const handleChangeImg1 = async () => {
    setUploading1(true);
    const file = formData.thumbnail[0][0];
    console.log(file);
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
    setUploading2(true);
    const array = [];

    for (var i = 0; i < files.length; i++) {
      array.push(storeImg(files[i]));
    }
    Promise.all(array).then((urls) => {
      setFormData({ ...formData, imgs: formData.imgs.concat(urls) });
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

    axios
      .patch(`${"https://surtiesserver.onrender.com/news"}/${id}`, formData)
      .then((response) => {
        fetchData();
        console.log(response);
      })
      .catch((error) => {
        console.error("Error updating resource:", error);
      });
    onClose();
  };
  const handleDelete = () => {
    setFormData({ ...formData, thumbnail: null });
  };
  const handleDelete1 = (el) => {
    const newData = formData.imgs.filter((element) => {
      return element !== el;
    });

    setFormData({ ...formData, imgs: newData });
  };
  const handleButtonClick = (lable) => {
    if (selectedButtons.includes(lable)) {
      setSelectedButtons(selectedButtons.filter((item) => item !== lable));
      setFormData({ ...formData, catagory: selectedButtons });
    } else {
      console.log(selectedButtons);
      if (selectedButtons.length <= 3) {
        setSelectedButtons([...selectedButtons, lable]);
        setFormData({ ...formData, catagory: selectedButtons });
      }
    }
  };
  useEffect(() => {
    getSingleData();
  }, []);
  const handleClick = () => {
    onOpen();
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Button colorScheme="green" onClick={handleClick}>
        Edit
      </Button>

      <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={"#d91e26"} textColor={"white"}>
            Upadate News
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody display={"flex"} justifyContent={"center"}>
            <Flex>
              <Stack>
                <Box>
                  <form onSubmit={handleSubmit}>
                    <FormControl mb={4}>
                      <FormLabel>Heading</FormLabel>
                      <Input
                        focusBorderColor="#d91e26"
                        type="text"
                        name="heading"
                        value={formData.heading}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl mb={4}>
                      <FormLabel>Subheading</FormLabel>
                      <Input
                        focusBorderColor="#d91e26"
                        type="text"
                        name="subHeading"
                        value={formData.subHeading}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>Article</FormLabel>
                      <Textarea
                        focusBorderColor="#d91e26"
                        name="article"
                        className="jobProfileSelector"
                        rows={6}
                        value={formData.article}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>Thumbnail</FormLabel>
                      <Flex gap={"10px"}>
                        <Input
                          focusBorderColor="#d91e26"
                          type="file"
                          name="thumbnail"
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
                          isLoading={uploading1}
                          onClick={handleChangeImg1}
                          type="button"
                        >
                          Upload
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
                      <FormLabel>Images</FormLabel>
                      <Flex gap={"10px"}>
                        <Input
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
                        >
                          Upload
                        </Button>
                      </Flex>
                    </FormControl>
                    <Box>
                      {typeof formData.imgs[0] !== "string" ? (
                        <></>
                      ) : (
                        <Flex gap={"10px"}>
                          {formData.imgs.map((el, index) => {
                            return (
                              <Flex
                                justifyContent={"center"}
                                direction={"column"}
                                alignItems={"center"}
                                gap={"10px"}
                                key={index}
                              >
                                <img
                                  style={{
                                    width: "160px",
                                    borderRadius: "10px",
                                  }}
                                  src={el}
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
                              </Flex>
                            );
                          })}
                        </Flex>
                      )}
                    </Box>

                    <Flex mt={"20px"} mb={"20px"} gap={"10px"}>
                      <FormControl columns={{ base: 2, lg: 4 }}>
                        <Flex alignItems={"center"}>
                          <FormLabel fontWeight={"bold"}>
                            Breaking News
                          </FormLabel>
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
                          <FormLabel fontWeight={"bold"}>
                            Trending News
                          </FormLabel>
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
                      <FormLabel>Catagory</FormLabel>
                      <Grid
                        templateColumns={"repeat(3, 1fr)"}
                        gap={"8px"}
                        mb={4}
                      >
                        {[
                          "country",
                          "gujrati",
                          "Surat",
                          "National",
                          "entertainment",
                          "cricket",
                          "religion",
                          "surties",
                        ].map((label, index) => (
                          <Button
                            key={label + index}
                            _hover={{ border: "1px solid #d91e26" }}
                            fontSize={"14px"}
                            color={
                              selectedButtons.includes(label)
                                ? "white"
                                : "#d91e26"
                            }
                            onClick={() => {
                              handleButtonClick(label, index);
                            }}
                            backgroundColor={
                              selectedButtons.includes(label)
                                ? "#d91e26"
                                : "transparent"
                            }
                          >
                            <Text
                              fontWeight={"400"}
                              textTransform={"capitalize"}
                            >
                              {label}
                            </Text>
                          </Button>
                        ))}
                      </Grid>
                    </Box>
                    <Stack spacing={10} pt={2}>
                      {" "}
                      <Button
                        bg={"#d91e26"}
                        color={"white"}
                        _hover={{
                          bg: "yellow",
                          color: "#d91e26",
                        }}
                        type="submit"
                        mt={4}
                      >
                        Update
                      </Button>
                    </Stack>
                  </form>
                </Box>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default UpdateNewsModal;
