import React, { useState } from 'react'
import {render, screen, fireEvent, waitFor, act} from '@testing-library/react'

describe('Use State', () => {
  test('when the state changed, part I', async () => {
    const Title = ({ log, r }) => {
      const [value, setValue] = useState(0)
      const onClick = () => {
        setValue(value + 1)
        log(value)
      }

      r(value)
      return <button role="text" onClick={onClick} />
    }    
    
    const log = jest.fn(), r = jest.fn()
    const _t = () => screen.getByRole('text')

    render(<Title log={log} r={r} />)
    await waitFor(_t)
    expect(r).toHaveReturnedTimes(1)
    
    // first click
    fireEvent.click(_t())
    await waitFor(_t)
    expect(r).toHaveReturnedTimes(2)
    expect(log).toHaveBeenLastCalledWith(0)
    expect(r).toHaveBeenLastCalledWith(1)

    // second click
    fireEvent.click(_t())
    await waitFor(_t)
    expect(r).toHaveReturnedTimes(3)
    expect(log).toHaveBeenLastCalledWith(1)
    expect(r).toHaveBeenLastCalledWith(2)
  })

  test('when the state changed, part II', async () => {
    const Title = ({ log, r }) => {
      const [value, setValue] = useState(0)
      const onClick = () => {
        setTimeout(() => {
          setValue(value + 1)
          log(value + 1)
        }, 3000)
      }

      r(value)
      return <button role="text" onClick={onClick} />
    }    
    
    jest.useFakeTimers('legacy')
    const log = jest.fn(), r = jest.fn()
    const _t = () => screen.getByRole('text')

    render(<Title log={log} r={r} />)
    await waitFor(_t)
    expect(r).toHaveReturnedTimes(1)
    
    // first click
    fireEvent.click(_t())
    await waitFor(_t)
    expect(r).toHaveReturnedTimes(1)
    expect(r).toHaveBeenLastCalledWith(0)

    // second click
    fireEvent.click(_t())
    await waitFor(_t)
    expect(r).toHaveReturnedTimes(1)
    expect(r).toHaveBeenLastCalledWith(0)

    // third click
    fireEvent.click(_t())
    await waitFor(_t)
    expect(r).toHaveReturnedTimes(1)
    expect(r).toHaveBeenLastCalledWith(0)

    // wait for the end
    waitFor(() => {
      jest.runAllTimers() 
      expect(r).toHaveReturnedTimes(4)
    })
    expect(log).toHaveBeenLastCalledWith(1)
  })  
 
  test('when the state changed, part II fix', async () => {
    const Title = ({ log, r }) => {
      const [value, setValue] = useState(0)
      const onClick = () => {
        setTimeout(() => {
          setValue(v => {
            log(v + 1)
            return v + 1
          })
        }, 3000)
      }

      r(value)
      return <button role="text" onClick={onClick} />
    }    
    
    jest.useFakeTimers('legacy')
    const log = jest.fn(), r = jest.fn()
    const _t = () => screen.getByRole('text')

    render(<Title log={log} r={r} />)
    await waitFor(_t)
    expect(r).toHaveReturnedTimes(1)
    
    // first click
    fireEvent.click(_t())
    await waitFor(_t)
    expect(r).toHaveReturnedTimes(1)
    expect(r).toHaveBeenLastCalledWith(0)

    // second click
    fireEvent.click(_t())
    await waitFor(_t)
    expect(r).toHaveReturnedTimes(1)
    expect(r).toHaveBeenLastCalledWith(0)

    // third click
    fireEvent.click(_t())
    await waitFor(_t)
    expect(r).toHaveReturnedTimes(1)
    expect(r).toHaveBeenLastCalledWith(0)

    // wait for the end
    waitFor(() => {
      jest.runAllTimers() 
      expect(r).toHaveReturnedTimes(4)
    })
    expect(log).toHaveBeenLastCalledWith(3)
  })  
})
