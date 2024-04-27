import { IEmployeeRepository, FindEmployeeOutput } from '@/application/interfaces'
import { UpdateEmployeeGateway } from './update-employee.gateway'

describe('UpdateEmployeeGateway', () => {
  let gateway: UpdateEmployeeGateway
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
    gateway = new UpdateEmployeeGateway(employeeRepository)
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

  it('should find employee by email', async () => {
    const email = 'test@example.com'
    const employee: FindEmployeeOutput = {
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
    const employee: FindEmployeeOutput = {
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

  it('should update employee', async () => {
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
    const id = '1'
    employeeRepository.update.mockResolvedValueOnce(id)

    const result = await gateway.update(employee)

    expect(result).toBe(id)
    expect(employeeRepository.update).toHaveBeenCalledWith(employee)
  })
})
