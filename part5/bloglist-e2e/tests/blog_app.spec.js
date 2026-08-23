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

    test('blogs are ordered according to likes with most likes first', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.locator('form input').nth(0).fill('Blog First')
      await page.locator('form input').nth(1).fill('Author 1')
      await page.locator('form input').nth(2).fill('http://blog1.com')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByRole('button', { name: 'new blog' }).click()
      await page.locator('form input').nth(0).fill('Blog Second')
      await page.locator('form input').nth(1).fill('Author 2')
      await page.locator('form input').nth(2).fill('http://blog2.com')
      await page.getByRole('button', { name: 'create' }).click()

      const blogSecond = page.getByText('Blog Second Author 2')
      await blogSecond.getByRole('button', { name: 'view' }).click()
      await blogSecond.getByRole('button', { name: 'like' }).click()

      const blogDivs = page.locator('.blog')
      await expect(blogDivs.first()).toContainText('Blog Second')
    })
  })
})
