/** @jsx jsx */
import { jsx, Box, Flex } from "theme-ui";

const DISPLAY_MODE_TREE = "tree";
const DISPLAY_MODE_LIST = "list";

function DisplayModeToggle(props) {
  const { setDisplayMode, displayMode } = props;
  const handleChange = e => {
    setDisplayMode(e.target.value);
  };

  return (
    <Flex
      sx={{
        alignItems: "center",
        mb: 4,
        pb: 3,
        borderBottom: "1px solid",
        borderColor: "divider"
      }}
    >
      <Box>Display:</Box>
      <Box
        sx={{
          ml: 3
        }}
      >
        <label>
          <input
            type="radio"
            name="display-mode"
            value={DISPLAY_MODE_TREE}
            checked={displayMode === DISPLAY_MODE_TREE}
            onChange={handleChange}
          />{" "}
          Tree View
        </label>
      </Box>
      <Box
        sx={{
          ml: 3
        }}
      >
        <label>
          <input
            type="radio"
            name="display-mode"
            value={DISPLAY_MODE_LIST}
            checked={displayMode === DISPLAY_MODE_LIST}
            onChange={handleChange}
          />{" "}
          List View
        </label>
      </Box>
    </Flex>
  );
}

export { DISPLAY_MODE_TREE, DISPLAY_MODE_LIST };
export default DisplayModeToggle;
