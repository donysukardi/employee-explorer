/** @jsx jsx */
import { jsx, Box, Flex } from "theme-ui";
import { useColorMode } from "theme-ui";
import { Link } from "react-router-dom";
import {
  Layout as ViewportLayout,
  Header,
  Main,
  Container,
  Footer
} from "theme-ui";
import Toggle from "./Toggle";
import sun from "../assets/sun.png";
import moon from "../assets/moon.png";

const contentSizes = {
  sm: 540,
  md: 720,
  default: 960
};

function Layout({ contentSize = "md", children }) {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <ViewportLayout>
      <Header>
        <Flex
          sx={{
            p: 3,
            flexDirection: ["column", "row"],
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }}
        >
          <Box
            as={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "primary",
              fontWeight: "bold",
              fontSize: 3
            }}
            aria-label="Employee Explorer"
          >
            {"<EmployeeExplorer />"}
          </Box>
          <Flex
            sx={{
              mt: [3, 0],
              alignItems: "center"
            }}
          >
            <Toggle
              icons={{
                checked: (
                  <img
                    src={moon}
                    width="16"
                    height="16"
                    alt=""
                    style={{ pointerEvents: "none" }}
                  />
                ),
                unchecked: (
                  <img
                    src={sun}
                    width="16"
                    height="16"
                    alt=""
                    style={{ pointerEvents: "none" }}
                  />
                )
              }}
              checked={colorMode === "dark"}
              onChange={e => setColorMode(e.target.checked ? "dark" : "light")}
            />
          </Flex>
        </Flex>
      </Header>
      <Main>
        <Container
          sx={{
            maxWidth: contentSizes[contentSize]
          }}
        >
          {children}
        </Container>
      </Main>
      <Footer />
    </ViewportLayout>
  );
}

export default Layout;
