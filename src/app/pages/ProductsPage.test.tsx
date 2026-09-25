import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { afterEach, expect, test } from "vitest";
import { routes } from "../App";

afterEach(cleanup);

function openPage(path = "/products") {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
  return { router, user: userEvent.setup() };
}

test("search is case insensitive, updates the URL, and can be cleared", async () => {
  const { router, user } = openPage();
  await user.type(screen.getByRole("searchbox"), "PRODUCT 2");
  expect(screen.getByRole("status")).toHaveTextContent("1 product found");
  expect(
    screen.queryByRole("link", { name: "Product 1" }),
  ).not.toBeInTheDocument();
  expect(new URLSearchParams(router.state.location.search).get("q")).toBe(
    "PRODUCT 2",
  );
  await user.click(screen.getByRole("button", { name: "Clear search" }));
  expect(screen.getByRole("status")).toHaveTextContent("2 products found");
  expect(router.state.location.search).toBe("");
});

test("empty results recover without losing unrelated URL parameters", async () => {
  const { router, user } = openPage("/products?q=missing&source=demo");
  expect(screen.getByText(/No products match/)).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Clear search" }));
  expect(router.state.location.search).toBe("?source=demo");
  expect(screen.getByRole("link", { name: "Product 1" })).toBeInTheDocument();
});

test("shared search survives detail navigation and focuses the destination", async () => {
  const { user } = openPage("/products?q=Product+2");
  expect(screen.getByRole("searchbox")).toHaveValue("Product 2");
  await user.click(screen.getByRole("link", { name: "Product 2" }));
  expect(
    await screen.findByRole("heading", { name: "Product Details" }),
  ).toBeInTheDocument();
  await waitFor(() => expect(screen.getByRole("main")).toHaveFocus());
  expect(document.title).toBe("Product Details | React Router Product Demo");
  await user.click(screen.getByRole("link", { name: "Back" }));
  expect(await screen.findByRole("searchbox")).toHaveValue("Product 2");
  expect(screen.getByRole("status")).toHaveTextContent("1 product found");
});

test("keyboard navigation exposes the skip link and named navigation", async () => {
  const { user } = openPage();
  await user.tab();
  expect(screen.getByRole("button", { name: "Skip to content" })).toHaveFocus();
  expect(
    screen.getByRole("button", { name: "Skip to content" }),
  ).toHaveAttribute("aria-controls", "main-content");
  await user.keyboard("{Enter}");
  expect(screen.getByRole("main")).toHaveFocus();
  expect(
    screen.getByRole("navigation", { name: "Main navigation" }),
  ).toBeInTheDocument();
});
