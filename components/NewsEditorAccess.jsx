"use client";
import React from "react";
import UnAuthorized from "./UnAuthorized";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function NewsEditorAccess({ children }) {
  const { role, auth } = useSelector((store) => {
    return store.auth;
  });
  const router = useRouter();
  if (auth) {
    if (role === "newsEditor" || role === "admin") {
      return <>{children}</>;
    } else {
      return <UnAuthorized />;
    }
  } else {
    router.push("/");
  }
}

export default NewsEditorAccess;
