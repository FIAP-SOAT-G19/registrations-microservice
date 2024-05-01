import { IEmployeeRepository, FindEmployeeOutput } from '@/application/interfaces'
import { GetEmployeeGateway } from './get-employee.gateway'

describe('GetEmployeeGateway', () => {
  let gateway: GetEmployeeGateway
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
    gateway = new GetEmployeeGateway(employeeRepository)
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

  it('should find all employees', async () => {
    const employees: FindEmployeeOutput[] = [
      {
        id: '1',
        name: 'Test',
        email: 'test@email.com',
        cpf: '123456789',
        password: '123456',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null
      },
      {
        id: '2',
        name: 'Test',
        email: 'test@email.com',
        cpf: '123456788',
        password: '123456',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null
      }
    ]
    employeeRepository.findAll.mockResolvedValueOnce(employees)

    const result = await gateway.findAll()

    expect(result).toEqual(employees)
    expect(employeeRepository.findAll).toHaveBeenCalled()
  })
})
