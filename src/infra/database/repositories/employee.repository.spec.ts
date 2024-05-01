import { SaveEmployeeInput, FindEmployeeOutput } from '@/application/interfaces/repositories/employee.interface'
import { prismaClient } from '@/infra/database/prisma-client'
import { EmployeeRepository } from './employee.repository'

jest.mock('@/infra/database/prisma-client', () => ({
  prismaClient: {
    employee: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn()
    }
  }
}))

describe('EmployeeRepository', () => {
  let repository: EmployeeRepository
  let employee: jest.Mocked<typeof prismaClient.employee>

  beforeEach(() => {
    employee = prismaClient.employee as jest.Mocked<typeof prismaClient.employee>
    repository = new EmployeeRepository()
  })

  it('should create an employee', async () => {
    const input: SaveEmployeeInput = { id: 'testId', name: 'Test', email: 'test@test.com', cpf: '12345678901', password: 'password', createdAt: new Date(), updatedAt: null, deletedAt: null }
    const expectedId = 'testId'
    employee.create.mockResolvedValueOnce({ ...input })

    const result = await repository.create(input)

    expect(result).toBe(expectedId)
  })

  it('should find all employees', async () => {
    const expectedEmployees: FindEmployeeOutput[] = [{ id: 'testId', name: 'Test', email: 'test@test.com', cpf: '12345678901', password: 'password', createdAt: new Date(), updatedAt: null, deletedAt: null }]
    employee.findMany.mockResolvedValueOnce(expectedEmployees)

    const result = await repository.findAll()

    expect(result).toEqual(expectedEmployees)
  })

  it('should find employee by id', async () => {
    const employeeId = 'testId'
    const expectedEmployee: FindEmployeeOutput = { id: employeeId, name: 'Test', email: 'test@test.com', cpf: '12345678901', password: 'password', createdAt: new Date(), updatedAt: null, deletedAt: null }
    employee.findUnique.mockResolvedValueOnce(expectedEmployee)

    const result = await repository.findById(employeeId)

    expect(result).toStrictEqual(expectedEmployee)
  })

  it('should return null if no employee is found', async () => {
    const employeeId = 'testId'
    employee.findUnique.mockResolvedValueOnce(null)

    const result = await repository.findById(employeeId)

    expect(result).toBeNull()
  })

  it('should find employee by email', async () => {
    const email = 'test@test.com'
    const expectedEmployee: FindEmployeeOutput = { id: 'testId', name: 'Test', email, cpf: '12345678901', password: 'password', createdAt: new Date(), updatedAt: null, deletedAt: null }
    employee.findFirst.mockResolvedValueOnce(expectedEmployee)

    const result = await repository.findByEmail(email)

    expect(result).toBe(expectedEmployee)
  })

  it('should return null if no employee is found by email', async () => {
    const email = 'test@test.com'
    employee.findFirst.mockResolvedValueOnce(null)

    const result = await repository.findByEmail(email)

    expect(result).toBeNull()
  })

  it('should find employee by cpf', async () => {
    const cpf = '12345678901'
    const expectedEmployee: FindEmployeeOutput = { id: 'testId', name: 'Test', email: 'test@test.com', cpf, password: 'password', createdAt: new Date(), updatedAt: null, deletedAt: null }
    employee.findFirst.mockResolvedValueOnce(expectedEmployee)

    const result = await repository.findByCpf(cpf)

    expect(result).toBe(expectedEmployee)
  })

  it('should return null if no employee is found by cpf', async () => {
    const cpf = '123.456.789-00'
    employee.findFirst.mockResolvedValueOnce(null)

    const result = await repository.findByCpf(cpf)

    expect(result).toBeNull()
  })

  it('should update an employee', async () => {
    const input: SaveEmployeeInput = { id: 'testId', name: 'Test', email: 'test@test.com', cpf: '12345678901', password: 'password', createdAt: new Date(), updatedAt: new Date(), deletedAt: null }
    const expectedId = 'testId'
    employee.update.mockResolvedValueOnce({ ...input })

    const result = await repository.update(input)

    expect(result).toBe(expectedId)
  })

  it('should delete an employee', async () => {
    const input: SaveEmployeeInput = {
      id: 'testId',
      name: 'Test',
      email: 'test@test.com',
      cpf: '12345678901',
      password: 'password',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }
    employee.update.mockResolvedValueOnce({ ...input, deletedAt: new Date() })

    await repository.delete(input)

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(employee.update).toHaveBeenCalledWith({ where: { id: input.id }, data: { deletedAt: expect.any(Date) } })
  })
})
