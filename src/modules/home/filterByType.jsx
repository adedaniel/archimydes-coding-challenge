import React from "react";
import { Flex, Input } from "@chakra-ui/core";

export default function FilterByType({ filterTypeValue, setFilterTypeValue }) {
  return (
    <Flex>
      <Input
        value={filterTypeValue}
        onChange={(e) => setFilterTypeValue(e.target.value)}
        variant="filled"
        placeholder="Filter by Type"
      />
    </Flex>
  );
}
