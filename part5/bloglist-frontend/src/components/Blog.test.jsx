import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect } from 'vitest'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: { name: 'Test User' }
  }

  test('renders title and author, but does not render url or likes by default', () => {
    render(<Blog blog={blog} />)

    expect(screen.getByText(/Component testing is done with react-testing-library/)).toBeDefined()
    expect(screen.getByText(/Test Author/)).toBeDefined()
    expect(screen.queryByText('http://testurl.com')).toBeNull()
    expect(screen.queryByText('likes 5')).toBeNull()
  })

  test('renders url and likes when view button is clicked', async () => {
    const user = userEvent.setup()
    render(<Blog blog={blog} />)

    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText('http://testurl.com')).toBeDefined()
    expect(screen.getByText('likes 5')).toBeDefined()
  })
})
