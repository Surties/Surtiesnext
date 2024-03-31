import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Button, Center } from "@chakra-ui/react";
import NewsEditorAccess from "../../components/NewsEditorAccess";
import AdminNewsForm from "../../components/AdminNewsForm";
import AdminAccess from "../../components/AdminAccess";
import AdminUserControl from "../../components/AdminUserControl";
import UpdateNews from "../../components/UpdateNews";
import Navbar from "../../components/Navbar";

function Admin() {
  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState(null);

  // Check if component is mounted to avoid SSR errors
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Client-side code that uses useRouter
      const { id } = router.query;
      console.log("ID from query:", id);
    }
  }, [router.query]);

  const renderComponent = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <Navbar />
      <Box mt={"50px"}>
        <Center
          display={"grid"}
          gridTemplateColumns={{
            base: "repeat(2,44%)",
            md: "repeat(2,36%)",
            lg: "repeat(4,180px)",
          }}
          mt={"50px"}
          gap={"10px"}
        >
          <Button
            backgroundColor={"transparent"}
            onClick={() =>
              renderComponent(
                <AdminAccess>
                  <AdminUserControl />
                </AdminAccess>
              )
            }
          >
            Admin Control
          </Button>

          <Button
            backgroundColor={"transparent"}
            onClick={() =>
              renderComponent(
                <NewsEditorAccess>
                  <AdminNewsForm />
                </NewsEditorAccess>
              )
            }
          >
            Upload News
          </Button>
          <Button
            backgroundColor={"transparent"}
            onClick={() =>
              renderComponent(
                <NewsEditorAccess>
                  <UpdateNews />
                </NewsEditorAccess>
              )
            }
          >
            Upadate News
          </Button>
        </Center>

        <Center>{activeComponent && <div>{activeComponent}</div>}</Center>
      </Box>
    </>
  );
}

export default Admin;
