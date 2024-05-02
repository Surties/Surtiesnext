"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import UnAuthorized from "./UnAuthorized";
// const Redirect = ({ to }) => {
//   const router = useRouter();
//   useEffect(() => {
//     router.push(to);
//   }, [to]);
//   return null;
// };
function PrivateRoutes({ children }) {
  const { auth, role } = useSelector((store) => store.auth);

  if (auth) {
    if (role === "admin") {
      return children;
    } else if (role === "newsEditor") {
      return children;
    } else {
      return <UnAuthorized />;
    }
  }
  return <UnAuthorized />;
}

export default PrivateRoutes;
