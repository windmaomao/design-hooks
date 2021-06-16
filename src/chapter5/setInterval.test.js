import React, { useState, useEffect } from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'

describe('Use Effect', () => {
  test('wrong for setInterval', async () => {
    const Title = ({ log, r }) => {
      const [count, setCount] = useState(0)
      useEffect(() => {
        setInterval(() => {
          log(count)
        }, 1000)
      }, [])
      const onClick = () => { setCount(count + 1) }

      r(count)
      return <button role="text" onClick={onClick} />
    }    
    
    jest.useFakeTimers('legacy')
    const log = jest.fn(), r = jest.fn()
    const _t = () => screen.getByRole('text')

    const { rerender } = render(<Title log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(1))
    expect(r).toHaveBeenLastCalledWith(0)
    expect(log).toHaveReturnedTimes(0)

    // first click
    fireEvent.click(_t())
    await waitFor(() => expect(r).toHaveReturnedTimes(2))
    expect(r).toHaveBeenLastCalledWith(1)
    expect(log).toHaveReturnedTimes(0)

    // second click
    fireEvent.click(_t())
    await waitFor(() => expect(r).toHaveReturnedTimes(3))
    expect(r).toHaveBeenLastCalledWith(2)
    expect(log).toHaveReturnedTimes(0)

    // wait for 3 seconds
    jest.advanceTimersByTime(1000)
    await waitFor(() => expect(log).toHaveReturnedTimes(1))
    expect(log).toHaveBeenLastCalledWith(0)
    jest.advanceTimersByTime(1000)
    await waitFor(() => expect(log).toHaveReturnedTimes(2))
    expect(log).toHaveBeenLastCalledWith(0)
    jest.advanceTimersByTime(1000)
    await waitFor(() => expect(log).toHaveReturnedTimes(3))
    expect(log).toHaveBeenLastCalledWith(0)
  })
 
  test('fix for setInterval', async () => {
    const Title = ({ log, r }) => {
      const [count, setCount] = useState(0)
      useEffect(() => {
        const id = setInterval(() => {
          log(count)
        }, 1000)
        return () => {
          clearInterval(id)
        }
      }, [count])
      const onClick = () => { setCount(count + 1) }

      r(count)
      return <button role="text" onClick={onClick} />
    }    
    
    jest.useFakeTimers('legacy')
    const log = jest.fn(), r = jest.fn()
    const _t = () => screen.getByRole('text')

    const { rerender } = render(<Title log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(1))
    expect(r).toHaveBeenLastCalledWith(0)
    expect(log).toHaveReturnedTimes(0)

    // first click
    fireEvent.click(_t())
    await waitFor(() => expect(r).toHaveReturnedTimes(2))
    expect(r).toHaveBeenLastCalledWith(1)
    expect(log).toHaveReturnedTimes(0)

    // second click
    fireEvent.click(_t())
    await waitFor(() => expect(r).toHaveReturnedTimes(3))
    expect(r).toHaveBeenLastCalledWith(2)
    expect(log).toHaveReturnedTimes(0)

    // wait for 3 seconds
    jest.advanceTimersByTime(1000)
    await waitFor(() => expect(log).toHaveReturnedTimes(1))
    expect(log).toHaveBeenLastCalledWith(2)
    jest.advanceTimersByTime(1000)
    await waitFor(() => expect(log).toHaveReturnedTimes(2))
    expect(log).toHaveBeenLastCalledWith(2)
    jest.advanceTimersByTime(1000)
    await waitFor(() => expect(log).toHaveReturnedTimes(3))
    expect(log).toHaveBeenLastCalledWith(2)
  })
 
})
