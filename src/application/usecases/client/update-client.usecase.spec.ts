import { Client, ISchemaValidator, IUpdateClientGateway } from '@/application/interfaces'
import { IUpdateClientUseCase } from '@/application/interfaces/usecases/client/update-client.interface'
import { InvalidParamError, MissingParamError } from '@/infra/shared'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'
import { UpdateClientUseCase } from './update-client.usecase'

const schemaValidator = mock<ISchemaValidator>()
const gateway = mock<IUpdateClientGateway>()

describe('UpdateClientUseCase', () => {
  let sut: IUpdateClientUseCase
  let input: IUpdateClientUseCase.Input
  let clientGatewayOutput: Client

  beforeEach(() => {
    sut = new UpdateClientUseCase(schemaValidator, gateway)
    input = {
      id: 'anyClientId',
      name: 'anyClientName',
      email: 'anyClientEmail',
      cpf: 'anyClientCpf'
    }
    clientGatewayOutput = {
      id: 'otherAnyClientId',
      name: 'anyClientName',
      email: 'anyClientEmail',
      password: 'anyClientPassword',
      cpf: 'anyClientCpf',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call schemaValidator once with correct values', async () => {
    gateway.getClientById.mockResolvedValueOnce(clientGatewayOutput)
    await sut.execute(input)
    expect(schemaValidator.validate).toHaveBeenCalledWith({ schema: 'updateClientSchema', data: { name: input.name, email: input.email, cpf: input.cpf } })
    expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
  })

  test('should throws if id is empty', async () => {
    input.id = ''
    gateway.getClientById.mockResolvedValueOnce(null)
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('id'))
  })

  test('should throws if email is empty', async () => {
    gateway.getClientById.mockResolvedValueOnce(clientGatewayOutput)
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    input.email = ''
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should throws if cpf is empty', async () => {
    gateway.getClientById.mockResolvedValueOnce(clientGatewayOutput)
    gateway.getClientByEmail.mockResolvedValueOnce(null)
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    input.cpf = ''
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should throws if schemaValidator returns error', async () => {
    gateway.getClientById.mockResolvedValueOnce(clientGatewayOutput)
    gateway.getClientByEmail.mockResolvedValueOnce(null)
    gateway.getClientByDocument.mockResolvedValueOnce(null)
    schemaValidator.validate.mockReturnValueOnce({ value: input, error: 'anyError' })
    const output = sut.execute(input)
    await expect(output).rejects.toThrow(new InvalidParamError('anyError'))
  })

  test('should call clientRepository.update with correct values', async () => {
    gateway.getClientById.mockResolvedValueOnce(clientGatewayOutput)
    gateway.getClientByEmail.mockResolvedValueOnce(null)
    gateway.getClientByDocument.mockResolvedValueOnce(null)
    await sut.execute(input)
    expect(gateway.updateClient).toHaveBeenCalledWith({ ...input, id: 'anyClientId', updatedAt: new Date() })
    expect(gateway.updateClient).toHaveBeenCalledTimes(1)
  })

  test('should throw if no parameters are provided', async () => {
    input.name = ''
    input.email = ''
    input.cpf = ''
    await expect(sut.execute(input)).rejects.toThrow(new MissingParamError('enter at least one parameter name, email or document'))
  })

  test('should throw if email is already being used by another user', async () => {
    gateway.getClientById.mockResolvedValueOnce(clientGatewayOutput)
    gateway.getClientByEmail.mockResolvedValueOnce(Promise.resolve({ id: 'otherClientId', email: 'anyClientEmail', name: '', password: '', cpf: '', createdAt: new Date(), updatedAt: null, deletedAt: null }))
    await expect(sut.execute(input)).rejects.toThrow(new InvalidParamError('the email is already being used by another user'))
  })

  test('should throw if there is already a user with the same document', async () => {
    gateway.getClientById.mockResolvedValueOnce(clientGatewayOutput)
    gateway.getClientByDocument.mockResolvedValueOnce(Promise.resolve({ id: 'otherClientId', cpf: 'anyClientCpf', name: '', email: '', password: '', createdAt: new Date(), updatedAt: null, deletedAt: null }))
    await expect(sut.execute(input)).rejects.toThrow(new InvalidParamError('there is already a user with this document'))
  })
})
