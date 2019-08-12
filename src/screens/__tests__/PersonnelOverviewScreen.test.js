import { act } from "@testing-library/react";
import { visit, flushPromises } from "../../utils/test";

describe("PersonnelOverviewScreen", () => {
  it("should display overview of personnel with no subordinates", async () => {
    const fetchJsonSpy = jest.fn();
    jest.spyOn(global, "fetch").mockResolvedValue({
      status: 200,
      json: fetchJsonSpy
    });

    fetchJsonSpy.mockResolvedValue(["employee"]);

    const screen = visit("/John Steve");
    await act(async () => {
      await flushPromises();
    });

    expect(
      screen.getByText("John Steve's Subordinates Tree")
    ).toBeInTheDocument();
    expect(screen.getByText("employee - Subordinates: 0")).toBeInTheDocument();
  });

  it("should display overview of personnel with subordinates", async () => {
    const fetchJsonSpy = jest.fn();
    jest.spyOn(global, "fetch").mockResolvedValue({
      status: 200,
      json: fetchJsonSpy
    });

    fetchJsonSpy
      .mockResolvedValueOnce([
        "marketing director",
        { "direct-subordinates": ["Herman Foo", "Louis Christian"] }
      ])
      .mockResolvedValueOnce(["marketing manager"])
      .mockResolvedValueOnce(["marketing executive"]);

    const screen = visit("/Maggie Choo");
    await act(async () => {
      await flushPromises();
    });

    expect(
      screen.getByText("marketing director - Subordinates: 2")
    ).toBeInTheDocument();
    expect(screen.getByText("Herman Foo")).toBeInTheDocument();
    expect(screen.getByText("marketing manager")).toBeInTheDocument();
    expect(screen.getByText("Louis Christian")).toBeInTheDocument();
    expect(screen.getByText("marketing executive")).toBeInTheDocument();
  });

  it("should display error message when fetching non existent personnel", async () => {
    const fetchJsonSpy = jest.fn();
    jest.spyOn(global, "fetch").mockResolvedValue({
      status: 404
    });

    const screen = visit("/Jane Doe");
    await act(async () => {
      await flushPromises();
    });

    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(
      screen.getByText('Unable to fetch subordinates of "Jane Doe"')
    ).toBeInTheDocument();
  });
});
