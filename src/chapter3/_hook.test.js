import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'

describe('Generic Hook', () => {
  test('with two states', async () => {
    const CurrentComponent = { hooks: {} }

    function getHook(id) {
      const c = CurrentComponent
      if (c.hooks[id] === undefined) 
        c.hooks[id] = {}
      return c.hooks[id]
    }

    function _hook(initialValue) {
      const c = CurrentComponent
      const h = getHook(c.hookId++)          // 1
      if (h.value === undefined) {           // 2
        h.value = initialValue
      }
      return h.value     										 // 3
    }

    const Title = ({ log, r }) => {
      let count = _hook(0)
      let count2 = _hook(1)

      r()
      return <h1 data-testid="test">Hello World+{count}+{count2}</h1>
    }
    
    const log = jest.fn(), r = jest.fn()
    const _t = () => screen.getByTestId('test')

    // first render
    CurrentComponent.hookId = 0
    const {rerender} = render(<Title log={log} r={r} />)
    await waitFor(() => screen.getByTestId('test'))
    expect(r).toHaveReturnedTimes(1)
    expect(_t()).toHaveTextContent("Hello World+0+1")

    // second render
    CurrentComponent.hookId = 0
    rerender(<Title log={log} r={r} />)
    await waitFor(() => screen.getByTestId('test'))
    expect(r).toHaveReturnedTimes(2)
    expect(_t()).toHaveTextContent("Hello World+0+1")

    // third render
    CurrentComponent.hookId = 0
    rerender(<Title log={log} r={r} />)
    await waitFor(() => screen.getByTestId('test'))
    expect(r).toHaveReturnedTimes(3)
    expect(_t()).toHaveTextContent("Hello World+0+1")
  })

})
