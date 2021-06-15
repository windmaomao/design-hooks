import React, { useState, useEffect } from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'

describe('Use Effect', () => {
  test('state and effect', async () => {
    const Title = ({ text, log, r }) => {
      const [count, setCount] = useState(0)
      useEffect(() => {
        setCount(0)
      }, [text])
      const onClick = () => { setCount(count + 1) }

      r(count)
      return <button role="text" onClick={onClick} />
    }    
    
    const log = jest.fn(), r = jest.fn()
    const _t = () => screen.getByRole('text')

    render(<Title text="a" log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(1))
    expect(r).toHaveBeenLastCalledWith(0)
    
    // first click
    fireEvent.click(_t())
    await waitFor(() => expect(r).toHaveReturnedTimes(2))
    expect(r).toHaveBeenLastCalledWith(1)

    // // second key stroke
    // fireEvent.change(_t(), { target: { value: "He" } })
    // await waitFor(_t)
    // expect(r).toHaveReturnedTimes(3)
    // expect(_t()).toHaveValue("He")
  })
 
})
