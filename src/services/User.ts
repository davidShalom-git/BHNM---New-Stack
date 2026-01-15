import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcryptjs';


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

        return { message: "User Register Successfully", newUser }

    } catch (error) {
        return { message: "Internal Server Error" }
    }


}

