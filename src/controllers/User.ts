import { Hono } from "hono";
import * as UserDetails from '../services/User'




export const register = async (c: any) => {
    try {

        const { username, email, password } = await c.req.json()

        if (!username || !email || !password) {
            return c.json({ message: "All Fields are required" }, 400)
        }

        const sendUserDetails = await UserDetails.registerUser(username, email, password)
        return c.json(sendUserDetails, 201)

    } catch (error) {
        return c.json({ message: 'Internal Server Error' }, 500)
    }

}

