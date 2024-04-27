import { ISchemaValidator } from '@/application/interfaces'
import { JoiValidatorSchemaAdapter } from './joi-validator.adapter'
import * as schemas from './schemas'

jest.mock('./schemas')

describe('JoiValidatorSchemaAdapter', () => {
  let adapter: JoiValidatorSchemaAdapter
  let schema: jest.Mock

  beforeEach(() => {
    schema = jest.fn()
    ;(schemas as jest.Mocked<typeof schemas> & { testSchema: { validate: jest.Mock } }).testSchema = { validate: schema }
    adapter = new JoiValidatorSchemaAdapter()
  })

  it('should validate input with correct schema', () => {
    const input: ISchemaValidator.Input = {
      schema: 'testSchema',
      data: { test: 'data' }
    }
    const output: ISchemaValidator.Output = { value: input.data }
    schema.mockReturnValue(output)

    const result = adapter.validate(input)

    expect(result).toBe(output)
    expect(schema).toHaveBeenCalledWith(input.data)
  })
})
