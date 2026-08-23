const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('root')
      await page.locator('input[name="Password"]').fill('secret')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('root')
      await page.locator('input[name="Password"]').fill('wrongpassword')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
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
  })
})
