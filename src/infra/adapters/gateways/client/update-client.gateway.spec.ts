import { IClientRepository, UpdateClientInput } from '@/application/interfaces'
import { UpdateClientGateway } from './update-client.gateway'

describe('UpdateClientGateway', () => {
  let gateway: UpdateClientGateway
  let clientRepository: jest.Mocked<IClientRepository>

  beforeEach(() => {
    clientRepository = {
      getById: jest.fn(),
      getByEmail: jest.fn(),
      getByDocument: jest.fn(),
      getAll: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
    gateway = new UpdateClientGateway(clientRepository)
  })

  it('should get client by id', async () => {
    const id = '1'
    const client = {
      id,
      name: 'Test',
      email: 'email@test.com',
      password: '123456',
      cpf: '123456789',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }
    clientRepository.getById.mockResolvedValueOnce(client)

    const result = await gateway.getClientById(id)

    expect(result).toBe(client)
    expect(clientRepository.getById).toHaveBeenCalledWith(id)
  })

  it('should get client by email', async () => {
    const email = 'test@example.com'
    const client = {
      id: '1',
      name: 'Test',
      email,
      password: '123456',
      cpf: '123456789',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }
    clientRepository.getByEmail.mockResolvedValueOnce(client)

    const result = await gateway.getClientByEmail(email)

    expect(result).toBe(client)
    expect(clientRepository.getByEmail).toHaveBeenCalledWith(email)
  })

  it('should get client by document', async () => {
    const cpf = '123456789'
    const client = {
      id: '1',
      name: 'Test',
      email: 'email@test.com',
      password: '123456',
      cpf,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }
    clientRepository.getByDocument.mockResolvedValueOnce(client)

    const result = await gateway.getClientByDocument(cpf)

    expect(result).toBe(client)
    expect(clientRepository.getByDocument).toHaveBeenCalledWith(cpf)
  })

  it('should update client', async () => {
    const input: UpdateClientInput = {
      id: '1',
      name: 'Test',
      email: 'email@test.com',
      cpf: '123456789',
      updatedAt: new Date()
    }
    const id = '1'
    clientRepository.update.mockResolvedValueOnce(id)

    const result = await gateway.updateClient(input)

    expect(result).toBe(id)
    expect(clientRepository.update).toHaveBeenCalledWith(input)
  })
})
