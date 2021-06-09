import defaults from './defaults'

describe('defaults', () => {
  it('should not mutate argument', () => {
    const a = {}
    defaults(a, { b: 0 })
    expect(a.b).toEqual(undefined)
  })

  it('should default with null argument', () => {
    const obj = defaults({ a: 1 }, null)
    expect(obj).toEqual({ a: 1 })
  })

  it('should default with undefined default', () => {
    const obj = defaults(undefined, { a: 1 })
    expect(obj).toEqual({ a: 1 })
  })

  it('should default with missing key', () => {
    const obj = defaults({ a: 1 }, { b: 2 })
    expect(obj).toEqual({ a: 1, b: 2 })
  })

  it('should overwrite with existing key', () => {
    const obj = defaults({ a: 1 }, { a: 2, b: 2 })
    expect(obj).toEqual({ a: 2, b: 2 })
  })

  it('should default with undefined key', () => {
    const obj = defaults({ a: undefined }, { b: 1 })
    expect(obj).toEqual({ a: undefined, b: 1 })
  })

  it('should default with null key', () => {
    const obj = defaults({ a: null }, { a: 2, b: 2 })
    expect(obj).toEqual({ a: 2, b: 2 })
  })

  it('should default with null key', () => {
    const obj = defaults({ a: null }, { a: 2, b: 2 })
    expect(obj).toEqual({ a: 2, b: 2 })
  })

  it('should default with 0 key', () => {
    const obj = defaults({ a: 'a' }, { a: 0 })
    expect(obj).toEqual({ a: 0 })
  })

  it('should default with multiple sources', () => {
    const obj = defaults({ a: 1 }, { b: 2 }, { c: 3 })
    expect(obj).toEqual({ a: 1, b: 2, c: 3 })
  })

})
