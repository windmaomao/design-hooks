/* eslint-disable no-plusplus */
import debounce from './debounce'

describe('debounce', () => {
  it('should debounce function', (done) => {
    let counter = 0
    const fn = debounce(value => {
      counter++
      return value
    }, 32)

    const res = { a: fn('a'), b: fn('b'), c: fn('c') }
    expect(res.a).toBeNull()
    expect(res.b).toBeNull()
    expect(res.c).toBeNull()
    expect(counter).toEqual(0)

    setTimeout(() => {
      const res2 = { d: fn('d'), e: fn('e'), f: fn('f') }
      expect(res2.d).toEqual('c')
      expect(res2.e).toEqual('c')
      expect(res2.f).toEqual('c')
      expect(counter).toEqual(1)
      done()
    }, 128)

    setTimeout(() => {
      expect(counter).toEqual(2)
      done()
    }, 256)
  })

  it('should return last result within debounce', done => {
    const fn = debounce((a) => { return a }, 32)
    fn('a')

    setTimeout(() => {
      expect(fn('b')).toEqual('a')
    }, 64)

    setTimeout(() => {
      expect(fn('c')).toEqual('b')
      done()
    }, 128)
  })

  it('should debounce with leading', done => {
    let count = 0
    const leading = debounce(() => {
      count++
    }, 32, { leading: true, trailing: false })

    leading()
    expect(count).toEqual(1)

    setTimeout(() => {
      expect(count).toEqual(1)
      leading()
      expect(count).toEqual(2)
      done()
    }, 64)
  })

  it('should debounce with both leading and trailing', done => {
    let count = 0
    const leading = debounce(() => {
      count++
    }, 32, { leading: true, trailing: true })

    leading()
    expect(count).toEqual(1)

    setTimeout(() => {
      expect(count).toEqual(2)
      leading()
      expect(count).toEqual(3)
      done()
    }, 64)
  })
})
