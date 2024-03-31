"use client";
import React from "react";
import UnAuthorized from "./UnAuthorized";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function NewsEditorAccess({ children }) {
  const { role, auth } = useSelector((store) => {
    return store.auth;
  });

  if (role === "newsEditor" || role === "admin") {
    return <>{children}</>;
  } else {
    return <UnAuthorized />;
  }
}

export default NewsEditorAccess;
