import { formatNumber, toNumber } from './numberUtils'

describe('useNumber utilities', () => {

  describe('formatNumber', () => {

    it('should format empty number', () => {
      expect(formatNumber(null)).toEqual('')
    })

    it('should format zero', () => {
      expect(formatNumber(0)).toEqual('0')
    })

    it('should format thousands', () => {
      expect(formatNumber(8900)).toEqual('8,900')
    })

    it('should format negative', () => {
      expect(formatNumber(-123)).toEqual('-123')
    })
  })

  describe('toNumber', () => {

    it('should convert empty string to null', () => {
      expect(toNumber('')).toEqual(null)
    })

    it('should convert letter string to null', () => {
      expect(toNumber('a')).toEqual(null)
    })

    it('should convert string to number', () => {
      expect(toNumber('1')).toEqual(1)
    })

    it('should convert formatted string to number', () => {
      expect(toNumber('1,000,900')).toEqual(1000900)
    })

    it('should convert string to negative number', () => {
      expect(toNumber('-200')).toEqual(-200)
    })

    it('should convert word to number', () => {
      expect(toNumber('213whu')).toEqual(213)
    })
  })
})
