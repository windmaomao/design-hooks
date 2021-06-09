import reducer from './numberReducer'

const _action = (type, payload) => ({ type, payload })

describe('useNumber number reducer', () => {

  it('should reduce from no action', () => {
    const state = reducer(undefined, _action(null))
    expect(state).toBeDefined()
  })

  it('should init value', () => {
    const { value, displayValue } = reducer(
      { value: 2 },
      _action('init')
    )
    expect(value).toEqual(2)
    expect(displayValue).toEqual('2')
  })

  it('should change value', () => {
    const { value, displayValue } = reducer(
      { value: 2 },
      _action('change', 3)
    )
    expect(value).toEqual(3)
    expect(displayValue).toEqual('3')
  })

  it('should change ill-formatted value', () => {
    const { value, displayValue } = reducer(
      { value: 2 },
      _action('change', '3a')
    )
    expect(value).toEqual(null)
    expect(displayValue).toEqual('')
  })

  it('should input string', () => {
    const { value, displayValue } = reducer(
      { value: 2 },
      _action('input', { str: '3' })
    )
    expect(value).toEqual(3)
    expect(displayValue).toEqual('3')
  })

  it('should input ill-formatted string', () => {
    const { value, displayValue } = reducer(
      { value: 2 },
      _action('input', { str: '3a' })
    )
    expect(value).toEqual(3)
    expect(displayValue).toEqual('3')
  })

  it('should ignore ill-formatted input', () => {
    const { value, displayValue } = reducer(
      { value: 2 },
      _action('input', { str: 'a' })
    )
    expect(value).toEqual(null)
    expect(displayValue).toEqual('')
  })

  it('should input callback with number', async () => {
    const cb = jest.fn()
    reducer(
      { value: 2 },
      _action('input', { str: '3', cb })
    )
    expect(cb).toHaveBeenCalledWith(3)
  })

})
