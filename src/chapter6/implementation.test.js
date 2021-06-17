import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'

const CurrentComponent = { hooks: {} }

function getHook(id) {
  const c = CurrentComponent
  if (c.hooks[id] === undefined) 
    c.hooks[id] = {}
  return c.hooks[id]
}

function useMemo(fn, deps) {
  const c = CurrentComponent
  const h = getHook(c.hookId++)
  if (isChanged(h.deps, deps)) {			   	    // ➊ 
    h.value = fn()                            // ➋ 
    h.deps = deps
  }
  return h.value                              // ➌ 
}

function isChanged(deps, nextDeps) {
  return (
    !deps ||								                 // ➍
    deps.length !== nextDeps.length ||       // ➎
    nextDeps.some((v, i) => v !== deps[i])   // ➏
  )
}

function beforeRender() {
  CurrentComponent.hookId = 0 
}

describe('Use Memo', () => {
  test('implementation', async () => {
    const Title = ({ num, log, r }) => {
      const count = useMemo(() => {
        log(num)
        return num
      }, [num])

      r(count)
      return <div>{count}</div>
    }    
    
    const log = jest.fn(), r = jest.fn()
  
    // num 0
    beforeRender()
    const { rerender } = render(<Title num={0} log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(1))
    expect(r).toHaveBeenLastCalledWith(0)
    expect(log).toHaveReturnedTimes(1)
    expect(log).toHaveBeenLastCalledWith(0)
    
    // num 1
    beforeRender()
    rerender(<Title num={1} log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(2))
    expect(r).toHaveBeenLastCalledWith(1)
    expect(log).toHaveReturnedTimes(2)
    expect(log).toHaveBeenLastCalledWith(1)
    
    // num 1 again
    beforeRender()
    rerender(<Title num={1} log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(3))
    expect(r).toHaveBeenLastCalledWith(1)
    expect(log).toHaveReturnedTimes(2)
    
    // num 2
    beforeRender()
    rerender(<Title num={2} log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(4))
    expect(r).toHaveBeenLastCalledWith(2)
    expect(log).toHaveReturnedTimes(3)
    expect(log).toHaveBeenLastCalledWith(2)
    
    // num 2 again
    beforeRender()
    rerender(<Title num={2} log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(5))
    expect(r).toHaveBeenLastCalledWith(2)
    expect(log).toHaveReturnedTimes(3)
    
  })
 
})
