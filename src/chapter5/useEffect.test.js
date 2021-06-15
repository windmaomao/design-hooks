import React, { useState, useEffect } from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'

describe('Use Effect', () => {
  test('state and effect', async () => {
    const Title = ({ text, log, r }) => {
      const [count, setCount] = useState(0)
      useEffect(() => {
        log()
        setCount(0)
      }, [text])
      const onClick = () => { setCount(count + 1) }

      r(count)
      return <button role="text" onClick={onClick} />
    }    
    
    const log = jest.fn(), r = jest.fn()
    const _t = () => screen.getByRole('text')

    // text "a"
    const { rerender } = render(<Title text="a" log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(1))
    expect(r).toHaveBeenLastCalledWith(0)
    expect(log).toHaveReturnedTimes(1)
    
    // first click
    fireEvent.click(_t())
    await waitFor(() => expect(r).toHaveReturnedTimes(2))
    expect(r).toHaveBeenLastCalledWith(1)
    expect(log).toHaveReturnedTimes(1)

    // second click
    fireEvent.click(_t())
    await waitFor(() => expect(r).toHaveReturnedTimes(3))
    expect(r).toHaveBeenLastCalledWith(2)
    expect(log).toHaveReturnedTimes(1)

    // text "b"
    rerender(<Title text="b" log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(5))
    expect(r).toHaveBeenLastCalledWith(0)
    expect(log).toHaveReturnedTimes(2)

  })
 
})
