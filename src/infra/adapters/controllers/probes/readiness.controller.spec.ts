import { ReadinessController } from './readiness.controller'

describe('ReadinessController', () => {
  let controller: ReadinessController

  beforeEach(() => {
    controller = new ReadinessController()
  })

  it('should return status OK', async () => {
    const result = await controller.execute({})

    expect(result).toEqual({
      statusCode: 200,
      body: { status: 'OK' }
    })
  })
})
