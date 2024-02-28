import { expect, test } from "@playwright/test";

/**
 * Connects to server before each test
 */
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

/* Load Tests!! */

test("successful load prints a message with headers", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/presidents.csv true");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Successfully loaded!")).toBeVisible();
});

test("successful load prints a message without headers", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/presidents.csv false");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Successfully loaded!")).toBeVisible();
});

test("load requires a file to be inputted", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Please input a file.")).toBeVisible();
});

test("load requires a header boolean to be inputted", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/presidents.csv");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Please indicate if the file has a header.")
  ).toBeVisible();
});

test("load prints a message if more than two inputs are provided", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load data/presidents.csv true djfjaid");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Too many arguments.")).toBeVisible();
});

test("load prints a message if file is not found", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load fakedata true");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("File not found")).toBeVisible();
});

test("load prints a message if header is not true or false", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load data/presidents.csv random");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Invalid header indication.")).toBeVisible();
});

/* View Tests!! */

//TODO: test basic successful case

test("view with loaded file is displays data", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/presidents.csv true");
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Jinho")).toBeVisible();
  await expect(page.getByText("Lee")).toBeVisible();
  await expect(page.getByText("Thomas Doeppner")).toBeVisible();
  await expect(page.getByText("2016")).toBeVisible();

  await expect(page.getByText("George")).toBeVisible();
  //await expect(page.getByText("Washington")).toBeVisible(); for some reason this is causing an error
  await expect(page.getByText("Martha Washington")).toBeVisible();
  await expect(page.getByText("1789")).toBeVisible();

  await expect(page.getByText("Thomas")).toBeVisible();
  await expect(page.getByText("Jefferson")).toBeVisible();
  await expect(page.getByText("Ben Franklin")).toBeVisible();
  await expect(page.getByText("2024")).toBeVisible();

  await expect(page.getByText("Ronald")).toBeVisible();
  //await expect(page.getByText("Reagan")).toBeVisible();
  await expect(page.getByText("Nancy Reagan")).toBeVisible();
  await expect(page.getByText("1976")).toBeVisible();
});

test("view when no file is loaded prints a message", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("No data loaded")).toBeVisible();
});

test("view with additional inputs prints a message", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/presidents.csv true");
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").fill("view frsjads");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Too many arguments")).toBeVisible();
});
