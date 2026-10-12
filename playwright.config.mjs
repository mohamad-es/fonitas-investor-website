import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests", testMatch: "*.browser.mjs", workers: 1, retries: 0,
  use: { baseURL: "http://127.0.0.1:3000", trace: "retain-on-failure" },
  webServer: { command: "node scripts/serve-shop-tests.mjs", url: "http://127.0.0.1:3000", reuseExistingServer: false, timeout: 60000 },
});
