import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders project list screen", () => {
  render(<App />);
  const element = screen.getByRole("table");
  expect(element).toBeInTheDocument();
});
