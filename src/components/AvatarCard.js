/** @jsx jsx */
import { jsx, Box, Flex } from "theme-ui";
import { ArrowIcon, Button } from "./common";
import { textOverflowEllipsis } from "./utils";

function AvatarCard({
  avatarUrl,
  name,
  description,
  url,
  isExpanded,
  expandable,
  onToggle,
  showTreeBranch,
  ...props
}) {
  return (
    <Box
      sx={{
        position: "relative",
        p: [3],
        variant: "cards.default"
      }}
      {...props}
    >
      <Flex
        sx={{
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        {avatarUrl ? (
          <img
            sx={{
              display: "block",
              width: "48px",
              height: "48px",
              objectFit: "cover",
              borderRadius: "default",
              bg: "muted",
              mr: 3
            }}
            src={avatarUrl}
            alt={`Avatar of ${name}`}
          />
        ) : name ? (
          <Flex
            sx={{
              borderRadius: "50%",
              width: 36,
              height: 36,
              justifyContent: "center",
              alignItems: "center",
              mr: 3,
              bg: "secondary",
              color: "white"
            }}
          >
            {name.substring(0, 1)}
          </Flex>
        ) : null}
        <Box>
          <Box
            sx={{
              ...textOverflowEllipsis,
              fontSize: 1,
              lineHeight: "relaxed"
            }}
          >
            {name}
          </Box>
          <Box
            sx={{
              ...textOverflowEllipsis,
              fontSize: 0,
              color: "textMuted",
              textTransform: "capitalize"
            }}
          >
            {description}
          </Box>
        </Box>
      </Flex>
      {expandable && (
        <Box
          sx={{
            position: "absolute",
            right: 3,
            top: 3,
            bottom: 3,
            zIndex: 2
          }}
        >
          <Button
            variant="secondary"
            onClick={onToggle}
            sx={{
              width: "48px",
              height: "100%",
              px: 0,
              py: 0
            }}
            aria-label="Expand / collapse details"
          >
            <ArrowIcon isExpanded={isExpanded} />
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default AvatarCard;
