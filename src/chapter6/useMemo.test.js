import React, { useState, useMemo } from 'react'
import {render, screen, fireEvent, waitFor, act} from '@testing-library/react'
import debounce from '../hooks/lodash/debounce'

const fn = jest.fn()
describe('Use Memo', () => {
  test('type and search without useMemo', async () => {
    const Title = ({ log, r }) => {
      const [text, setText] = React.useState('')
      const [search, setSearch] = React.useState('')
      const handleType = e => { setText(e.target.value) }
      const handleSearch = () => { setSearch(text) }

      log()
      const matched = fn()
      r()
      return (
        <>
          <input role="text" value={text} onChange={handleType} />
          <button role="search" onClick={handleSearch}>Search</button>
          {matched}          
        </>
      )
    }    
    
    const log = jest.fn(), r = jest.fn()
    const _t = () => screen.getByRole('text')
    const _s = () => screen.getByRole('search')

    render(<Title log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(1))
    expect(log).toHaveReturnedTimes(1)
    
    // first typing session
    fireEvent.change(_t(), { target: { value: "k" } })
    fireEvent.change(_t(), { target: { value: "kk" } })
    fireEvent.change(_t(), { target: { value: "kkk" } })
    fireEvent.change(_t(), { target: { value: "kkkk" } })
    await waitFor(() => expect(r).toHaveReturnedTimes(5))
    expect(log).toHaveReturnedTimes(5)

    // first search click
    fireEvent.click(_s())
    await waitFor(() => expect(r).toHaveReturnedTimes(6))
    expect(log).toHaveReturnedTimes(6)

    // second typing session
    fireEvent.change(_t(), { target: { value: "k" } })
    fireEvent.change(_t(), { target: { value: "kk" } })
    await waitFor(() => expect(r).toHaveReturnedTimes(8))
    expect(log).toHaveReturnedTimes(8)
    
    // second search click
    fireEvent.click(_s())
    await waitFor(() => expect(r).toHaveReturnedTimes(9))
    expect(log).toHaveReturnedTimes(9)
  })

  test('type and search with useMemo', async () => {
    const Title = ({ log, r }) => {
      const [text, setText] = React.useState('')
      const [search, setSearch] = React.useState('')
      const handleType = e => { setText(e.target.value) }
      const handleSearch = () => { setSearch(text) }

      const matched = useMemo(() => {
        log()
        return fn()
      }, [search])

      r()
      return (
        <>
          <input role="text" value={text} onChange={handleType} />
          <button role="search" onClick={handleSearch}>Search</button>
          {matched}          
        </>
      )
    }    
    
    const log = jest.fn(), r = jest.fn()
    const _t = () => screen.getByRole('text')
    const _s = () => screen.getByRole('search')

    render(<Title log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(1))
    expect(log).toHaveReturnedTimes(1)
    
    // first typing session
    fireEvent.change(_t(), { target: { value: "k" } })
    fireEvent.change(_t(), { target: { value: "kk" } })
    fireEvent.change(_t(), { target: { value: "kkk" } })
    fireEvent.change(_t(), { target: { value: "kkkk" } })
    await waitFor(() => expect(r).toHaveReturnedTimes(5))
    expect(log).toHaveReturnedTimes(1)

    // first search click
    fireEvent.click(_s())
    await waitFor(() => expect(r).toHaveReturnedTimes(6))
    expect(log).toHaveReturnedTimes(2)

    // second typing session
    fireEvent.change(_t(), { target: { value: "k" } })
    fireEvent.change(_t(), { target: { value: "kk" } })
    await waitFor(() => expect(r).toHaveReturnedTimes(8))
    expect(log).toHaveReturnedTimes(2)
    
    // second search click
    fireEvent.click(_s())
    await waitFor(() => expect(r).toHaveReturnedTimes(9))
    expect(log).toHaveReturnedTimes(3)
  })

  test('debounce keyup without useMemo', async () => {
    const Title = ({ log, r }) => {
      const [text, setText] = React.useState('')
      const [matched, setMatched] = useState([])

      const handleType = e => { 
        const search = e.target.value
        setText(search)
        log()
        setMatched(fn(search))
      }

      r()
      return (
        <>
          <input role="text" value={text} onChange={handleType} />
          {matched}          
        </>
      )
    }    
    
    const log = jest.fn(), r = jest.fn()
    const _t = () => screen.getByRole('text')

    render(<Title log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(1))
    expect(log).toHaveReturnedTimes(0)
    
    // first typing session
    fireEvent.change(_t(), { target: { value: "k" } })
    fireEvent.change(_t(), { target: { value: "kk" } })
    fireEvent.change(_t(), { target: { value: "kkk" } })
    fireEvent.change(_t(), { target: { value: "kkkk" } })
    await waitFor(() => expect(r).toHaveReturnedTimes(5))
    expect(log).toHaveReturnedTimes(4)

    // second typing session
    fireEvent.change(_t(), { target: { value: "k" } })
    fireEvent.change(_t(), { target: { value: "kk" } })
    await waitFor(() => expect(r).toHaveReturnedTimes(7))
    expect(log).toHaveReturnedTimes(6)
  })

  test('debounce keyup with useMemo', async () => {
    const Title = ({ log, r }) => {
      const [text, setText] = React.useState('')
      const [matched, setMatched] = useState([])
      const setDebounceMatched = useMemo(() => {
        return debounce(search => {
          log()
          setMatched(fn(search))
        }, 500)
      }, [setMatched])

      const handleType = e => { 
        const search = e.target.value
        setText(search)
        setDebounceMatched(search)
      }

      r()
      return (
        <>
          <input role="text" value={text} onChange={handleType} />
          {matched}          
        </>
      )
    }    
    
    jest.useFakeTimers('legacy')
    const log = jest.fn(), r = jest.fn()
    const _t = () => screen.getByRole('text')

    render(<Title log={log} r={r} />)
    await waitFor(() => expect(r).toHaveReturnedTimes(1))
    expect(log).toHaveReturnedTimes(0)
    
    // first typing session
    fireEvent.change(_t(), { target: { value: "k" } })
    fireEvent.change(_t(), { target: { value: "kk" } })
    fireEvent.change(_t(), { target: { value: "kkk" } })
    fireEvent.change(_t(), { target: { value: "kkkk" } })
    await waitFor(() => expect(r).toHaveReturnedTimes(5))
    expect(log).toHaveReturnedTimes(0)

    // wait for 500ms
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => expect(r).toHaveReturnedTimes(6))
    expect(log).toHaveReturnedTimes(1)

    // second typing session
    fireEvent.change(_t(), { target: { value: "k" } })
    fireEvent.change(_t(), { target: { value: "kk" } })
    await waitFor(() => expect(r).toHaveReturnedTimes(8))
    expect(log).toHaveReturnedTimes(1)

    // wait for 500ms
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => expect(r).toHaveReturnedTimes(9))
    expect(log).toHaveReturnedTimes(2)
  })
})
