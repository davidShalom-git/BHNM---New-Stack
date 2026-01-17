import { Context } from "hono";


export const createPost = async(c:Context) => {
    try {

    const userId = c.get('userId') as string
    const {title,description,image} = await c.req.json()
    
        
    } catch (error) {
        
    }
}