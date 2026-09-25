import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    ...devices["Desktop Chrome"],
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "browser", use: { baseURL: "http://127.0.0.1:4173" } },
    { name: "pages", use: { baseURL: "http://127.0.0.1:4174" } },
  ],
  webServer: [
    {
      command:
        "npx vite build --outDir dist-e2e/browser && npx vite preview --outDir dist-e2e/browser --host 127.0.0.1 --port 4173 --strictPort",
      url: "http://127.0.0.1:4173",
      reuseExistingServer: false,
      timeout: 120_000,
    },
    {
      command:
        "npx vite build --outDir dist-e2e/pages && npx vite preview --outDir dist-e2e/pages --host 127.0.0.1 --port 4174 --strictPort",
      env: { VITE_BASE_PATH: "/react-ts-blog/", VITE_ROUTER_MODE: "hash" },
      url: "http://127.0.0.1:4174/react-ts-blog/",
      reuseExistingServer: false,
      timeout: 120_000,
    },
  ],
});
