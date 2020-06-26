import React from "react";
import { Box, Text, Grid, Flex, Badge, Icon } from "@chakra-ui/core";
import Router from "next/router";

export default function StoriesList({
  allUserStories,
  isAdmin,
  dynamicSort,
  filterByType,
  sortAscending,
  sortValue,
}) {
  return (
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
  );
}
