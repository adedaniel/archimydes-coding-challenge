import React, { useState, useEffect } from "react";
import Router from "next/router";
import Loader from "../components/loading-animation";
export const withAuth = (Component) => {
  return function Auth(props) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    useEffect(() => {
      localStorage.getItem("archimydes_access_token") // read access token
        ? setIsAuthorized(true)
        : Router.push("/login"); //redirect to login if token is not defined
    }, []);
    return isAuthorized ? <Component {...props} /> : <Loader />;
  };
};
