import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
  test('should display pre-loaded tasks on page load', async ({ page }) => {
    await page.goto('http://localhost:4200');

    const firstTask = page.locator('ul li').first();
    await expect(firstTask).not.toHaveText('No tasks available.');
  });

  test('should add a task and verify it appears in the list', async ({ page }) => {
    await page.goto('http://localhost:4200');

    const taskName = 'New Task Here';
    await page.fill('input[placeholder="Enter task name"]', taskName);
    await page.getByRole('button', { name: 'Add Task' }).click();

    const taskLocator = page.locator(`text=${taskName}`).first();
    await expect(taskLocator).toBeVisible();
  });

  test('should mark a task as completed', async ({ page }) => {
    await page.goto('http://localhost:4200');

    const taskName = 'Task to Complete';
    await page.fill('input[placeholder="Enter task name"]', taskName);
    await page.getByRole('button', { name: 'Add Task' }).click();

    const taskItem = page.locator('li', { hasText: taskName }).first();
    await expect(taskItem).toBeVisible();

    const completeButton = taskItem.getByRole('button', { name: 'Complete' });
    await completeButton.click();
    await expect(completeButton).toBeDisabled();
  });

  test('should delete a task from the list', async ({ page }) => {
    await page.goto('http://localhost:4200');

    const taskName = 'Task to Delete';
    await page.fill('input[placeholder="Enter task name"]', taskName);
    await page.getByRole('button', { name: 'Add Task' }).click();

    const taskItem = page.locator('li', { hasText: taskName }).first();
    await expect(taskItem).toBeVisible();

    const deleteButton = taskItem.getByRole('button', { name: 'Delete' });
    await deleteButton.click();

    await expect(taskItem).not.toBeVisible();
  });
});
