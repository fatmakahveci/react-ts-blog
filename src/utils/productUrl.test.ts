import { afterEach, expect, test, vi } from "vitest";
import { productUrl } from "./productUrl";

afterEach(() => vi.unstubAllEnvs());

test("Pages share links include the repository base and hash route", () => {
  vi.stubEnv("BASE_URL", "/react-ts-blog/");
  vi.stubEnv("VITE_ROUTER_MODE", "hash");
  expect(productUrl("1", "https://fatmakahveci.github.io")).toBe(
    "https://fatmakahveci.github.io/react-ts-blog/#/products/1",
  );
});

test("browser routing supports a custom base and safely encodes IDs", () => {
  vi.stubEnv("BASE_URL", "/catalog/");
  vi.stubEnv("VITE_ROUTER_MODE", "browser");
  expect(productUrl("item/1", "https://example.com")).toBe(
    "https://example.com/catalog/products/item%2F1",
  );
});
