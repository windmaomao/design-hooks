import { renderHook, act } from '@testing-library/react-hooks'
import useAsync from './useAsync'

const createUseAsync = props => {
  const { result } = renderHook(() => useAsync(props))
  return result
}

const immediate = true

describe('useAsync', () => {

  it('should init', () => {
    const res = createUseAsync()
    expect(res.current).toBeTruthy()
  })

  it('should invoke async func', async () => {
    const fn = jest.fn()
    const asyncFunc = async () => { fn() }
    const res = createUseAsync({ asyncFunc })
    await act(async () => { res.current.execute() })
    expect(fn).toHaveBeenCalled()
  })

  it('should invoke with func params', async () => {
    const fn = jest.fn()
    const asyncFunc = async (params) => { fn(params) }
    const res = createUseAsync({ asyncFunc })
    const ops = { a: 1 }
    await act(async () => { res.current.execute(ops) })
    expect(fn).toHaveBeenCalledWith(ops)
  })

  it('should invoke with resolved data', async () => {
    const data = 1
    const fn = jest.fn().mockReturnValue(data)
    const asyncFunc = async (params) => { return fn(params) }
    const res = createUseAsync({ asyncFunc })
    await act(async () => {
      res.current.execute().then(r => {
        expect(r).toEqual(data)
      })
    })
  })

  it('should set loading false before invoked', async () => {
    const asyncFunc = async () => { }
    const res = createUseAsync({ asyncFunc })
    expect(res.current.loading).not.toBeTruthy()
  })

  it('should set no data before invoked', async () => {
    const asyncFunc = async () => { }
    const res = createUseAsync({ asyncFunc })
    expect(res.current.data).toEqual(null)
  })

  it('should set initial data before invoked', async () => {
    const asyncFunc = async () => { }
    const initialData = { a: 1 }
    const res = createUseAsync({ asyncFunc, initialData })
    expect(res.current.data).toEqual(initialData)
  })

  it('should set loading true after invoked', async () => {
    const asyncFunc = () => new Promise(resolve => { setTimeout(resolve, 50) })
    const res = createUseAsync({ asyncFunc })
    await act(async () => {
      res.current.execute()
      await new Promise((r) => setTimeout(r, 10))
      expect(res.current.loading).toBeTruthy()
    })
  })

  it('should set loading false after finished', async () => {
    const asyncFunc = async () => { }
    const res = createUseAsync({ asyncFunc })
    await act(async () => { res.current.execute() })
    expect(res.current.loading).not.toBeTruthy()
  })

  it('should set data after success finish', async () => {
    const asyncFunc = async () => { return 1 }
    const res = createUseAsync({ asyncFunc })
    await act(async () => { res.current.execute() })
    expect(res.current.data).toEqual(1)
  })

  it('should throw error after error finish', async () => {
    const asyncFunc = async () => { throw new Error('oops') }
    const res = createUseAsync({ asyncFunc })
    await act(async () => {
      res.current.execute().catch(err => {
        expect(err).toEqual(Error('oops'))
      })
    })
  })

  it('should set error after error finish', async () => {
    const asyncFunc = async () => { throw new Error('oops') }
    const res = createUseAsync({ asyncFunc })
    await act(async () => {
      res.current.execute().catch(() => {
        expect(res.current.error).toEqual(Error('oops'))
      })
    })
  })

  it('should set no data after error finish', async () => {
    const asyncFunc = async () => { throw new Error('oops') }
    const res = createUseAsync({ asyncFunc })
    await act(async () => {
      res.current.execute().catch(() => {
        expect(res.current.data).toEqual(null)
      })
    })
  })

  it('should invoke async func immediately', async () => {
    const fn = jest.fn()
    const asyncFunc = async () => { fn() }
    await act(async () => {
      createUseAsync({ asyncFunc, immediate })
    })
    expect(fn).toHaveBeenCalled()
  })

  it('should invoke with func params immediately', async () => {
    const fn = jest.fn()
    const asyncFunc = async (params) => { fn(params) }
    const funcParams = { a: 1 }
    await act(async () => {
      createUseAsync({ asyncFunc, immediate, funcParams })
    })
    expect(fn).toHaveBeenCalledWith(funcParams)
  })

  it('should set loading true before invoked immediately', async () => {
    const asyncFunc = () => new Promise(resolve => { setTimeout(resolve, 50) })
    const res = createUseAsync({ asyncFunc, immediate })
    await act(async () => {
      expect(res.current.loading).toBeTruthy()
    })
  })

})
