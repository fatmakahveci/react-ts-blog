import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { afterEach, expect, test } from "vitest";
import { routes } from "./App";

afterEach(cleanup);

test("navigates from catalog to product and back", async () => {
  render(
    <RouterProvider
      router={createMemoryRouter(routes, { initialEntries: ["/products"] })}
    />,
  );
  fireEvent.click(screen.getByRole("link", { name: "Product 1" }));
  expect(
    await screen.findByRole("heading", { name: "Product Details" }),
  ).toBeInTheDocument();
  expect(screen.getByText("Product 1")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("link", { name: "Back" }));
  expect(
    await screen.findByRole("heading", { name: "Products" }),
  ).toBeInTheDocument();
});

test("unknown products provide a recovery link", () => {
  render(
    <RouterProvider
      router={createMemoryRouter(routes, {
        initialEntries: ["/products/missing"],
      })}
    />,
  );
  expect(
    screen.getByRole("heading", { name: "Product not found" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Browse products" })).toHaveAttribute(
    "href",
    "/products",
  );
});

test("unknown routes render the route error page", async () => {
  render(
    <RouterProvider
      router={createMemoryRouter(routes, { initialEntries: ["/missing"] })}
    />,
  );
  expect(
    await screen.findByRole("heading", { name: "Page not found" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
    "href",
    "/",
  );
});

test("error navigation and recovery retain focus management, including history navigation", async () => {
  const router = createMemoryRouter(routes, { initialEntries: ["/products"] });
  render(<RouterProvider router={router} />);
  screen.getByRole("searchbox").focus();
  await act(async () => {
    await router.navigate("/missing");
  });
  expect(
    await screen.findByRole("heading", { name: "Page not found" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("main")).toHaveFocus();
  await userEvent
    .setup()
    .click(screen.getByRole("link", { name: "Return to home" }));
  expect(
    await screen.findByRole("heading", { name: "Welcome" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("main")).toHaveFocus();
  await act(async () => {
    await router.navigate(-1);
  });
  expect(
    await screen.findByRole("heading", { name: "Page not found" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("main")).toHaveFocus();
});
