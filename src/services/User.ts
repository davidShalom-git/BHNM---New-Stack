import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken'


const prisma = new PrismaClient();

export const registerUser = async (username: string, email: string, password: string) => {

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: String(email) }
        })

        if (existingUser) {
            return { message: 'User already exists' }
        }

        const hashPassword = await bcrypt.hash(String(password), 10)

        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashPassword
            }
        })

        const token = jwt.sign({id:newUser.id},String(process.env.JWT_SECRET), {expiresIn: "7d"})

        return { message: "User Register Successfully", token }

    } catch (error) {
        return { message: "Internal Server Error" }
    }
}

export const loginUser = async(email:string,password:string) => {
    try {

        const user = await prisma.user.findUnique({
            where: {email}
        })

        if(!user){
            return {message: "User not found"}
        }

        const isMatchPassword = await bcrypt.compare(password,user.password)   
        
        
        if(!isMatchPassword){
            return {message: "Password is incorrect"}
        } 

        const token = jwt.sign({id:user.id},String(process.env.JWT_SECRET), {expiresIn: "7d"})

        return {message: 'Login Successful',token}


    } catch (error) {
        
    }
}

