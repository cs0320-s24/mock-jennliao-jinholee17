import { expect, test } from "@playwright/test";

/**
 * Connects to server before each test
 */
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

test("I can load a valid file, load an invalid file, and view will show first file", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/presidents.csv true");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/jennifer.csv true");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("File not found")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("first")).toBeVisible();
  await expect(page.getByText("1789")).toBeVisible();
  await expect(page.getByText("Ronald")).toBeVisible();
  await expect(page.getByText("1976")).toBeVisible();
});

test("I can load a valid file, search, load an invalid file, and search will show first file", async ({
  page,
}) => {
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

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/jennifer.csv true");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("File not found")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 Jinho");
  await page.getByLabel("Submit").click();
  await expect(
    page
      .getByLabel("repl-element")
      .getByText(/^\s*Jinho\s*$/i)
      .first()
  ).toBeVisible();
  await expect(
    page
      .getByLabel("repl-element")
      .getByText(/^\s*Jinho\s*$/i)
      .last()
  ).toBeVisible();
  await expect(
    page
      .getByLabel("repl-element")
      .getByText(/^\s*Lee\s*$/i)
      .first()
  ).toBeVisible();
  await expect(
    page
      .getByLabel("repl-element")
      .getByText(/^\s*Lee\s*$/i)
      .last()
  ).toBeVisible();
});

test("I can load a valid file without headers, view, load an valid file, view", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/presidents.csv false");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 Jinho");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("first")).not.toBeVisible();
  await expect(page.getByText("last")).not.toBeVisible();
  await expect(page.getByText("spouse")).not.toBeVisible();
  await expect(page.getByText("elected")).not.toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/presidents.csv true");
  await page.getByLabel("Submit").click();
  await expect(
    page
      .getByLabel("repl-element")
      .getByText(/^\s*Successfully loaded!\s*$/i)
      .last()
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("first")).toBeVisible();
  await expect(page.getByText("last")).toBeVisible();
  await expect(page.getByText("spouse")).toBeVisible();
  await expect(page.getByText("elected")).toBeVisible();
});

test("I can load a valid file, view, load another valid file, view", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/presidents.csv false");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();

  await expect(page.getByText("Jinho")).toBeVisible();
  await expect(page.getByText("Lee")).toBeVisible();
  await expect(page.getByText("Thomas Doeppner")).toBeVisible();
  await expect(page.getByText("2016")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/met-gala.csv true");
  await page.getByLabel("Submit").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Karlie")).toBeVisible();
  await expect(page.getByText("theme")).toBeVisible();
  await expect(page.getByText("Coleman")).toBeVisible();
  await expect(page.getByText("Vivienne Westwood")).toBeVisible();
});

test("I can load a valid file with headers, do a bad search, then do a good search", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/met-gala.csv true");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search era 1989");
  await page.getByLabel("Submit").click();

  await expect(page.getByText("No results found")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search theme Camp");
  await page.getByLabel("Submit").click();

  await expect(page.getByText("Karlie")).toBeVisible();
  await expect(page.getByText("Vivienne Westwood")).toBeVisible();
});

test("I can load a valid file, search, load another file, search", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/met-gala.csv true");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill('search designer "Saint Laurent"');
  await page.getByLabel("Submit").click();

  await expect(page.getByText("Alejandro")).toBeVisible();
  await expect(page.getByText("Jackson")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/presidents.csv false");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Successfully loaded!").last()).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 Jinho");
  await page.getByLabel("Submit").click();

  await expect(page.getByText("Thomas Doeppner")).toBeVisible();
  await expect(page.getByText("Lee")).toBeVisible();
});

test("Change mode, load, view, change mode, view", async ({ page }) => {
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/met-gala.csv true");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();

  await expect(page.getByText("view")).not.toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Verbose mode was changed to verbose")
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();

  await expect(page.getByText("view")).toBeVisible();
});

test("load, view, change mode, view", async ({ page }) => {
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/met-gala.csv true");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();

  await expect(page.getByText("view")).not.toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Verbose mode was changed to verbose")
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();

  await expect(page.getByText("view")).toBeVisible();
});

test("load, search, change mode, search", async ({ page }) => {
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/met-gala.csv true");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Successfully loaded!")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search theme Camp");
  await page.getByLabel("Submit").click();

  await expect(page.getByText("search theme Camp")).not.toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Verbose mode was changed to verbose")
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search theme Camp");
  await page.getByLabel("Submit").click();

  await expect(page.getByText("search theme Camp")).toBeVisible();
});

test("load, mode, load, mode", async ({ page }) => {
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/met-gala.csv true");
  await page.getByLabel("Submit").click();

  await expect(page.getByText("load data/met-gala.csv true")).not.toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Verbose mode was changed to verbose")
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/presidents.csv true");
  await page.getByLabel("Submit").click();

  await expect(page.getByText("load data/presidents.csv")).toBeVisible();
});
