import { LivenessController } from './liveness.controller'

describe('LivenessController', () => {
  let controller: LivenessController

  beforeEach(() => {
    controller = new LivenessController()
  })

  it('should return status OK', async () => {
    const result = await controller.execute({})

    expect(result).toEqual({
      statusCode: 200,
      body: { status: 'OK' }
    })
  })
})
