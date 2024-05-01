import { ramdonStringGenerator } from './string.helper'

describe('ramdonStringGenerator', () => {
  it('should return a string', () => {
    const result = ramdonStringGenerator()
    expect(typeof result).toBe('string')
  })

  it('should return a string in the correct format', () => {
    const result = ramdonStringGenerator()
    const regex = /^[A-Z0-9]{6}-\d{13}$/
    expect(result).toMatch(regex)
  })
})
