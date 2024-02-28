import { expect, test } from "@playwright/test";

/**
 * Connects to server before each test
 */
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

test("If no file is loaded, search returns correctly", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 Jinho");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("No data loaded")).toBeVisible();
});

test("I load a valid file, searched data doesn't exist", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/presidents.csv true");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 jennifer");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("No results found")).toBeVisible();
});

test("I load a valid file, I search valid data", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/presidents.csv true");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 Jinho");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Jinho")).toBeVisible();
  await expect(page.getByText("Lee")).toBeVisible();
  await expect(page.getByText("Thomas Doeppner")).toBeVisible();
  await expect(page.getByText("2016")).toBeVisible();
});

test("I load a valid file, I search with too many arguments", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/presidents.csv true");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 Jinho Jennifer");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Too many arguments")).toBeVisible();
});

test("I load a valid file, I search with not enough arguments", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/met-gala.csv true");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search theme");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Not enough arguments")).toBeVisible();
});

test("I load a valid file, I search with a column number w/ header, I search with a column string without header,", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/met-gala.csv true");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search theme Camp");
  await page.getByLabel("Submit").click();

  await page.keyboard.press("PageDown");
  // await expect(page.getByText("Tim")).toBeVisible();
  await expect(page.getByText("Nelson")).toBeVisible();
  await expect(page.getByText("Vivienne Westwood")).toBeVisible();
  await expect(page.getByText("Slay")).toBeVisible();
  await expect(page.getByText("Karlie")).toBeVisible();
  await expect(page.getByText("Kloss")).toBeVisible();
  await expect(page.getByText("Gucci")).toBeVisible();

  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/presidents.csv false");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 Jinho");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Jinho")).toBeVisible();
  await expect(page.getByText("Lee")).toBeVisible();
});
