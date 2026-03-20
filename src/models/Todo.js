import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required :true
    },
    completed: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

const todo = mongoose.model('testTodo',TodoSchema)

export default todo