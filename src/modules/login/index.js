import React, { useState } from "react";
import {
  Box,
  Text,
  Stack,
  Input,
  Button,
  RadioGroup,
  Radio,
  useToast,
} from "@chakra-ui/core";
import Axios from "axios";
import Router from "next/router";
import { URL } from "../../utils/url";
import { useDispatch } from "react-redux";
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
    setIsLoading(true); // Set isLoading to true
    Axios.post(URL + "/api/v1/signin", loginPayload)
      .then((result) => {
        // If successful,
        localStorage.setItem("archimydes_access_token", result.data.token); // store access token,
        localStorage.setItem("archimydes_user_role", loginRole); // and the user role too
        toast({
          // Then display a success message
          position: "bottom-left",
          title: "Login successful",
          description: " please wait...",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        dispatch(emptyStore()); // Next, we empty the store to receive the new data,
        setIsLoading(false); // and set isLoading to false too...

        Router.push("/"); // and finally direct the user to the story listings page
      })
      .catch((error) => {
        // If it failed to authenticate,
        toast({
          // Display error message,
          position: "bottom-left",
          title: "Something weird happened.",
          description: "Please try again.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        console.log(error.response);
        setIsLoading(false); // and also set isLoading to false
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
