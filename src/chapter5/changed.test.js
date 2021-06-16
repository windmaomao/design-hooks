import React, { useState, useEffect } from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'

describe('Use Effect', () => {
  test('wrong with setInterval', async () => {
    const Title = ({ log, r }) => {
      const [count, setCount] = useState(0)
      useEffect(() => {
        setTimeout(() => {
          console.log('called')
          log(count)
        }, 3000)
      }, [])
      const onClick = () => { setCount(count + 1) }

      r(count)
      return <button role="text" onClick={onClick} />
    }    
    
    jest.useFakeTimers('legacy')
    const log = jest.fn(), r = jest.fn()
    const _t = () => screen.getByRole('text')

    // text "a"
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
    await waitFor(() => {
      jest.advanceTimersByTime(3000)
      expect(log).toHaveReturnedTimes(1)
    })

    await waitFor(() => {
      jest.advanceTimersByTime(3000)
      expect(log).toHaveReturnedTimes(1)
    })
    

    // wait for 3 second
    // waitFor(() => {
    //   jest.runAllTimers()
    //   return expect(log).toHaveReturnedTimes(1)    
    // })
    // console.log('dd')

  })
 
})
