import prisma from "../lib/prisma";
import {PostDetailsResponse } from "../types/post.details";

export const createPost = async(title:string,content:string,authorId:string,imageUrl?:string): Promise<PostDetailsResponse> => {
    try{
        
        const newPost = await prisma.post.create({
            data:{
                title,
                content,
                authorId,
                image:imageUrl
            }
        })

        if(!newPost){
            throw new Error('Post Creation failed')
        }

        return {
            message: 'Post created successfully',
            status:201
        }

    }
    catch(error){
        const message = error instanceof Error ? error.message : 'Internal server error';
        return {
            message,
            status: 500
        };
    }
}