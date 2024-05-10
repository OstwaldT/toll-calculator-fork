import { Router } from 'express'
import tollCalcRoute from './toll-calculator'

export const routes = Router()

routes.use(tollCalcRoute)
