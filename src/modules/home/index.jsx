import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Grid,
  Flex,
  Badge,
  Button,
  Icon,
  Stack,
  Select,
  IconButton,
  Input,
} from "@chakra-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { readUserStories } from "../../redux/actions";
import Link from "next/link";
import Router from "next/router";
import Loader from "../../components/loading-animation";
export default function Dashboard() {
  const allUserStories = useSelector((state) => state.allUserStories);
  const actionsLoading = useSelector((state) => state.actionsLoading);
  const [sortAscending, setSortAscending] = useState(true);
  const [sortValue, setSortValue] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [isAdmin] = useState(
    localStorage.getItem("archimydes_user_role") === "admin"
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (allUserStories.length === 0) {
      dispatch(readUserStories());
    }
  }, []);
  function dynamicSort(property, order) {
    var sort_order = 1;
    if (order === "desc") {
      sort_order = -1;
    }
    return function (a, b) {
      // a should come before b in the sorted order
      if (a[property] < b[property]) {
        return -1 * sort_order;
        // a should come after b in the sorted order
      } else if (a[property] > b[property]) {
        return 1 * sort_order;
        // a and b are the same
      } else {
        return 0 * sort_order;
      }
    };
  }
  const filterByType = (story) => {
    return story.type.includes(filterType);
  };

  return allUserStories.length === 0 ||
    actionsLoading.includes("READ_USER_STORIES") ? (
    <Loader />
  ) : (
    <Box backgroundColor="gray.50" height="100%" px={["6%", "6%", "6%", "10%"]}>
      <Box pt={10}>
        <Text fontSize="2xl">Welcome Back!</Text>
        <Flex justify="space-between">
          <Text
            lineHeight={["52px", "inherit"]}
            color="primary.500"
            fontWeight="bold"
            mt={0}
            fontSize="5xl"
          >
            Your Stories
          </Text>
          {!isAdmin && (
            <Link href="/add-story">
              <Button
                leftIcon="add"
                variant="solid"
                variantColor="primary"
                width={200}
                mt={4}
              >
                Add Story
              </Button>
            </Link>
          )}
        </Flex>
        <Flex my={8} justify="space-between">
          {isAdmin && (
            <Text fontSize="xl">
              You may click on any of the story cards to view more about the
              story
            </Text>
          )}
        </Flex>
        <Stack isInline={[false, false, true]} justify="space-between">
          <Flex>
            <Input
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              variant="filled"
              placeholder="Filter by Type"
            />
          </Flex>
          <Stack isInline>
            <Text pt={1}>Sort by &nbsp;</Text>
            <Select
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
              width="130px"
              variant="filled"
              placeholder="Choose"
            >
              <option value="id">ID</option>
              <option value="complexity">Complexity</option>
            </Select>
            <IconButton
              onClick={() => setSortAscending(!sortAscending)}
              aria-label="Sort Order"
              icon={sortAscending ? "chevron-up" : "chevron-down"}
            />
          </Stack>
        </Stack>
      </Box>

      <Grid
        mt={8}
        pb={16}
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
        gap={6}
      >
        {[...allUserStories]
          .filter(filterByType)
          .sort(dynamicSort(sortValue, sortAscending ? "asc" : "desc"))
          .map((story) => (
            <Box
              key={story.id}
              cursor={isAdmin ? "pointer" : "default"}
              borderRadius={16}
              w="100%"
              py={3}
              onClick={() =>
                isAdmin && Router.push("/story/[id]", "/story/" + story.id)
              }
              px={6}
              bg="white"
            >
              <Flex>
                <Box w="100%">
                  <Text fontWeight="bold" fontSize="xl">
                    {story.summary}
                  </Text>
                  <Text fontSize="lg" minH="80px">
                    {story.description}
                  </Text>
                  <Flex mt={4} justify="space-between">
                    <Badge fontSize="sm" py={1} px={2}>
                      {story.type}
                    </Badge>
                    <Badge
                      fontSize="sm"
                      variantColor={
                        story.complexity == "low"
                          ? "green"
                          : story.complexity == "mid"
                          ? "yellow"
                          : "red"
                      }
                      py={1}
                      px={2}
                    >
                      {story.complexity}
                    </Badge>
                  </Flex>
                  <Flex mt={4} justify="space-between">
                    <Text>
                      <Icon name="time" /> &nbsp; {story.estimatedHrs} hr
                      {story.estimatedHrs > 1 && "s"}
                    </Text>
                    <Text fontWeight="bold" fontSize="xl">
                      ${story.cost}
                    </Text>
                  </Flex>
                  {typeof story.isApproved !== "undefined" && (
                    <Badge
                      textAlign="center"
                      mt={3}
                      variantColor={story.isApproved ? "green" : "red"}
                      w="100%"
                      fontSize="sm"
                      py={2}
                      px={2}
                    >
                      {story.isApproved ? "ACCEPTED" : "REJECTED"}
                    </Badge>
                  )}
                </Box>
              </Flex>
            </Box>
          ))}
      </Grid>
    </Box>
  );
}
