"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  Stack,
  Badge,
  Button,
  Flex,
  Center,
  Grid,
  Spinner,
} from "@chakra-ui/react";
import UpdateNewsModal from "./UpdateNewsModal";
import Pagination from "./Pagination";
import Searchbar from "./Searchbar";
import { FaFilter } from "react-icons/fa";
import Filtering from "./Filtering";

const cata = [
  "country",
  "gujrat",
  "Surat",
  "National",
  "entertainment",
  "cricket",
  "religion",
  "surties",
];
function UpdateNews() {
  const [newsData, setNewsData] = useState([]);
  const [load, setLoad] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [query, setQuery] = useState("");

  const handleDelete = (el) => {
    setLoad(true);
    axios
      .delete(`${"https://surtiesserver.onrender.com/news"}/${el}`)
      .then((response) => {
        setLoad(!load);
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting resource:", error);
        setLoad(false);
      });
  };
  const fetchData = () => {
    setLoad(true);
    const apiUrl = `https://surtiesserver.onrender.com/news?page=${pageNumber}&search=${query}&filter=${filter}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setLoad(false);
        setNewsData(response.data.newsItems);
        setTotalPage(response.data.totalPages);
      })
      .catch((error) => {
        setLoad(false);
        console.error("Error fetching data:", error);
      });
  };
  const onSearch = (query) => {
    if (query.length >= 3) {
      setQuery(query);
      setPageNumber(1);
    } else {
    }
  };
  const onFilter = (e) => {
    setFilter(e);
    setPageNumber(1);
  };
  const handleReset = () => {
    setFilter("");
    setQuery("");
    setPageNumber(1);
  };
  useEffect(() => {
    fetchData();
  }, [pageNumber, filter, query]);

  return (
    <Center flexDirection={"column"}>
      <Grid
        gridGap={"10px"}
        templateColumns={{ base: "repeat(1,1fr)", md: "repeat(3,1fr)" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Searchbar onSearch={onSearch} />
        <Filtering onFilter={onFilter} cata={cata} />
        <Button onClick={handleReset} backgroundColor={"#d91e26"}>
          <Flex alignItems={"center"} gap={"15px"}>
            <Text color={"white"}>Reset</Text>
            <FaFilter color="white" />
          </Flex>
        </Button>
      </Grid>
      {load ? (
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
          {" "}
          <Grid
            w={"90%"}
            mt={"20px"}
            gridGap={"10px"}
            templateColumns={{ base: "repeat(1,1fr)", md: "repeat(4,1fr)" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {newsData.map((newsItem) => (
              <Box
                key={newsItem._id}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
              >
                <Center h={"200px"} overflow={"hidden"}>
                  <Image
                    w={"100%"}
                    src={newsItem.thumbnail}
                    alt={newsItem.Heading}
                    objectFit="cover"
                  />
                </Center>
                <Text fontSize="xl" mt={2}>
                  {newsItem.heading}
                </Text>
                <Text fontSize="md" mt={2}>
                  {newsItem.subHeading}
                </Text>
                <Flex
                  justifyContent={"space-between"}
                  direction="row"
                  mt={2}
                  spacing={4}
                  align="center"
                >
                  <Badge colorScheme="green">{`${newsItem.catagory} `}</Badge>
                  <Text>{new Date(newsItem.date).toLocaleDateString()}</Text>
                </Flex>
                <Stack>
                  <Text>{newsItem.author}</Text>
                </Stack>
                <Flex mt={"15px"} justifyContent={"space-between"}>
                  <Button
                    onClick={() => handleDelete(newsItem._id)}
                    colorScheme="red"
                  >
                    Delete
                  </Button>
                  <Center>
                    <Text>Views : {newsItem.clicks}</Text>
                  </Center>
                  <UpdateNewsModal fetchData={fetchData} id={newsItem._id} />
                </Flex>
              </Box>
            ))}
          </Grid>
          <Pagination
            current={pageNumber}
            total={totalPage}
            setPage={setPageNumber}
          />
        </>
      )}
    </Center>
  );
}

export default UpdateNews;
