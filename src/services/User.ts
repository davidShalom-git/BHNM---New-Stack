import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken'
import { AuthResponse } from "../types/auth.details";
import prisma from '../lib/prisma';

export const registerUser = async (username: string, email: string, password: string):Promise<AuthResponse> => {

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return { message: 'User already exists',status:400 }
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashPassword
            }
        })

        const token = jwt.sign({id:newUser.id},String(process.env.JWT_SECRET), {expiresIn: "7d"})

        return { message: "User Register Successfully", token ,status:201}

    } catch (error) {
        return { message: "Internal Server Error" ,status:500}
    }
}

export const loginUser = async(email:string,password:string):Promise<AuthResponse> => {
    try {

        const user = await prisma.user.findUnique({
            where: {email}
        })

        if(!user){
            return {message: "User not found",status:404}
        }

        const isMatchPassword = await bcrypt.compare(password,user.password)   
        
        
        if(!isMatchPassword){
            return {message: "Password is incorrect",status:401}
        } 

        const token = jwt.sign({id:user.id},String(process.env.JWT_SECRET), {expiresIn: "7d"})

        return {message: 'Login Successful',token,status:200}


    } catch (error) {
        return {message: "Internal Server Error",status:500}
    }
}

