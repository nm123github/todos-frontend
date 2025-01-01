import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
  test('should add a task and verify it appears in the list', async ({
    page,
  }) => {
    // Navigate to the app
    await page.goto('http://localhost:4200');

    // Add a new task
    const taskName = 'New Task Example';
    await page.fill('input[placeholder="Enter task name"]', taskName); // Adjust selector based on your app
    await page.click('button >> text=Add Task'); // Adjust text based on your app

    // Wait for the new task to appear in the list
    const taskLocator = page.locator(`text=${taskName}`);
    await expect(taskLocator).toBeVisible();
  });
});
