"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Box,
  IconButton,
  Center,
  Stack,
  Spinner,
  Switch,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import Searchbar from "./Searchbar";
import Pagination from "./Pagination";
axios.defaults.withCredentials = true;

function AdminUserControl() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://surtiesserver.onrender.com/auth?page=${page}&search=${query}`
      );
      setLoading(false);
      setUserData(response.data.users);
      setTotalPage(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (id) => {
    axios
      .patch(`https://surtiesserver.onrender.com/auth/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page, query]);

  const onSearch = (e) => {
    setQuery(e);
    setPage(1);
  };

  return (
    <Box p={[2, 4, 6]} maxWidth="100%">
      <Center w={{ base: "100%" }}>
        <Searchbar onSearch={onSearch} />
      </Center>
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
        <>
          {" "}
          <Table mt={["20px", "50px"]} mb={["20px", "50px"]} variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>

                <Th display={{ base: "none", md: "table-cell" }}>Role</Th>

                <Th display={{ base: "none", md: "table-cell" }}>
                  Profile Picture
                </Th>
                <Th>Change Role</Th>
                <Th>Admin Block</Th>
                <Th>Let them Change password</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userData.map((user) => (
                <Tr key={user._id}>
                  <Td
                    fontSize={{ base: "12px", md: "16px" }}
                    fontWeight={{ base: "bold", md: "600" }}
                  >
                    {user.name}
                  </Td>
                  <Td
                    fontSize={{ base: "14px", md: "16px" }}
                    fontWeight={{ base: "bold", md: "600" }}
                  >
                    {user.email}
                  </Td>
                  <Td display={{ base: "none", md: "table-cell" }}>
                    {user.role === "newsEditor" ? "News Editor" : "User"}
                  </Td>
                  <Td display={{ base: "none", md: "table-cell" }}>
                    <Box
                      justifyContent="center"
                      display="flex"
                      alignItems="center"
                    >
                      <Avatar src={user.profilePic} alt={user.name} />
                    </Box>
                  </Td>
                  <Td display="flex" justifyContent="center">
                    <IconButton
                      isDisabled={user.role === "admin"}
                      isLoading={loading}
                      onClick={() => handleChange(user._id)}
                      isRound
                      variant="solid"
                      colorScheme={
                        user.role !== "admin"
                          ? `${user.role === "user" ? "red" : "green"}`
                          : "blue"
                      }
                      aria-label="Done"
                      fontSize={["16px", "20px"]}
                      icon={
                        user.role !== "admin" ? (
                          user.role === "user" ? (
                            <CloseIcon />
                          ) : (
                            <CheckIcon />
                          )
                        ) : (
                          <CloseIcon />
                        )
                      }
                    />
                  </Td>
                  <Td>
                    {" "}
                    <Switch size="lg" colorScheme="red" />
                  </Td>{" "}
                  <Td>
                    {" "}
                    <Switch size="lg" colorScheme="red" />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Stack direction="row" spacing={4} justify="center">
            <Pagination total={totalPage} current={page} setPage={setPage} />
          </Stack>
        </>
      )}
    </Box>
  );
}

export default AdminUserControl;
