import { cleanup, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { afterEach, expect, test } from "vitest";
import ErrorPage from "./ErrorPage";

afterEach(cleanup);

test("unexpected route errors show recovery without exposing internal details", async () => {
  const router = createMemoryRouter([
    {
      path: "/",
      loader: () => {
        throw new Error("sensitive internal details");
      },
      element: <p>Loaded</p>,
      errorElement: <ErrorPage />,
      hydrateFallbackElement: <p>Loading</p>,
    },
  ]);
  render(<RouterProvider router={router} />);
  expect(
    await screen.findByRole("heading", { name: "Something went wrong" }),
  ).toBeInTheDocument();
  expect(
    screen.queryByText("sensitive internal details"),
  ).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Return to home" })).toHaveAttribute(
    "href",
    "/",
  );
});
