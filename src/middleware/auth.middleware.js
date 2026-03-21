import {verify} from 'hono/jwt'
import {createMiddelware} from 'hono/factory'


const authMiddleware = createMiddelware(async(c, next)=> {
    try {

        const authHeader = c.req.header('Authorization')

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return c.json({message: 'No Token Provided'},401)
        }

        const token = authHeader.split(' ')[1]
        const payload = await verify(token, process.env.JWT_SECRET)
        
        c.set('user', payload)

        await next()

    } catch (error) {
         return c.json({ message: "Invalid or expired token" }, 401)
    }
})

export default authMiddleware