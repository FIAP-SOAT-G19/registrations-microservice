import { IController } from '@/application/interfaces'
import { RequestsRepository } from '@/infra/database/repositories/request.repository'
import { Request, Response } from 'express'
import { UUIDGeneratorAdapter } from '../uuid/uuid-generator'
import { expressAdapter } from './express.adapter'
import { HttpRequest, HttpResponse } from '@/infra/shared/types'

jest.mock('@/infra/database/repositories/request.repository')
jest.mock('../uuid/uuid-generator')

describe('expressAdapter', () => {
  let controller: jest.Mocked<IController>
  let requestRepository: jest.Mocked<RequestsRepository>
  let uuidGenerator: jest.Mocked<UUIDGeneratorAdapter>
  let req: Partial<Request>
  let res: Partial<Response>
  let adapter: (req: Request, res: Response) => Promise<void>

  beforeEach(() => {
    controller = {
      execute: jest.fn()
    }
    requestRepository = new RequestsRepository() as jest.Mocked<RequestsRepository>
    uuidGenerator = new UUIDGeneratorAdapter() as jest.Mocked<UUIDGeneratorAdapter>
    req = {
      params: {},
      body: {},
      query: {},
      url: '/test',
      method: 'GET'
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    adapter = expressAdapter(controller)
  })

  it('should call controller execute with correct input', async () => {
    const httpResponse: HttpResponse = {
      statusCode: 200,
      body: {}
    }
    controller.execute.mockResolvedValueOnce(httpResponse)

    await adapter(req as Request, res as Response)

    const expectedInput: HttpRequest = {
      params: req.params,
      body: req.body,
      query: req.query
    }
    expect(controller.execute).toHaveBeenCalledWith(expectedInput)
  })

  it('should set response status and body', async () => {
    const httpResponse: HttpResponse = {
      statusCode: 200,
      body: {}
    }
    controller.execute.mockResolvedValueOnce(httpResponse)

    await adapter(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(httpResponse.statusCode)
    expect(res.json).toHaveBeenCalledWith(httpResponse.body)
  })
})
