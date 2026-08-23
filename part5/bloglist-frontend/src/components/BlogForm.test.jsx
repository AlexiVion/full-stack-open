import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect, vi } from 'vitest'
import BlogForm from './BlogForm'

test('<BlogForm /> calls onSubmit with right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  await user.type(inputs[0], 'Testing Title')
  await user.type(inputs[1], 'Testing Author')
  await user.type(inputs[2], 'Testing URL')
  await user.click(sendButton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Testing Title',
    author: 'Testing Author',
    url: 'Testing URL'
  })
})
