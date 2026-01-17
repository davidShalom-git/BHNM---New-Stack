import cloudinary from '../config/upload'

export const uploadImage = async(base64Image:string) => {
    try {
        const result = await cloudinary.uploader.upload(base64Image,{
            folder: 'blog_posts',
            resource_type: 'image'
        })
        
        return result.secure_url

    } catch (error) {
        console.error('Error uploading image',error)
        throw new Error('Image upload failed')
    }
}