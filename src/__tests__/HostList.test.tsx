import {
  afterEach,
  beforeEach,
  describe,
  expect,
  MockInstance,
  test,
  vi,
} from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { dataService } from "../services/dataService";
import { paginatedHosts } from "./fixtures/fixtures";
import HostList from "../components/HostList";

describe("HostList", () => {
  let fetchHostsSpy: MockInstance;

  beforeEach(() => {
    fetchHostsSpy = vi
      .spyOn(dataService, "fetchHosts")
      .mockImplementation(async () => paginatedHosts);
    render(<HostList />);
  });

  afterEach(() => {
    fetchHostsSpy.mockRestore();
  });

  test("HostList renders expected data", async () => {
    await waitFor(() => {
      expect(fetchHostsSpy).toHaveBeenCalledWith("", "");
      expect(screen.getByText("Host List"));
      expect(screen.getByText("Filter Hosts"));
      expect(screen.getByText("Load More"));
      expect(screen.getByText("1.2.3.4.5"));
    });
  });

  test("HostList loads more", async () => {
    const loadMoreBtn = await screen.findByText("Load More");
    act(() => {
      fireEvent.click(loadMoreBtn);
    });
    await waitFor(() => {
      expect(fetchHostsSpy).toHaveBeenCalledWith("abc123", "");
    });
  });

  test("HostList can query", async () => {
    const queryInput = await screen.findByLabelText("Filter Hosts");
    act(() => {
      userEvent.type(queryInput, "xyz");
    });
    await waitFor(() => {
      expect(fetchHostsSpy).toHaveBeenCalledWith("", "xyz");
    });
  });
});
