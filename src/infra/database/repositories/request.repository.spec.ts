import { RequestsRepository } from './request.repository'
import { prismaClient } from '../prisma-client'
import { CreateRequestRepositoryInput } from '@/application/interfaces'

jest.mock('@/infra/database/prisma-client', () => ({
  prismaClient: {
    request: {
      create: jest.fn()
    }
  }
}))

describe('RequestsRepository', () => {
  let repository: RequestsRepository
  let request: jest.Mocked<typeof prismaClient.request>

  beforeEach(() => {
    request = prismaClient.request as jest.Mocked<typeof prismaClient.request>
    repository = new RequestsRepository()
  })

  it('should create a request', async () => {
    const data: CreateRequestRepositoryInput = {
      id: 'testId',
      method: 'GET',
      route: '/test',
      input: 'test',
      status: 200,
      output: 'test',
      createdAt: new Date()
    }

    const mockResolvedValue = { ...data, updatedAt: null, deletedAt: null }

    request.create.mockResolvedValueOnce(mockResolvedValue)

    await repository.create(data)

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(request.create).toHaveBeenCalledWith({ data })
  })
})
