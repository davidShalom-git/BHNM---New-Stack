import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
},{timestamps: true})


const User = mongoose.model('Auth', UserSchema)

export default User;