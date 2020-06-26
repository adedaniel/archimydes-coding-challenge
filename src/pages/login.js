import React from "react";
import LoginComponent from "../modules/login";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Archimydes | Login</title>
      </Head>
      <LoginComponent />
    </>
  );
}
