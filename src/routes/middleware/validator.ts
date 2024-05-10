import joi from '@hapi/joi'
import { NextFunction, Request, RequestHandler, Response } from 'express'

function Validator(schema: joi.AnySchema): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        const validateResult = schema.validate(req.body)
        if (validateResult.error) {
            return res.status(400).json({
                message: validateResult.error.details[0].message,
            })
        }
        next()
    }
}

export default Validator
