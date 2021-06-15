import React, { useState } from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'

describe('Use State', () => {
  test('test drive', async () => {
    const Title = ({ log, r }) => {
      const [value, setValue] = useState("")
      const onChange = e => { 
        setValue(e.target.value) 
      }

      r()
      return <input role="text" value={value} onChange={onChange} />
    }    
    
    const log = jest.fn(), r = jest.fn()
    const _t = () => screen.getByRole('text')

    // first render
    const {rerender} = render(<Title log={log} r={r} />)
    await waitFor(_t)
    expect(r).toHaveReturnedTimes(1)
    expect(_t()).toHaveValue("")
    
    // second render
    fireEvent.change(_t(), { target: { value: "H" } })
    await waitFor(_t)
    expect(r).toHaveReturnedTimes(2)
    expect(_t()).toHaveValue("H")

    // third render
    fireEvent.change(_t(), { target: { value: "He" } })
    await waitFor(_t)
    expect(r).toHaveReturnedTimes(3)
    expect(_t()).toHaveValue("He")
  })
 
})
