import React from 'react'
import { render, screen } from '@testing-library/react'

const App = () => {
  return (
    <div data-testid="test">
      Hello World
    </div>
  )
}

test('render', () => {
  const { getByTestId } = render(<App />)
  const div = getByTestId('test')
  expect(div.textContent).toBe("Hello World")
})