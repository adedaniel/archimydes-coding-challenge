import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Button, Stack } from "@chakra-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { readUserStories } from "../../redux/actions";
import Link from "next/link";
import Loader from "../../components/loading-animation";
import StoriesList from "./storiesList";
import SortStories from "./sortStories";
import FilterByType from "./filterByType";
export default function Dashboard() {
  const allUserStories = useSelector((state) => state.allUserStories);
  const actionsLoading = useSelector((state) => state.actionsLoading);
  const [sortAscending, setSortAscending] = useState(true);
  const [sortValue, setSortValue] = useState("");
  const [filterTypeValue, setFilterTypeValue] = useState("");
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
    return story.type.includes(filterTypeValue);
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
          <FilterByType
            filterTypeValue={filterTypeValue}
            setFilterTypeValue={setFilterTypeValue}
          />
          <SortStories
            sortValue={sortValue}
            setSortValue={setSortValue}
            sortAscending={sortAscending}
            setSortAscending={setSortAscending}
          />
        </Stack>
      </Box>
      <StoriesList
        allUserStories={allUserStories}
        dynamicSort={dynamicSort}
        filterByType={filterByType}
        isAdmin={isAdmin}
        sortAscending={sortAscending}
        sortValue={sortValue}
      />
    </Box>
  );
}
