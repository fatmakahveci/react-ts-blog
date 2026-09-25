import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { afterEach, expect, test, vi } from "vitest";
import { routes } from "../App";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
function openPage(path = "/products") {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
  return { router, user: userEvent.setup() };
}
const results = () =>
  within(screen.getByRole("list", { name: "Product results" }));

test("category and price filters combine, survive reload, and reset without removing unrelated parameters", async () => {
  const { router, user } = openPage("/products?source=demo");
  await user.selectOptions(screen.getByLabelText("Category"), "Electronics");
  expect(
    results().queryByRole("link", { name: "Product 1" }),
  ).not.toBeInTheDocument();
  await user.type(screen.getByLabelText("Maximum price (USD)"), "50");
  expect(screen.getByText(/No products match/)).toBeInTheDocument();
  const url = `${router.state.location.pathname}${router.state.location.search}`;
  cleanup();
  const reopened = openPage(url);
  expect(screen.getByLabelText("Category")).toHaveValue("Electronics");
  expect(screen.getByLabelText("Maximum price (USD)")).toHaveValue(50);
  await reopened.user.click(
    screen.getByRole("button", { name: "Reset filters" }),
  );
  expect(reopened.router.state.location.search).toBe("?source=demo");
  expect(screen.getByRole("searchbox")).toHaveFocus();
  expect(screen.getByRole("status")).toHaveTextContent("2 products found");
});

test("price sorting works in both directions and falls back for unknown URL values", async () => {
  const { user } = openPage("/products?category=bad&sort=bad&max=NaN");
  expect(screen.getByRole("status")).toHaveTextContent("2 products found");
  await user.selectOptions(screen.getByLabelText("Sort by"), "price-desc");
  expect(
    results()
      .getAllByRole("link")
      .map((link) => link.textContent),
  ).toEqual(["Product 2", "Product 1"]);
  await user.selectOptions(screen.getByLabelText("Sort by"), "price-asc");
  expect(results().getAllByRole("link")[0]).toHaveTextContent("Product 1");
  await user.type(screen.getByLabelText("Maximum price (USD)"), "0");
  expect(screen.getByRole("status")).toHaveTextContent("0 products found");
});

test("favorites persist across remounts and can be removed from the favorites view", async () => {
  const { user } = openPage();
  await user.click(screen.getByRole("button", { name: "Favorite Product 1" }));
  expect(
    screen.getByRole("button", { name: "Favorite Product 1" }),
  ).toHaveAttribute("aria-pressed", "true");
  cleanup();
  const reopened = openPage();
  await reopened.user.click(screen.getByLabelText("Favorites only"));
  expect(screen.getByRole("status")).toHaveTextContent("1 product found");
  await reopened.user.click(
    screen.getByRole("button", { name: "Favorite Product 1" }),
  );
  expect(screen.getByRole("status")).toHaveTextContent("0 products found");
  await reopened.user.click(screen.getByLabelText("Favorites only"));
  expect(screen.getByRole("status")).toHaveTextContent("2 products found");
});

test("view and theme choices persist and can be switched back", async () => {
  const { user } = openPage();
  await user.click(screen.getByRole("button", { name: "List" }));
  await user.click(screen.getByRole("button", { name: "Light theme" }));
  expect(document.documentElement).toHaveAttribute("data-theme", "light");
  cleanup();
  const reopened = openPage();
  expect(screen.getByRole("list", { name: "Product results" })).toHaveClass(
    "list",
  );
  expect(screen.getByRole("button", { name: "Light theme" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await reopened.user.click(screen.getByRole("button", { name: "Grid" }));
  await reopened.user.click(
    screen.getByRole("button", { name: "Light theme" }),
  );
  expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  expect(screen.getByRole("list", { name: "Product results" })).toHaveClass(
    "grid",
  );
});

test("recent items are deduplicated, newest first, and favorites sync from details", async () => {
  const { user } = openPage("/products/1?q=Product");
  await user.click(screen.getByRole("button", { name: "Favorite Product 1" }));
  await user.click(screen.getByRole("button", { name: "Favorite Product 1" }));
  await user.click(screen.getByRole("button", { name: "Favorite Product 1" }));
  await user.click(screen.getByRole("link", { name: "Back" }));
  expect(
    screen.getByRole("button", { name: "Favorite Product 1" }),
  ).toHaveAttribute("aria-pressed", "true");
  await user.click(results().getByRole("link", { name: "Product 2" }));
  await user.click(screen.getByRole("link", { name: "Back" }));
  await user.click(results().getByRole("link", { name: "Product 1" }));
  await user.click(screen.getByRole("link", { name: "Back" }));
  expect(
    within(screen.getByRole("complementary", { name: "Recently viewed" }))
      .getAllByRole("link")
      .map((link) => link.textContent),
  ).toEqual(["Product 1", "Product 2"]);
});

test("copy link excludes filters and offers a manual fallback when denied", async () => {
  const { user } = openPage("/products/1?q=private");
  const clipboard = vi
    .spyOn(navigator.clipboard, "writeText")
    .mockResolvedValue(undefined);
  await user.click(screen.getByRole("button", { name: "Copy product link" }));
  expect(clipboard).toHaveBeenCalledWith(
    `${window.location.origin}/products/1`,
  );
  expect(screen.getByRole("status")).toHaveTextContent("Link copied.");
  clipboard.mockRejectedValue(new Error("Denied"));
  await user.click(screen.getByRole("button", { name: "Copy product link" }));
  const input = screen.getByLabelText("Product link") as HTMLInputElement;
  await user.click(input);
  expect(input.selectionEnd).toBe(input.value.length);
  expect(screen.getByRole("status")).toHaveTextContent("Copy is unavailable");
});

test("slash focuses search but does not intercept typing or modified shortcuts", async () => {
  const { user } = openPage();
  await user.keyboard("/");
  expect(screen.getByRole("searchbox")).toHaveFocus();
  expect(screen.getByRole("searchbox")).toHaveValue("");
  await user.keyboard("/");
  expect(screen.getByRole("searchbox")).toHaveValue("/");
  await user.click(screen.getByRole("button", { name: "Clear search" }));
  expect(screen.getByRole("searchbox")).toHaveFocus();
  screen.getByLabelText("Category").focus();
  await user.keyboard("{Control>}/{/Control}");
  expect(screen.getByLabelText("Category")).toHaveFocus();
});

test("missing products keep filter state in their recovery link", () => {
  openPage("/products/missing?category=Electronics&max=80");
  expect(screen.getByRole("link", { name: "Browse products" })).toHaveAttribute(
    "href",
    "/products?category=Electronics&max=80",
  );
});
