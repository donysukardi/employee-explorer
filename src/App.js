import React from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider, ColorMode } from "theme-ui";
import HomeScreen from "./screens/HomeScreen";
import PersonnelOverviewScreen from "./screens/PersonnelOverviewScreen";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ColorMode />
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/:personnelName" component={PersonnelOverviewScreen} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
