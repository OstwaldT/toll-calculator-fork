import joi from '@hapi/joi'
import { Request, Response, Router } from 'express'
import { getTollFee } from '../toll-calculator'
import { VehicleType } from '../utils'
import Validator from './middleware/validator'

const router = Router()

router.get('/', (req, res) => {
    res.send('Ping!')
})

// Next steps for this feature would be to accept multiple ways of inputting the vehicleTypes, both in string and number form.
// This would make the API more user-friendly and easier to use.
// Would also want to expose the vehicleType Enum in the API so that the user can see the available options.
const tollFeeSchema = joi
    .object({
        vehicleType: joi
            .string()
            .valid(...Object.values(VehicleType))
            .required(),
        dates: joi.array().items(joi.date()).min(1).required(),
    })
    .required()

router.post(
    '/toll-fee',
    Validator(tollFeeSchema),
    (req: Request, res: Response) => {
        const vehicleType = req.body.vehicleType as unknown as VehicleType // Safe because of middleware validation
        const dates = (req.body.dates as any[]).map(
            (date: string) => new Date(date),
        ) // Safe because of middleware validation
        const fee = getTollFee(vehicleType, dates)

        res.json({ fee })
    },
)

export default router
