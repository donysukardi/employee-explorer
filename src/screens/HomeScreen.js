/** @jsx jsx */
import { jsx, Box } from "theme-ui";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";

function HomeScreen(props) {
  const { history } = props;
  function handleSubmit(value) {
    history.push(`/${encodeURIComponent(value)}`);
  }

  return (
    <Layout>
      <Box sx={{ mt: [3, "30vh"] }}>
        <SearchBar
          placeholder="Enter employee name..."
          onSubmit={handleSubmit}
        />
        <Box sx={{ mt: 3, ml: 2, fontSize: [0, 1] }}>
          <Link to={`/${encodeURIComponent("John Hartman")}`}>
            Try "John Hartman"?
          </Link>
        </Box>
      </Box>
    </Layout>
  );
}

export default HomeScreen;
