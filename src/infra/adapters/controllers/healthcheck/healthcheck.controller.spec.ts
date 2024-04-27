import { Pool } from 'pg'
import { HealthCheckController } from './healthcheck.controller'

jest.mock('pg', () => {
  const mPool = {
    connect: jest.fn(),
    end: jest.fn()
  }
  return {
    Pool: jest.fn(() => mPool)
  }
})

describe('HealthCheckController', () => {
  let controller: HealthCheckController
  let pool: any

  beforeEach(() => {
    controller = new HealthCheckController()
    pool = new Pool()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return status OK when database connection is successful', async () => {
    pool.connect.mockResolvedValueOnce(null)

    const result = await controller.execute({})

    expect(result).toEqual({
      statusCode: 200,
      body: { status: 'OK' }
    })
    expect(pool.connect).toBeCalledTimes(1)
    expect(pool.end).toBeCalledTimes(1)
  })

  it('should return error when database connection fails', async () => {
    const error = new Error('Database connection error')
    pool.connect.mockRejectedValueOnce(error)

    const result = await controller.execute({})

    expect(result).toEqual({
      statusCode: 500,
      body: { error: 'Error', message: 'Database connection error' }
    })
    expect(pool.connect).toBeCalledTimes(1)
    expect(pool.end).toBeCalledTimes(1)
  })
})
