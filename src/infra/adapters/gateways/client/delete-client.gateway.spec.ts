import { IClientRepository } from '@/application/interfaces'
import { DeleteClientGateway } from './delete-client.gateway'

describe('DeleteClientGateway', () => {
  let gateway: DeleteClientGateway
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
    gateway = new DeleteClientGateway(clientRepository)
  })

  it('should get client by id', async () => {
    const id = '1'
    const client = {
      id,
      name: 'Test',
      email: 'test@email.com',
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

  it('should delete client', async () => {
    const id = '1'
    clientRepository.delete.mockResolvedValueOnce(undefined)

    await gateway.deleteClient(id)

    expect(clientRepository.delete).toHaveBeenCalledWith(id)
  })
})
