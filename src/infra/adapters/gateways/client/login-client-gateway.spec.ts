import { IClientRepository } from '@/application/interfaces'
import { LoginClientGateway } from './login-client-gateway'

describe('LoginClientGateway', () => {
  let gateway: LoginClientGateway
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
    gateway = new LoginClientGateway(clientRepository)
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
})
