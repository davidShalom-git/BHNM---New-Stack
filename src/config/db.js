import mongoose from 'mongoose'



const connectDB = async() => {
    try {

        await mongoose.connect(process.env.DATABASE_URL).then((res)=> {
            console.log("MongoDB Connected ra.....")
        }).catch((err)=> {
            console.log("Failed to connect to MongoDB", err)
        })
        
    } catch (error) {
        console.error("Error connecting to MongoDB", error)
    }
}

export default connectDB