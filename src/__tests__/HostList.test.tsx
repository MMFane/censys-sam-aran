import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import HostList from "../components/HostList";

describe("HostList", () => {
  test("HostCard renders expected data", () => {
    render(<HostList />);
    expect(screen.getByText("Host List"));
  });
});