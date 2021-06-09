import React from 'react'
import { render, screen } from '@testing-library/react'

const Title = () => <div>Hello World</div>

test('Title has text Hello World', () => {
  render(<Title />)
  expect(screen.getByText("Hello World")).toBeInTheDocument()
})