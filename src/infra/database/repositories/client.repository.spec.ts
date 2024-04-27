import { Client, GetAllClientsInput, SaveClientInput, UpdateClientInput } from '@/application/interfaces'
import { prismaClient } from '@/infra/database/prisma-client'
import { ClientRepository } from './client.repository'

jest.mock('@/infra/database/prisma-client', () => ({
  prismaClient: {
    client: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    }
  }
}))

describe('ClientRepository', () => {
  let repository: ClientRepository
  let client: jest.Mocked<typeof prismaClient.client>

  beforeEach(() => {
    client = prismaClient.client as jest.Mocked<typeof prismaClient.client>
    repository = new ClientRepository()
  })

  // Test for getById method
  it('should get client by id', async () => {
    const clientId = 'testId'
    const expectedClient: Client = { id: clientId, name: 'Test', email: 'test@test.com', cpf: '12345678901', password: 'password', createdAt: new Date(), updatedAt: null, deletedAt: null }
    client.findUnique.mockResolvedValueOnce(expectedClient)

    const result = await repository.getById(clientId)

    expect(result).toBe(expectedClient)
  })

  // Test for getByEmail method
  it('should get client by email', async () => {
    const email = 'test@test.com'
    const expectedClient: Client = { id: 'testId', name: 'Test', email, cpf: '12345678901', password: 'password', createdAt: new Date(), updatedAt: null, deletedAt: null }
    client.findFirst.mockResolvedValueOnce(expectedClient)

    const result = await repository.getByEmail(email)

    expect(result).toBe(expectedClient)
  })

  // Test for getByDocument method
  it('should get client by document', async () => {
    const document = '12345678901'
    const expectedClient: Client = { id: 'testId', name: 'Test', email: 'test@test.com', cpf: document, password: 'password', createdAt: new Date(), updatedAt: null, deletedAt: null }
    client.findFirst.mockResolvedValueOnce(expectedClient)

    const result = await repository.getByDocument(document)

    expect(result).toBe(expectedClient)
  })

  // Test for getAll method
  it('should get all clients', async () => {
    const input: GetAllClientsInput = { cpf: '12345678901' }
    const expectedClients: Client[] = [{ id: 'testId', name: 'Test', email: 'test@test.com', cpf: '12345678901', password: 'password', createdAt: new Date(), updatedAt: null, deletedAt: null }]
    client.findMany.mockResolvedValueOnce(expectedClients)

    const result = await repository.getAll(input)

    expect(result).toBe(expectedClients)
  })

  // Test for save method
  it('should save client', async () => {
    const input: SaveClientInput = { id: 'testId', name: 'Test', email: 'test@test.com', cpf: '12345678901', password: 'password', createdAt: new Date() }
    const expectedId = 'testId'
    client.create.mockResolvedValueOnce({ id: expectedId, name: 'Test', email: 'test@test.com', cpf: '12345678901', password: 'password', createdAt: new Date(), updatedAt: null, deletedAt: null })

    const result = await repository.save(input)

    expect(result).toBe(expectedId)
  })

  // Test for update method
  it('should update client', async () => {
    const input: UpdateClientInput = { id: 'testId', name: 'Test', email: 'test@test.com', cpf: '12345678901', updatedAt: new Date() }
    const expectedId = 'testId'
    client.update.mockResolvedValueOnce({ id: expectedId, name: 'Test', email: 'test@test.com', cpf: '12345678901', password: 'password', createdAt: new Date(), updatedAt: new Date(), deletedAt: null })

    const result = await repository.update(input)

    expect(result).toBe(expectedId)
  })

  // Test for delete method
  it('should delete client', async () => {
    const clientId = 'testId'
    await repository.delete(clientId)
    client.update.mockResolvedValueOnce({ id: clientId, name: 'Test', email: 'test@test.com', cpf: '12345678901', password: 'password', createdAt: new Date(), updatedAt: new Date(), deletedAt: null })

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(client.update).toHaveBeenCalledWith({ data: { deletedAt: expect.any(Date) }, where: { id: clientId } })
  })
})
