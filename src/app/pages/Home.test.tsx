import { render, screen } from "@testing-library/react";

import HomePage from "./Home";

test("renders the welcome heading", () => {
  render(<HomePage />);

  expect(screen.getByRole("heading", { name: "Welcome" })).toBeInTheDocument();
});
