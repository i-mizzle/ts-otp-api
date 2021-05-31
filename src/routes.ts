import { 
    Express,
    Request,
    Response 
} from 'express';
import { createOtpHandler, compareOtpHandler } from "./controller/otp.controller";

export default function(app: Express) {
    app.post('/otp/new', createOtpHandler)
    app.post('/otp/compare', compareOtpHandler)
    // healthcheck
    app.get('/ping', (req: Request, res: Response) => res.sendStatus(200))
}


