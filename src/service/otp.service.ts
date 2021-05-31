import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import Otp, { OtpDocument } from '../model/otp.model';
import { generateCode } from "./../utils/otp.utils";

interface result {
    error: boolean;
    errorType: string;
    data: object | string;
}
export async function createOtp(input: DocumentDefinition<OtpDocument>) {
    try {
        const expiry = new Date().getTime() + 60000
        const otp = await Otp.create({
            phoneNumber: input.phoneNumber,
            expiry: expiry, // current time + 60 seconds
            otp: generateCode(6, true)
        })
        return {
            error: false,
            errorType: '',
            data: otp
        }
    } catch (error) {
        return {
            error: true,
            errorType: 'error',
            data: error
        }
    }
}

export async function compareOtp(input: DocumentDefinition<OtpDocument>) {
    try {
        const otpObject = await findOtp({ otp: input.otp, phoneNumber: input.phoneNumber })
        const timeNow = new Date().getTime()
        if (!otpObject) {
            return {
                error: true,
                errorType: 'notFound',
                data: 'OTP does not match our records'
            }
        } else if (timeNow > otpObject.expiry) {
            return {
                error: true,
                errorType: 'conflict',
                data: 'Sorry, this OTP is expired'
            }
        } else {
            return {
                error: false,
                errorType: '',
                data: otpObject
            }
        }
    } catch (error) {
        return {
            error: true,
            errorType: 'error',
            data: error
        }
    }
}

async function findOtp(
    query: FilterQuery<OtpDocument>,
    options: QueryOptions = { lean: true }
) {
    return Otp.findOne(query, {}, options)
}