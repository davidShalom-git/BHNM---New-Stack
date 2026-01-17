import { Context } from "hono";
import { uploadImage } from "../utils/cloud";
import * as PostServices from '../services/Posts'


export const createPost = async(c:Context) => {
    try {

    const userId = c.get('userId') as string
    const {title,description,image} = await c.req.json()

    if(!title || !description){
        return c.json({message: "All fields are required"},400)
    }

    let imageUrl = ''

    if(image){
        try {
            imageUrl = await uploadImage(image)
            return c.json({message: "Image uploaded to cloudinary"},200)
            
        } catch (error) {
            console.log(error)
            return c.json({message: "Image failed to upload"},500)
        }
    }


    const sendDetails = await PostServices.createPost(title,description,userId,imageUrl)

    return c.json({message: "Details sent Successfully",sendDetails},201)

        
    } catch (error) {
        return c.json({message: 'Internal Server Error'},500)
    }
}