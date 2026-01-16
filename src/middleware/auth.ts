import {Context,Next} from 'hono'
import * as jwt from 'jsonwebtoken'
import { payload } from '../types/auth.details'


export const authMiddleware = async(c:Context,next:Next) => {
    try {
        const authHeader = c.req.header('Authorization')

        if(!authHeader || !authHeader.startsWith('Bearer')) {
            return c.json({
                message: 'No Token Provided'
            },400)
        }

        const token = authHeader.split(' ')[1]

        const decode = jwt.verify(token,process.env.JWT_SECRET as string) as payload
        c.set('userId',decode.id)

        await next();
        
    } catch (error) {
        return c.json({message: "Invalid Token and Authentication failed"},500)
    }
}