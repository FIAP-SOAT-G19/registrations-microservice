import { IClientRepository, SaveClientInput } from '@/application/interfaces'
import { CreateClientGateway } from './create-client.gateway'

describe('CreateClientGateway', () => {
  let gateway: CreateClientGateway
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
    gateway = new CreateClientGateway(clientRepository)
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
      email: 'test@email.com',
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

  it('should save client', async () => {
    const input: SaveClientInput = {
      id: '1',
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
      cpf: '123456789',
      createdAt: new Date()
    }
    const id = '1'
    clientRepository.save.mockResolvedValueOnce(id)

    const result = await gateway.saveClient(input)

    expect(result).toBe(id)
    expect(clientRepository.save).toHaveBeenCalledWith(input)
  })
})
