import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

test('naive button click does not print', async () => {
  const Title = ({ log, r }) => {
    let count = 0
    const onClick = () => {
      count++
      log(count)
    }

    r()
    return (
      <>
        <button onClick={onClick}>Click</button>
        <h1 data-testid="test">Hello World+{count}</h1>
      </>
    )
  }
  
  const log = jest.fn(), r = jest.fn()
  render(<Title log={log} r={r} />)
  fireEvent.click(screen.getByText('Click'))
  fireEvent.click(screen.getByText('Click'))
  await waitFor(() => screen.getByTestId('test'))
  expect(log).toHaveBeenCalledWith(1)
  expect(screen.getByTestId('test'))
    .toHaveTextContent("Hello World+0")
  expect(r).toHaveReturnedTimes(1)
})



