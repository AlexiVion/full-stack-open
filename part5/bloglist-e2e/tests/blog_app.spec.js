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

    test('user who created a blog can delete it', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.locator('form input').nth(0).fill('Blog to Delete')
      await page.locator('form input').nth(1).fill('Delete Author')
      await page.locator('form input').nth(2).fill('http://delete.com')
      await page.getByRole('button', { name: 'create' }).click()

      const blog = page.getByText('Blog to Delete Delete Author')
      await blog.getByRole('button', { name: 'view' }).click()

      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()

      await expect(page.getByText('Blog to Delete Delete Author')).not.toBeVisible()
    })
  })
})
