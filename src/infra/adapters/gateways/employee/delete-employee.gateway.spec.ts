import { IEmployeeRepository, FindEmployeeOutput } from '@/application/interfaces'
import { DeleteEmployeeGateway } from './delete-employee.gateway'

describe('DeleteEmployeeGateway', () => {
  let gateway: DeleteEmployeeGateway
  let employeeRepository: jest.Mocked<IEmployeeRepository>

  beforeEach(() => {
    employeeRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findByCpf: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
    gateway = new DeleteEmployeeGateway(employeeRepository)
  })

  it('should find employee by id', async () => {
    const id = '1'
    const employee: FindEmployeeOutput = {
      id,
      name: 'Test',
      email: 'test@email.com',
      cpf: '123456789',
      password: '123456',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }
    employeeRepository.findById.mockResolvedValueOnce(employee)

    const result = await gateway.findById(id)

    expect(result).toBe(employee)
    expect(employeeRepository.findById).toHaveBeenCalledWith(id)
  })

  it('should delete employee', async () => {
    const employee: FindEmployeeOutput = {
      id: '1',
      name: 'Test',
      email: 'test@email.com',
      cpf: '123456789',
      password: '123456',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }

    await gateway.delete(employee)

    expect(employeeRepository.delete).toHaveBeenCalledWith(employee)
  })
})
