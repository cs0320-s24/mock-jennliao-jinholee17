import { expect, test } from "@playwright/test";

/**
 * Connects to server before each test
 */
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

test("mode called with too many arguments prints failure message", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode random");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Incorrect number of arguments")).toBeVisible();
});

/** testing that calling mode prints proper message */
test("mode prints message to user on mode", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Verbose mode was changed to verbose")
  ).toBeVisible();

  // change to brief
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Verbose mode was changed to brief")
  ).toBeVisible();

  // back to verbose
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Verbose mode was changed to verbose").nth(1) //check this index
  ).toBeVisible();
});

/** tests brief and verbose modes on load */
test("verbose and brief called on successful load", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/met-gala.csv true");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("load data/met-gala.csv true")).toBeHidden();

  // switch to verbose
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/met-gala.csv true");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("load data/met-gala.csv true")).toBeVisible();
});

test("verbose and brief called on unsuccessful load", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load fail");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("load fail undefined")).toBeHidden();

  // switch to verbose
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load fail");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("load fail undefined")).toBeVisible();
});

/** tests brief and verbose modes on view */
test("verbose and brief called on successful view", async ({ page }) => {
  await page.getByLabel("Login").click();
  // loading file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/met-gala.csv true");
  await page.getByLabel("Submit").click();

  // viewing file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Kim")).toBeVisible();
  await expect(page.getByText("Kardashian")).toBeVisible();
  await expect(page.getByText("Balenciaga")).toBeVisible();
  await expect(page.getByText("view")).toBeHidden();

  // switch to verbose
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();

  // view file again
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Kim").nth(1)).toBeVisible();
  await expect(page.getByText("Kardashian").nth(1)).toBeVisible();
  await expect(page.getByText("Balenciaga").nth(1)).toBeVisible();
  await expect(page.getByText("view")).toBeVisible();
});

test("verbose and brief called on an unsuccessful view", async ({ page }) => {
  await page.getByLabel("Login").click();
  // viewing file without load
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("view")).toBeHidden();

  // switch to verbose
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();

  // view file again
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("view")).toBeVisible();
});

/** tests brief and verbose modes on search */
test("verbose and brief called on successful search", async ({ page }) => {
  await page.getByLabel("Login").click();
  // loading file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load data/met-gala.csv true");
  await page.getByLabel("Submit").click();

  // searching
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill('search designer "Saint Laurent"');
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Alejandro")).toBeVisible();
  await expect(page.getByText("Jackson")).toBeVisible();
  await expect(page.getByText("Saint Laurent")).toBeVisible();
  await expect(page.getByText('search designer "Saint Laurent"')).toBeHidden();

  // switch to verbose
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();

  // search again
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill('search designer "Saint Laurent"');
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Alejandro").nth(1)).toBeVisible();
  await expect(page.getByText("Jackson").nth(1)).toBeVisible();
  await expect(page.getByText("Saint Laurent").nth(1)).toBeVisible();
  await expect(page.getByText('search designer "Saint Laurent"')).toBeVisible();
});

test("verbose and brief called on an unsuccessful search", async ({ page }) => {
  await page.getByLabel("Login").click();

  // searching
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill('search designer "Saint Laurent"');
  await page.getByLabel("Submit").click();
  await expect(page.getByText("No data loaded")).toBeVisible();
  await expect(page.getByText('search designer "Saint Laurent"')).toBeHidden();

  // switch to verbose
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();

  // search again
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill('search designer "Saint Laurent"');
  await page.getByLabel("Submit").click();
  await expect(page.getByText('search designer "Saint Laurent"')).toBeVisible();
  await expect(page.getByText("No data loaded").nth(1)).toBeVisible();
});
