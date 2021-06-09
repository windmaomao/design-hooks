import { renderHook, act } from '@testing-library/react-hooks'
import useNumber from './useNumber'

const createUseNumber = props => {
  const { result } = renderHook(() => useNumber(props))
  return result
}

describe('useNumber', () => {

  it('should init', () => {
    const res = createUseNumber()
    expect(res.current).toBeTruthy()
  })

  it('should init value', () => {
    const res = createUseNumber({ value: 2 })
    expect(res.current.displayValue).toEqual('2')
  })

  it('should change value', async () => {
    const res = createUseNumber()
    await act(async () => { res.current.change(3) })
    expect(res.current.displayValue).toEqual('3')
  })

  it('should input str', async () => {
    const res = createUseNumber()
    await act(async () => { res.current.input('4') })
    expect(res.current.value).toEqual(4)
  })

  it('should input with callback', async () => {
    const cb = jest.fn()
    const res = createUseNumber()
    await act(async () => { res.current.input('4', cb) })
    expect(cb).toHaveBeenCalled()
  })

  it('should ignore letter input', async () => {
    const res = createUseNumber()
    await act(async () => { res.current.input('a') })
    expect(res.current.value).toEqual(null)
  })

})
