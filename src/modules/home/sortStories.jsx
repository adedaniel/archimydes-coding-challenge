import React from "react";
import { Text, Stack, Select, IconButton } from "@chakra-ui/core";
export default function SortStories({
  sortValue,
  sortAscending,
  setSortValue,
  setSortAscending,
}) {
  return (
    <Stack isInline>
      <Text pt={1}>Sort by &nbsp;</Text>
      <Select
        value={sortValue}
        onChange={(e) => setSortValue(e.target.value)} //change sort option
        width="130px"
        variant="filled"
        placeholder="Choose"
      >
        <option value="id">ID</option>
        <option value="complexity">Complexity</option>
      </Select>
      <IconButton
        onClick={() => setSortAscending(!sortAscending)} // change sort order
        aria-label="sort-order"
        icon={sortAscending ? "chevron-up" : "chevron-down"}
      />
    </Stack>
  );
}
