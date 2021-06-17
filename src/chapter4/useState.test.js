import React, { useState } from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'

describe('Use State', () => {
  test('test drive', async () => {
    let _set
    const Title = ({ log, r }) => {
      const [value, setValue] = useState("")
      const onChange = e => { 
        setValue(e.target.value) 
      }

      _set = setValue
      r()
      return <input role="text" value={value} onChange={onChange} />
    }    
    
    const log = jest.fn(), r = jest.fn()
    const _t = () => screen.getByRole('text')

    render(<Title log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(1))
    expect(_t()).toHaveValue("")
    const _oldset = _set
    
    // first key stroke
    fireEvent.change(_t(), { target: { value: "H" } })
    await waitFor(() => expect(r).toHaveReturnedTimes(2))
    expect(_t()).toHaveValue("H")

    // second key stroke
    fireEvent.change(_t(), { target: { value: "He" } })
    await waitFor(() => expect(r).toHaveReturnedTimes(3))
    expect(_t()).toHaveValue("He")

    // third key stroke
    fireEvent.change(_t(), { target: { value: "Hel" } })
    await waitFor(() => expect(r).toHaveReturnedTimes(4))
    expect(_t()).toHaveValue("Hel")
    expect(_set).toBe(_oldset)
  })
 
})
