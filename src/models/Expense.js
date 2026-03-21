import mongoose from 'mongoose'

const ExpenseSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },

    itemName: {
        type: String,
        required: true
    },

    quantity: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    total :{
        type: Number
    },
    category: {
        type: String,
        enum: ['Food','Transport', 'Medical'],
        default: 'Other'
    }
},{timestamps: true})

const Expense = mongoose.model('expense',ExpenseSchema)

export default Expense;