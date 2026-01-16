import { Context, Next } from 'hono'
import * as jwt from 'jsonwebtoken'
import { payload } from '../types/auth.details'


export const authMiddleware = async (c: Context, next: Next) => {
    try {
        const authHeader = c.req.header('Authorization')

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return c.json({
                message: 'No Token Provided'
            }, 401)
        }

        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as payload

        c.set('userId', decoded.id)

        await next();

    } catch (error) {
        console.error('Auth Middleware Error:', error)
        return c.json({
            success: false,
            message: 'Authentication failed'
        }, 500)
    }
}