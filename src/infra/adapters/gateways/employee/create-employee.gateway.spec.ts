import { IEmployeeRepository, SaveEmployeeInput } from '@/application/interfaces'
import { CreateEmployeeGateway } from './create-employee.gateway'

describe('CreateEmployeeGateway', () => {
  let gateway: CreateEmployeeGateway
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
    gateway = new CreateEmployeeGateway(employeeRepository)
  })

  it('should create employee', async () => {
    const input: SaveEmployeeInput = {
      id: '1',
      name: 'Test',
      email: 'test@email.com',
      cpf: '123456789',
      password: '123456',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }
    const id = '1'
    employeeRepository.create.mockResolvedValueOnce(id)

    const result = await gateway.create(input)

    expect(result).toBe(id)
    expect(employeeRepository.create).toHaveBeenCalledWith(input)
  })

  it('should find employee by email', async () => {
    const email = 'test@example.com'
    const employee = {
      id: '1',
      name: 'Test',
      email,
      cpf: '123456789',
      password: '123456',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }
    employeeRepository.findByEmail.mockResolvedValueOnce(employee)

    const result = await gateway.findByEmail(email)

    expect(result).toBe(employee)
    expect(employeeRepository.findByEmail).toHaveBeenCalledWith(email)
  })

  it('should find employee by cpf', async () => {
    const cpf = '123456789'
    const employee = {
      id: '1',
      name: 'Test',
      email: 'test@email.com',
      cpf,
      password: '123456',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    }
    employeeRepository.findByCpf.mockResolvedValueOnce(employee)

    const result = await gateway.findByCpf(cpf)

    expect(result).toBe(employee)
    expect(employeeRepository.findByCpf).toHaveBeenCalledWith(cpf)
  })
})
