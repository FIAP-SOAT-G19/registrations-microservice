import { IClientRepository, GetAllClientsInput } from '@/application/interfaces'
import { GetAllClientsByParamsGateway } from './get-all-clientes-gateway'

describe('GetAllClientsByParamsGateway', () => {
  let gateway: GetAllClientsByParamsGateway
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
    gateway = new GetAllClientsByParamsGateway(clientRepository)
  })

  it('should get all clients by params', async () => {
    const queryOptions: GetAllClientsInput = { id: '1' }
    const clients = [
      {
        id: '1',
        name: 'Test',
        email: 'test@email.com',
        password: '123456',
        cpf: '123456789',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null
      },
      {
        id: '2',
        name: 'Test',
        email: 'test@email.com',
        password: '123456',
        cpf: '123456789',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null
      }
    ]
    clientRepository.getAll.mockResolvedValueOnce(clients)

    const result = await gateway.getAllClientsByParams(queryOptions)

    expect(result).toBe(clients)
    expect(clientRepository.getAll).toHaveBeenCalledWith(queryOptions)
  })
})
