import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'

test('brutal button click does not print', async () => {
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
  await waitFor(() => screen.getByTestId('test'))
  expect(r).toHaveReturnedTimes(1)
  expect(log).toHaveBeenCalledWith(1)
  expect(screen.getByTestId('test'))
    .toHaveTextContent("Hello World+0")
})

test('button click with manaul render', async () => {
  let m = undefined
  function _get(initialValue) {
    if (m === undefined) m = initialValue
    return m
  }
  function _set(value) { m = value }

  const Title = ({ log, r }) => {
    let count = _get(0), setCount = _set
    const onClick = () => {
      setCount(count + 1)
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
  const {rerender} = render(<Title log={log} r={r} />)
  fireEvent.click(screen.getByText('Click'))
  rerender(<Title log={log} r={r} />)
  await waitFor(() => screen.getByTestId('test'))
  expect(r).toHaveReturnedTimes(2)
  expect(log).toHaveBeenCalledWith(0)
  expect(screen.getByTestId('test'))
    .toHaveTextContent("Hello World+1")
})


