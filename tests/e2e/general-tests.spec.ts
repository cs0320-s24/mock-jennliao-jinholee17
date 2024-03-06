import { expect, test } from "@playwright/test";

/**
 * Connects to server before each test
 */
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

test("If I enter no text, nothing breaks", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Submit").click();
  await page.getByLabel("Submit").click();
  await page.getByLabel("Submit").click();
  await page.getByLabel("Submit").click();
  await page.getByLabel("Submit").click();
  await page.getByLabel("Submit").click();
  await page.getByLabel("Submit").click();
  await page.getByLabel("Submit").click();
  await page.getByLabel("Submit").click();
  await expect(page.getByText("No data loaded")).not.toBeVisible();
  await expect(page.getByText("File not found")).not.toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/presidents.csv true");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Successfully loaded!")).toBeVisible();

  await page.getByLabel("Submit").click();
  await page.getByLabel("Submit").click();
  await page.getByLabel("Submit").click();
  await page.getByLabel("Submit").click();
  await expect(page.getByText("No data loaded")).not.toBeVisible();
  await expect(page.getByText("File not found")).not.toBeVisible();
});

test("If I input an invalid command, it doesn't break", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("hello hi hello");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Invalid command")).toBeVisible();
  await page
    .getByLabel("Command input")
    .fill("wenfkihehrghbew AJWNDBEHBFWHJ hbdjabdw hjBWHJ");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Invalid command").last()).toBeVisible();
  await page.getByLabel("Command input").fill("jennifer and jinho are awesome");
  await expect(page.getByText("Invalid command").last()).toBeVisible();
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").fill(" ");
  await expect(page.getByText("Invalid command").last()).toBeVisible();
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").fill("          ");
  await expect(page.getByText("Invalid command").last()).toBeVisible();
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").fill("         hi");
  await expect(page.getByText("Invalid command").last()).toBeVisible();
  await page.getByLabel("Submit").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/presidents.csv true");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Successfully loaded!")).toBeVisible();
});

test("If I logout, it resets my history", async ({ page }) => {
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/met-gala.csv true");
  await page.getByLabel("Submit").click();

  await expect(page.getByText("Successfully loaded!")).toBeVisible();

  await page.getByLabel("Sign out").click();

  await expect(page.getByText("Successfully loaded!")).not.toBeVisible();
});

test("If I don't login, I can't see input box", async ({ page }) => {
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  await page.getByLabel("Login").click();

  await expect(page.getByLabel("Command input")).toBeVisible();
});
