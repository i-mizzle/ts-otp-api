import { object, string, ref } from "yup";

const payload = {
    body: object({
        phoneNumber: string().required('Your phone nuber is required')
    })
}

export const createOtpSchema = object({
   ...payload
});
