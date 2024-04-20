import { Router } from 'express'
import { expressAdapter } from '../adapters/tools/http/express.adapter'
import { makeCreateClientController } from '../factories/controllers/client/create-client-controller.factory'
import { makeDeleteClientController } from '../factories/controllers/client/delete-client-controller.factory'
import { makeGetAllClientsController } from '../factories/controllers/client/get-all-clients-controller.factory'
import { makeLoginClientController } from '../factories/controllers/client/login-client-controller.factory'
import { makeUpdateClientController } from '../factories/controllers/client/update-client-controller.factory'
import { makeCreateEmployeeController } from '../factories/controllers/create-employee-controller.factory'
import { makeDeleteEmployeeController } from '../factories/controllers/delete-employee-controller.factory'
import { makeGetEmployeeController, makeGetAllEmployeesController } from '../factories/controllers/get-employee-controller.factory'
import { makeHealthcheckController } from '../factories/controllers/healthcheck-controller.factory'
import { makeUpdateEmployeeController } from '../factories/controllers/update-employee-controller.factory'
import { makeLivenessProbeController } from '../factories/controllers/liveness-controller.factory'
import { makeReadinessProbeController } from '../factories/controllers/readiness-controller.factory'

const router = Router()

router.get('/healthcheck', expressAdapter(makeHealthcheckController()))
router.get('/livenessProbe', expressAdapter(makeLivenessProbeController()))
router.get('/readinessProbe', expressAdapter(makeReadinessProbeController()))

// employee
router.post('/employee', expressAdapter(makeCreateEmployeeController()))
router.get('/employee/:id', expressAdapter(makeGetEmployeeController()))
router.get('/employees', expressAdapter(makeGetAllEmployeesController()))
router.patch('/employee/:id', expressAdapter(makeUpdateEmployeeController()))
router.delete('/employee/:id', expressAdapter(makeDeleteEmployeeController()))
// Clients
router.post('/client/auth', expressAdapter(makeLoginClientController()))
router.post('/client', expressAdapter(makeCreateClientController()))
router.patch('/client/:id', expressAdapter(makeUpdateClientController()))
router.get('/client', expressAdapter(makeGetAllClientsController()))
router.delete('/client/:id', expressAdapter(makeDeleteClientController()))

export { router }
