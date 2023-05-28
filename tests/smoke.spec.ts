import { test } from "@playwright/test";

test("User performs full flow", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Log in" }).click();

  await page.getByPlaceholder("Johnny").click();

  await page.getByPlaceholder("Johnny").fill("test001");

  await page.getByPlaceholder("Your password").click();

  await page.getByPlaceholder("Your password").fill("123456789");

  await page.getByRole("button", { name: "Login" }).click();

  await page.getByRole("link", { name: "Create post" }).click();

  await page.getByPlaceholder("Pick all that you like").click();

  await page.getByRole("option", { name: "ExerciseEveryday" }).click();

  await page.getByRole("option", { name: "HomeWorkout" }).click();

  await page.getByRole("searchbox", { name: "Select tags" }).press("Escape");

  await page.getByPlaceholder("Enter post title").click();

  await page
    .getByPlaceholder("Enter post title")
    .fill("How to start working out");

  await page.getByPlaceholder("Enter post content").click();

  await page
    .getByPlaceholder("Enter post content")
    .fill("Start by building a habit");

  await page.getByRole("button", { name: "Create Post" }).click();

  await page
    .getByRole("link", {
      name: "ExerciseEveryday HomeWorkout How to start working out test001 0 people liked this",
    })
    .getByRole("button")
    .click();

  await page
    .getByRole("link", {
      name: "ExerciseEveryday HomeWorkout How to start working out test001 1 people liked this",
    })
    .click();

  await page.getByPlaceholder("Your comment").click();

  await page.getByPlaceholder("Your comment").fill("Great advice!");

  await page.getByRole("button", { name: "Add comment" }).click();

  await page.getByText("Great advice!").click();

  await page.getByRole("link", { name: "All posts" }).click();

  await page
    .getByRole("link", {
      name: "ExerciseEveryday HomeWorkout How to start working out test001 1 people liked this",
    })
    .getByRole("link", { name: "test001" })
    .click();

  await page.getByText("test001").click();
});
