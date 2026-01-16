import {Context} from 'hono'
import * as UserDetails from '../services/User'
import { LoginInput, RegisterInput } from '../types/auth.details'




export const register = async (c:Context) => {
    try {

        const { username, email, password } :RegisterInput = await c.req.json()

        if (!username || !email || !password) {
            return c.json({ message: "All Fields are required" }, 400)
        }

        const sendUserDetails = await UserDetails.registerUser(username, email, password)
        return c.json(sendUserDetails, 201)

    } catch (error) {
        return c.json({ message: 'Internal Server Error' }, 500)
    }

}

export const login = async (c: Context) => {
    try {

        const { email, password } :LoginInput = await c.req.json()

        if (!email || !password) {
            return c.json({ message: "All fields are required" }, 400)
        }

        const sendLoginDetails = await UserDetails.loginUser(email, password)

        return c.json(sendLoginDetails, 200)


    } catch (error) {
        return c.json({ message: "Internal Server Error" }, 500)
    }
}

export const logout = async(c:Context) => {
    try {
        return c.json({message: "Logout Successfully",status: 200})
    } catch (error) {
        return c.json({message: "Internal Server Error", status: 500})
    }
}