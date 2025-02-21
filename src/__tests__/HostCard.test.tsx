import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import HostCard from "../components/HostCard";
import { hosts } from "./fixtures/fixtures";

describe("HostCard", () => {
  test("HostCard renders expected data", () => {
    render(<HostCard host={hosts[0]} />);
    expect(screen.getByText("1.2.3.4.5"));
    expect(screen.getByText("HTTP: 2"));
    expect(screen.getByText("HTTPS: 1"));
  });
});
