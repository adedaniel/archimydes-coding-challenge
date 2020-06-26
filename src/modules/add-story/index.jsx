import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Grid,
  Flex,
  Badge,
  Button,
  Icon,
  Stack,
  Input,
  FormControl,
  RadioGroup,
  Radio,
  useToast,
  Textarea,
  Select,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/core";
import Axios from "axios";
import Link from "next/link";
import { FaDollarSign } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { createNewStory } from "../../redux/actions";
import findInArray from "../../utils/findInArray";
import Router from "next/router";

export default function AddStoryComponent() {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [complexity, setComplexity] = useState("");
  const [timeToComplete, setTimeToComplete] = useState("");
  const [cost, setCost] = useState("");

  const actionsLoading = useSelector((state) => state.actionsLoading);
  const actionsError = useSelector((state) => state.actionsError);
  const actionsSuccess = useSelector((state) => state.actionsSuccess);
  const dispatch = useDispatch();
  const toast = useToast();
  useEffect(() => {
    findInArray(actionsError, "errorType", "CREATE_NEW_STORY") &&
      toast({
        position: "bottom-left",
        title: "Something weird happened.",
        description: "Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
  }, [actionsError]);
  useEffect(() => {
    if (findInArray(actionsSuccess, "successType", "CREATE_NEW_STORY")) {
      toast({
        position: "bottom-left",
        title: "Successfully Added",
        description: "You're good to go!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      Router.push("/");
    }
  }, [actionsSuccess]);
  const submitNewStory = (e) => {
    e.preventDefault();
    let addStoryPayload = {
      summary,
      description,
      type,
      complexity,
      estimatedHrs: timeToComplete,
      cost,
    };
    // console.log(addStoryPayload);
    dispatch(createNewStory(addStoryPayload));
  };

  return (
    <Box
      display="table-cell"
      verticalAlign="middle"
      height="100vh"
      width="100vw"
      //   textAlign="center"
      backgroundColor="gray.50"
    >
      <Box
        backgroundColor="white"
        margin="0 auto"
        maxW={["sm", "xl", "2xl"]}
        borderWidth="1px"
        rounded={[false, "lg"]}
        py={4}
        px={8}
      >
        <Link href="/">
          <Button
            variantColor="gray"
            color="gray.600"
            leftIcon="arrow-back"
            variant="ghost"
          >
            Back
          </Button>
        </Link>
        <form onSubmit={submitNewStory}>
          <Text color="primary.500" fontWeight="bold" fontSize="3xl">
            Add New Story
          </Text>

          <Stack mt={8} spacing={6}>
            <Input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              height={12}
              isRequired
              fontWeight="bold"
              variant="flushed"
              pl={3}
              maxLength={80}
              fontSize="xl"
              placeholder="Enter Story summary"
              className="hello"
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
              isRequired
              minH={200}
              placeholder="Write a short description here (200 characters max)"
            />
            <Stack isInline spacing={[4, 8]}>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                isRequired
                variant="filled"
                placeholder="Select story type"
              >
                <option value="enhancement">Enhancement</option>
                <option value="bugfix">Bugfix</option>
                <option value="development">Development</option>
                <option value="qa">QA</option>
              </Select>
              <Select
                value={complexity}
                onChange={(e) => setComplexity(e.target.value)}
                isRequired
                variant="filled"
                placeholder="Choose Complexity "
              >
                <option value="low">Low</option>
                <option value="mid">Medium</option>
                <option value="high">High</option>
              </Select>
            </Stack>
            <Stack isInline spacing={[4, 8]}>
              <Input
                value={timeToComplete}
                onChange={(e) => setTimeToComplete(e.target.value)}
                variant="outline"
                isRequired
                type="number"
                placeholder="Estimated time for completion (hrs)"
              />
              <InputGroup width="100%">
                <InputLeftElement
                  children={<Box as={FaDollarSign} color="gray.300" />}
                />
                <Input
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  variant="outline"
                  isRequired
                  type="number"
                  placeholder="Cost associated"
                />
              </InputGroup>
            </Stack>
            <Button
              variant="solid"
              variantColor="primary"
              type="submit"
              isLoading={actionsLoading.includes("CREATE_NEW_STORY")}
              fontWeight="normal"
              margin="0 auto"
              width={["100%", 300]}
              my={4}
            >
              Create
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
