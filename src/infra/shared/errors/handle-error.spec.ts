import { ClientNotFoundError, InvalidParamError, MissingParamError, ProductNotFoundError, SchemaValidationError } from '.'
import { badRequest, notFound, serverError } from '../helpers/http.helper'
import { handleError } from './handle-error'

describe('handleError', () => {
  it('should return a bad request response for InvalidParamError, MissingParamError, and SchemaValidationError', () => {
    const invalidParamError = new InvalidParamError('Invalid param')
    const missingParamError = new MissingParamError('Missing param')
    const schemaValidationError = new SchemaValidationError('Schema validation error')

    expect(handleError(invalidParamError)).toEqual(badRequest(invalidParamError))
    expect(handleError(missingParamError)).toEqual(badRequest(missingParamError))
    expect(handleError(schemaValidationError)).toEqual(badRequest(schemaValidationError))
  })

  it('should return a not found response for ClientNotFoundError and ProductNotFoundError', () => {
    const clientNotFoundError = new ClientNotFoundError()
    const productNotFoundError = new ProductNotFoundError()

    expect(handleError(clientNotFoundError)).toEqual(notFound(clientNotFoundError))
    expect(handleError(productNotFoundError)).toEqual(notFound(productNotFoundError))
  })

  it('should return a server error response for other errors', () => {
    const error = new Error('Some error')

    expect(handleError(error)).toEqual(serverError(error))
  })
})
