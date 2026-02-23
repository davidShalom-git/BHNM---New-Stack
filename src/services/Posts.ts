import prisma from "../lib/prisma";
import { ServiceResult } from "../types/post.details";

export const createPost = async (title: string, content: string, authorId: string, imageUrl?: string): Promise<ServiceResult> => {
    try {

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                authorId,
                image: imageUrl
            }
        })

        if (!newPost) {
            throw new Error('Post Creation failed')
        }

        return {
            message: 'Post created successfully',
            status: 201
        }

    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Internal server error';
        return {
            message,
            status: 500
        };
    }
}

export const getAllPosts = async(): Promise<ServiceResult> => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                }
            }
        })

        if(!posts){
            throw new Error("No Posts Have ben found")
        }

        return {
            data: posts,
            message:"Posts fetched successfully",
            status: 200
        }
    } catch (error) {
        console.log("error")
        return {
            message:"Internal Server Error",
            status: 500
        }
    }
}