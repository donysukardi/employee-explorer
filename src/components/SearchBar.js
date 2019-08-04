/** @jsx jsx */
import { jsx, Box, Flex } from "theme-ui";
import React from "react";
import { Button, Input } from "./common";

function SearchBar(props) {
  const [value, setValue] = React.useState("");
  const { onSubmit, ...restProps } = props;
  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        sx={{
          width: "100%",
          alignItems: "stretch"
        }}
      >
        <Input
          type="search"
          name="search"
          value={value}
          onChange={handleChange}
          required
          sx={{
            flex: 1,
            fontSize: 2
          }}
          {...restProps}
        />
        <Box
          sx={{
            ml: 2
          }}
        >
          <Button
            sx={{
              fontSize: 2
            }}
          >
            Search
          </Button>
        </Box>
      </Flex>
    </form>
  );
}

export default SearchBar;
