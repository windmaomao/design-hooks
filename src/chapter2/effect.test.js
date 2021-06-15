import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'

describe('Component Effect', () => {
  test('fetch api forming a loop', async () => {
    let m = undefined
    function _get(initialValue) {
      if (m === undefined) m = initialValue
      return m
    }
    function _set(value) { m = value }
    const apiReturnData = 1


    const Title = ({ log, r }) => {
      let count = _get(0), setCount = _set
      const fetchApi = () => {
        setCount(apiReturnData)
        log(_get())
      }

      fetchApi()
      r()
      return <h1 data-testid="test">Hello World+{count}</h1>
    }
    
    const log = jest.fn(), r = jest.fn()
    const _t = () => screen.getByTestId('test')
  
    // first render
    const {rerender} = render(<Title log={log} r={r} />)
    expect(log).toHaveReturnedTimes(1)
    expect(_t()).toHaveTextContent("Hello World+0")

    // second render
    rerender(<Title log={log} r={r} />)
    expect(log).toHaveReturnedTimes(2)
    expect(_t()).toHaveTextContent("Hello World+1")

    // third render
    rerender(<Title log={log} r={r} />)
    expect(log).toHaveReturnedTimes(3)
    // fourth render
    rerender(<Title log={log} r={r} />)
    expect(log).toHaveReturnedTimes(4)
  })

})
