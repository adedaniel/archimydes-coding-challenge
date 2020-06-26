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
  Flex,
  Badge,
} from "@chakra-ui/core";
import findInArray from "../../utils/findInArray";

import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { updateUserStory, readUserStories } from "../../redux/actions";
import { useRouter } from "next/router";
import Loader from "../../components/loading-animation";

export default function StoryDetailComponent() {
  const allUserStories = useSelector((state) => state.allUserStories);
  const actionsLoading = useSelector((state) => state.actionsLoading);
  const [storyId, setStoryId] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [complexity, setComplexity] = useState("");
  const [estimatedHrs, setEstimatedHrs] = useState("");
  const [cost, setCost] = useState("");
  const [isApproved, setIsApproved] = useState("false");
  const toast = useToast();

  const dispatch = useDispatch();
  useEffect(() => {
    if (allUserStories.length === 0) {
      dispatch(readUserStories());
    }
  }, []);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!findInArray(allUserStories, "id", id)) {
      allUserStories.length !== 0 && router.push("/");
    } else {
      const {
        id,
        summary,
        description,
        type,
        complexity,
        estimatedHrs,
        cost,
        isApproved,
      } = findInArray(allUserStories, "id", router.query.id);
      setStoryId(id);
      setSummary(summary);
      setDescription(description);
      setType(type);
      setComplexity(complexity);
      setEstimatedHrs(estimatedHrs);
      setCost(cost);
      setIsApproved(isApproved);
    }
  }, [allUserStories]);

  const setStoryStatus = (value) => {
    const updatedStoryObject = {
      id: storyId,
      summary,
      description,
      type,
      complexity,
      estimatedHrs,
      cost,
      isApproved: value,
    };
    dispatch(updateUserStory(updatedStoryObject));
    toast({
      position: "bottom-left",
      title: "Story Updated Successfully",
      description: "You're good to go!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    router.push("/");
  };
  return allUserStories.length === 0 ||
    actionsLoading.includes("READ_USER_STORIES") ? (
    <Loader />
  ) : (
    <Box
      display="table-cell"
      verticalAlign="middle"
      height="100vh"
      width="100vw"
      backgroundColor="gray.50"
    >
      <Box
        backgroundColor="white"
        margin="0 auto"
        maxW={["sm", "lg"]}
        borderWidth="1px"
        rounded={[false, "lg"]}
        py={4}
        px={[6, 8]}
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
        <Flex>
          <Text fontSize="2xl">Task #{storyId}: &nbsp;</Text>
          <Text fontWeight="bold" color="primary.500" fontSize="2xl">
            {summary}
          </Text>
        </Flex>
        <Text mt={3} fontSize="lg">
          {description}
        </Text>
        <Stack mt={4} spacing={1}>
          <Flex justify="space-between">
            <Box>
              <Flex>
                <Text>Type: &nbsp;</Text>
                <Text textTransform="capitalize" fontWeight="bold">
                  {type}
                </Text>
              </Flex>
            </Box>
            <Box>
              <Flex>
                <Text>Complexity: &nbsp;</Text>
                <Text textTransform="capitalize" fontWeight="bold">
                  {complexity}
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Flex justify="space-between">
            <Box>
              <Flex>
                <Text>Estimated time: &nbsp;</Text>
                <Text fontWeight="bold">{estimatedHrs} hr</Text>
              </Flex>
            </Box>
            <Box>
              <Flex>
                <Text>Cost: &nbsp;</Text>
                <Text fontWeight="bold">${cost}</Text>
              </Flex>
            </Box>
          </Flex>
          {typeof isApproved !== "undefined" && (
            <Box mt={3}>
              <Flex>
                <Text>Status: &nbsp;</Text>
                <Badge
                  fontSize="md"
                  variantColor={isApproved ? "green" : "red"}
                  py={1}
                  px={2}
                >
                  {isApproved ? "ACCEPTED" : "REJECTED"}
                </Badge>
              </Flex>
            </Box>
          )}
        </Stack>
        <Stack mt={6} isInline justify="flex-end">
          <Button
            variant="solid"
            variantColor="red"
            fontWeight="normal"
            onClick={() => setStoryStatus(false)}
            width={["100%", 150]}
            my={4}
          >
            Reject
          </Button>
          <Button
            variant="solid"
            variantColor="green"
            fontWeight="normal"
            onClick={() => setStoryStatus(true)}
            width={["100%", 150]}
            my={4}
          >
            Accept
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
