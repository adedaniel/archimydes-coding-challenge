import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Stack,
  Input,
  Button,
  FormControl,
  RadioGroup,
  Radio,
  useToast,
} from "@chakra-ui/core";
import Axios from "axios";
import Router from "next/router";
import { URL } from "../../utils/url";
import { useSelector, useDispatch } from "react-redux";
import { emptyStore } from "../../redux/actions";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginRole, setLoginRole] = useState("user");
  const toast = useToast();
  const dispatch = useDispatch();

  const submitLogin = (e) => {
    e.preventDefault();
    let loginPayload = {
      email,
      password,
      isAdmin: loginRole === "admin" ? true : false,
    };
    setIsLoading(true);
    Axios.post(URL + "/api/v1/signin", loginPayload)
      .then((result) => {
        localStorage.setItem("archimydes_access_token", result.data.token);
        localStorage.setItem("archimydes_user_role", loginRole);
        toast({
          position: "bottom-left",
          title: "Login successful",
          description: " please wait...",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        dispatch(emptyStore());
        Router.push("/");
        setIsLoading(false);
      })
      .catch((error) => {
        toast({
          position: "bottom-left",
          title: "Something weird happened.",
          description: "Please try again.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        console.log(error.response);
        setIsLoading(false);
      });
  };
  return (
    <Box
      display="table-cell"
      verticalAlign="middle"
      height="100vh"
      width="100vw"
      textAlign="center"
      backgroundColor="gray.50"
    >
      <Box
        backgroundColor="white"
        margin="0 auto"
        maxW={["xs", "lg"]}
        borderWidth="1px"
        rounded="lg"
        py={4}
        px={[6, 10]}
      >
        <form onSubmit={submitLogin}>
          <Text fontWeight="bold" color="primary.500" fontSize="2xl">
            Login
          </Text>

          <Text fontSize="md">
            Please enter your login credentials to continue
          </Text>
          <Stack mt={8} spacing={4}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              isRequired
              variant="filled"
              placeholder="E-mail address"
              className="hello"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              isRequired
              className="hello"
              variant="filled"
              placeholder="Password"
            />
            <RadioGroup
              value={loginRole}
              defaultValue={loginRole}
              spacing={8}
              onChange={(e) => setLoginRole(e.target.value)}
              isInline
            >
              <Radio variantColor="cyan" value="user">
                User
              </Radio>
              <Radio variantColor="cyan" value="admin">
                Administrator
              </Radio>
            </RadioGroup>
            <Button
              variant="solid"
              variantColor="primary"
              type="submit"
              isLoading={isLoading}
              margin="0 auto"
              width={["100%", 300]}
              my={4}
            >
              Continue
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
