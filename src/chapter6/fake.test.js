import React, { useState, useEffect } from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'

describe('Use Memo', () => {
  test('fake with state and effect', async () => {
    const Title = ({ num, log, r }) => {
      const [count, setCount] = useState(num)
      useEffect(() => {
        log(num)
        setCount(num)
      }, [num])

      r(count)
      return <div>{count}</div>
    }    
    
    const log = jest.fn(), r = jest.fn()

    // num 0
    const { rerender } = render(<Title num={0} log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(1))
    expect(r).toHaveBeenLastCalledWith(0)
    expect(log).toHaveReturnedTimes(1)
    expect(log).toHaveBeenLastCalledWith(0)
    
    // num 1
    rerender(<Title num={1} log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(3))
    expect(r).toHaveBeenLastCalledWith(1)
    expect(log).toHaveReturnedTimes(2)
    expect(log).toHaveBeenLastCalledWith(1)

    // num 1 again
    rerender(<Title num={1} log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(4))
    expect(r).toHaveBeenLastCalledWith(1)
    expect(log).toHaveReturnedTimes(2)

    // num 2
    rerender(<Title num={2} log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(6))
    expect(r).toHaveBeenLastCalledWith(2)
    expect(log).toHaveReturnedTimes(3)
    expect(log).toHaveBeenLastCalledWith(2)

    // num 2 again
    rerender(<Title num={2} log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(7))
    expect(r).toHaveBeenLastCalledWith(2)
    expect(log).toHaveReturnedTimes(3)

  })

  test('fake with direct assignment', async () => {
    const Title = ({ num, log, r }) => {
      log(num)
      const count = num

      r(count)
      return <div>{count}</div>
    }    
    
    const log = jest.fn(), r = jest.fn()

    // num 0
    const { rerender } = render(<Title num={0} log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(1))
    expect(r).toHaveBeenLastCalledWith(0)
    expect(log).toHaveReturnedTimes(1)
    expect(log).toHaveBeenLastCalledWith(0)
    
    // num 1
    rerender(<Title num={1} log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(2))
    expect(r).toHaveBeenLastCalledWith(1)
    expect(log).toHaveReturnedTimes(2)
    expect(log).toHaveBeenLastCalledWith(1)

    // num 1 again
    rerender(<Title num={1} log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(3))
    expect(r).toHaveBeenLastCalledWith(1)
    expect(log).toHaveReturnedTimes(3)
    expect(log).toHaveBeenLastCalledWith(1)

    // num 2
    rerender(<Title num={2} log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(4))
    expect(r).toHaveBeenLastCalledWith(2)
    expect(log).toHaveReturnedTimes(4)
    expect(log).toHaveBeenLastCalledWith(2)

    // num 2 again
    rerender(<Title num={2} log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(5))
    expect(r).toHaveBeenLastCalledWith(2)
    expect(log).toHaveReturnedTimes(5)
    expect(log).toHaveBeenLastCalledWith(2)

  })
 
})
