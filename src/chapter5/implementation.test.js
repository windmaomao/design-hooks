import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'

const CurrentComponent = { hooks: {} }

function getHook(id) {
  const c = CurrentComponent
  if (c.hooks[id] === undefined) 
    c.hooks[id] = {}
  return c.hooks[id]
}

function useEffect(callback, deps) {
  const c = CurrentComponent
  const h = getHook(c.hookId++)
  if (isChanged(h.deps, deps)) {			   	    // ➊ 
    h.callback = callback
    h.deps = deps
    c.effects.push(h)							            // ➋
  }
  return                                      // ➌ 
}

function isChanged(deps, nextDeps) {
  return (
    !deps ||								                 // ➍
    deps.length !== nextDeps.length ||       // ➎
    nextDeps.some((v, i) => v !== deps[i])   // ➏
  )
}

function beforeRender() {
  CurrentComponent.effects = []
  CurrentComponent.hookId = 0 
}

function runEffects() {
  CurrentComponent.effects.forEach(h => {
    h.teardown = h.callback()
  })
}

describe('Use Effect', () => {
  test('implementation', async () => {
    const Title = ({ text, log, r }) => {
      useEffect(() => {
        log()
      }, [text])

      r()
      return <div data-testid="test">{text}</div>
    }    
    
    const log = jest.fn(), r = jest.fn()
    const _t = () => screen.getByRole('text')
    let text = "a"
  
    // text "a"
    beforeRender()
    const { rerender } = render(<Title text={text} log={log} r={r} />)
    runEffects()
    await waitFor(() => expect(r).toHaveReturnedTimes(1))
    expect(log).toHaveReturnedTimes(1)
    
    // text "a" 
    beforeRender()
    rerender(<Title text={text} log={log} r={r} />)
    runEffects()
    await waitFor(() => expect(r).toHaveReturnedTimes(2))
    expect(log).toHaveReturnedTimes(1)

    // text "b"
    text = "b"
    beforeRender()
    rerender(<Title text={text} log={log} r={r} />)
    runEffects()
    await waitFor(() => expect(r).toHaveReturnedTimes(3))
    expect(log).toHaveReturnedTimes(2)
  })
 
})
