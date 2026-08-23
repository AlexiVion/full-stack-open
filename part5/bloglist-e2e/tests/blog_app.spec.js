const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.locator('input[name="Username"]').fill('root')
      await page.locator('input[name="Password"]').fill('secret')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.locator('form input').nth(0).fill('E2E Test Title')
      await page.locator('form input').nth(1).fill('E2E Test Author')
      await page.locator('form input').nth(2).fill('http://e2etest.com')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('E2E Test Title E2E Test Author')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.locator('form input').nth(0).fill('Blog to Like')
      await page.locator('form input').nth(1).fill('Like Author')
      await page.locator('form input').nth(2).fill('http://like.com')
      await page.getByRole('button', { name: 'create' }).click()

      const blog = page.getByText('Blog to Like Like Author')
      await blog.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('likes 1')).toBeVisible()
    })
  })
})
