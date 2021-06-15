import React, { useState } from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'

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
 
})
