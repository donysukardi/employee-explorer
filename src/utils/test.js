import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import App from "../App";

export function visit(path, options) {
  let router = { current: null };
  const screen = render(
    <MemoryRouter initialEntries={[path]}>
      <App />
      <Route
        render={props => {
          router.current = props;
          return null;
        }}
      />
    </MemoryRouter>,
    options
  );
  screen.router = router;
  return screen;
}

export function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}
