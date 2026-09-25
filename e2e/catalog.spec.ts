import { expect, test } from "@playwright/test";

const route = (path: string, project: string) =>
  project === "pages" ? `/react-ts-blog/#${path}` : path;

test("filters, favorites, and theme survive navigation and reload", async ({
  page,
}, info) => {
  await page.goto(route("/products", info.project.name));
  await page.getByRole("searchbox").fill("Product 2");
  await expect(page.getByRole("status")).toHaveText("1 product found");
  await page
    .getByRole("button", { name: "Favorite Product 2", exact: true })
    .click();
  await page.getByRole("button", { name: "Light theme" }).click();
  await page
    .getByRole("list", { name: "Product results" })
    .getByRole("link", { name: "Product 2" })
    .click();
  await expect(page.getByRole("main")).toBeFocused();
  await page.getByRole("link", { name: "Back", exact: true }).click();
  await expect(page.getByRole("searchbox")).toHaveValue("Product 2");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Favorite Product 2" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.getByRole("status")).toHaveText("2 products found");
});

test("error recovery and history navigation focus the main content", async ({
  page,
}, info) => {
  await page.goto(route("/missing", info.project.name));
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Return to home" }).click();
  await expect(page.getByRole("heading", { name: "Welcome" })).toBeVisible();
  await expect(page.getByRole("main")).toBeFocused();
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
  await expect(page.getByRole("main")).toBeFocused();
});

test("direct product links refresh and copy the correct deployment URL", async ({
  page,
  context,
  baseURL,
}, info) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(route("/products/1?q=Product", info.project.name));
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Product Details" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Copy product link" }).click();
  await expect(page.getByRole("status")).toHaveText("Link copied.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    `${baseURL}${route("/products/1", info.project.name)}`,
  );
});

test("skip control preserves the route and mobile layouts do not overflow", async ({
  page,
}, info) => {
  await page.goto(route("/products", info.project.name));
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Skip to content" }),
  ).toBeFocused();
  const url = page.url();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  expect(page.url()).toBe(url);
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 900 });
    for (const view of ["Grid", "List"]) {
      await page.getByRole("button", { name: view, exact: true }).click();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
});
