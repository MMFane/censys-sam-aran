import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { dataService } from "../services/dataService";
import { hosts } from "./fixtures/fixtures";
import HostList from "../components/HostList";

describe("HostList", () => {
  test("HostCard renders expected data", () => {
    const fetchHostsSpy = vi
      .spyOn(dataService, 'fetchHosts')
      .mockImplementation(async () => hosts);
    render(<HostList />);
    expect(fetchHostsSpy).toHaveBeenCalled()
    expect(screen.getByText("Host List"));
  });
});
