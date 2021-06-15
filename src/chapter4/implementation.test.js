import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'

const CurrentComponent = { hooks: {} }

function getHook(id) {
  const c = CurrentComponent
  if (c.hooks[id] === undefined) 
    c.hooks[id] = {}
  return c.hooks[id]
}

function _hook(initialValue) {
  const c = CurrentComponent
  const h = getHook(c.hookId++)
  if (!h.arr) h.arr = [
    initialValue,
    nextValue => {                           // 1
      const [currValue, _set] = h.arr
      if (nextValue !== currValue) {         // 2
        h.arr = [nextValue, _set]
      }
    }
  ]
  return h.arr     					                 // 4
}

describe('Use State Implementation', () => {
  beforeEach(() => {
    CurrentComponent.hooks = {}
  })
  test('test drive', async () => {
    const Title = ({ log, r }) => {
      const [value, setValue] = _hook("")
      const onChange = e => { 
        setValue(e.target.value) 
      }

      r()
      return <input role="text" value={value} onChange={onChange} />
    }    
    
    const log = jest.fn(), r = jest.fn()
    const _t = () => screen.getByRole('text')

    CurrentComponent.hookId = 0
    const {rerender} = render(<Title log={log} r={r} />)
    await waitFor(_t)
    expect(r).toHaveReturnedTimes(1)
    expect(_t()).toHaveValue("")
    
    // first key stroke
    fireEvent.change(_t(), { target: { value: "H" } })
    CurrentComponent.hookId = 0
    rerender(<Title log={log} r={r} />)
    await waitFor(_t)
    expect(r).toHaveReturnedTimes(2)
    expect(_t()).toHaveValue("H")

    // second key stroke
    fireEvent.change(_t(), { target: { value: "He" } })
    CurrentComponent.hookId = 0
    rerender(<Title log={log} r={r} />)
    await waitFor(_t)
    expect(r).toHaveReturnedTimes(3)
    expect(_t()).toHaveValue("He")
  })
 
})
