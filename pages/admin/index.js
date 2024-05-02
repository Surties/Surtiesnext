import React, { useEffect, useState } from "react";

import { Box, Button, Center } from "@chakra-ui/react";
import AdminAccess from "../../components/AdminAccess";
import AdminUserControl from "../../components/AdminUserControl";
import NewsEditorAccess from "../../components/NewsEditorAccess";
import AdminNewsForm from "../../components/AdminNewsForm";
import UpdateNews from "../../components/UpdateNews";
import Navbar from "../../components/Navbar";
import PrivateRoutes from "../../components/PrivateRoutes";

function Admin() {
  const [activeComponent, setActiveComponent] = useState(null);

  useEffect(() => {
    setActiveComponent(
      <NewsEditorAccess>
        <AdminUserControl />
      </NewsEditorAccess>
    );
  }, []);
  const renderComponent = (component) => {
    setActiveComponent(component);
  };
  return (
    <PrivateRoutes>
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
                    {" "}
                    <AdminNewsForm />{" "}
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
    </PrivateRoutes>
  );
}

export default Admin;
