const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.locator('input[name="Username"]').fill('root')
      await page.locator('input[name="Password"]').fill('secret')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('only creator sees the delete button for a blog', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.locator('form input').nth(0).fill('Creator Only Blog')
      await page.locator('form input').nth(1).fill('Creator Author')
      await page.locator('form input').nth(2).fill('http://creator.com')
      await page.getByRole('button', { name: 'create' }).click()

      const blog = page.getByText('Creator Only Blog Creator Author')
      await blog.getByRole('button', { name: 'view' }).click()

      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
    })
  })
})
