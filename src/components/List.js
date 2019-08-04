/** @jsx jsx */
import { jsx } from "theme-ui";
import { motion, AnimatePresence } from "framer-motion";

const commonBorderStyle = {
  content: "''",
  position: "absolute",
  borderStyle: "solid",
  borderColor: "divider",
  borderTopWidth: 0,
  borderRightWidth: 0
};

function List(props) {
  const { isExpanded, showTreeBranch, children } = props;
  return (
    <AnimatePresence initial={true}>
      {isExpanded && (
        <motion.ul
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 }
          }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          sx={{
            pl: 4,
            listStyle: "none",
            position: "relative",
            mt: 0,
            ":before": showTreeBranch
              ? null
              : {
                  ...commonBorderStyle,
                  left: "-1rem",
                  top: 0,
                  bottom: 0,
                  borderLeftWidth: 1,
                  borderBottomWidth: 0
                }
          }}
        >
          {children}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}

function ListItem(props) {
  const { isLastItem, children } = props;
  return (
    <div
      sx={{
        position: "relative",
        ":before": {
          ...commonBorderStyle,
          left: "-1rem",
          top: "-1rem",
          bottom: "50%",
          width: "1rem",
          borderLeftWidth: 1,
          borderBottomWidth: 1
        },
        ":after": isLastItem
          ? null
          : {
              ...commonBorderStyle,
              left: "-1rem",
              top: "50%",
              bottom: 0,
              borderLeftWidth: 1,
              borderBottomWidth: 0
            }
      }}
    >
      {children}
    </div>
  );
}

function ListFlat(props) {
  return (
    <ul
      sx={{
        pl: 0,
        mt: -3
      }}
      {...props}
    />
  );
}

function ListItemContent(props) {
  return (
    <li
      sx={{
        paddingTop: 3,
        listStyle: "none"
      }}
      {...props}
    />
  );
}

export { List, ListFlat, ListItem, ListItemContent };
