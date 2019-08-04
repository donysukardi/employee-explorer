import { act, fireEvent } from "@testing-library/react";
import { visit, flushPromises } from "../../utils/test";

describe("HomeScreen", () => {
  it("should display search bar and navigate user to PersonnelOverviewScreen upon searching", async () => {
    const screen = visit("/");
    const input = screen.getByPlaceholderText("Enter employee name...");
    const button = screen.getByText("Search");

    act(() => {
      fireEvent.change(input, { target: { value: "John Hartman" } });
    });
    act(() => {
      fireEvent.click(button);
    });

    const currentRoute = screen.router.current.location.pathname;
    expect(currentRoute).toBe("/John Hartman");
  });
});
