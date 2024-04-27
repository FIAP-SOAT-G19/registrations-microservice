import { obfuscateValue } from './obfuscate-value.helper'

describe('obfuscateValue', () => {
  it('should obfuscate the specified values in the object', () => {
    const object = {
      password: 'password',
      passwordConfirmation: 'password',
      creditCard: {
        brand: 'Visa',
        number: '1234567812345678',
        cvv: '123',
        expiryMonth: '01',
        expiryYear: '2023'
      }
    }

    const obfuscatedObject = obfuscateValue(object)

    expect(obfuscatedObject).toEqual({
      password: '[OBFUSCATED]',
      passwordConfirmation: '[OBFUSCATED]',
      creditCard: {
        brand: '[OBFUSCATED]',
        number: '[OBFUSCATED]',
        cvv: '[OBFUSCATED]',
        expiryMonth: '[OBFUSCATED]',
        expiryYear: '[OBFUSCATED]'
      }
    })
  })

  it('should not obfuscate values that are not specified', () => {
    const object = {
      username: 'username',
      email: 'email@example.com'
    }

    const obfuscatedObject = obfuscateValue(object)

    expect(obfuscatedObject).toEqual(object)
  })
})
