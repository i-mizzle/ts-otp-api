import { Request, Response } from "express";
import { get } from "lodash";
import { createOtp, compareOtp } from "../service/otp.service";
import * as response from '../responses'

export async function createOtpHandler (req: Request, res: Response) {
    const body = req.body

    const otp = await createOtp({ ...body })
    if (otp.error) {
        return response.error(res, otp.data)
    }
    return response.created(res, otp.data)
}

export async function compareOtpHandler (req: Request, res: Response) {
    const body = req.body

    const comparison = await compareOtp({ ...body })
    if (comparison.error) {
        switch (comparison.errorType) {
            case 'conflict':
                return response.conflict(res, {message: comparison.data})
            case 'notFound':
                return response.notFound(res, {message: comparison.data})
            default:
                return response.error(res, comparison.data)
        }
    }
    return response.ok(res, comparison.data)
}
