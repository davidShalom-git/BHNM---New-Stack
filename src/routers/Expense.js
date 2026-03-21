import { Hono } from 'hono'
import Expense from '../models/Expense.js'
import authMiddleware from '../middleware/auth.middleware.js'

const router = new Hono()


router.post('/items', authMiddleware, async (c) => {
    try {


        const { itemName, quantity, price, category } = await c.req.json()
        const user = c.get('user')

        if (!itemName || !quantity || !price || !category) {
            return c.json({ message: "All fields are required" }, 400)
        }


        const total = quantity * price
        const newItems = await Expense.create({
            userId: user.id,
            itemName,
            quantity,
            price,
            category,
            total: total
        })

        if (!newItems) {
            return c.json({ message: "No items were found" }, 404)
        }

        return c.json({ message: "Items saved Successfully", expense: newItems }, 201)

    } catch (error) {
        return c.json({ message: "Internal Server Error" }, 500)
    }
})


router.get('/getItems', authMiddleware, async (c) => {
    try {

        const user = c.get('user')
        const getAllItems = await Expense.find({ userId: user.id })
        if (getAllItems.length === 0) {
            return c.json({ message: "No items were not found" }, 404)
        }
        return c.json({ message: "Items Retrieved Successfull", expense: getAllItems }, 200)

    } catch (error) {
        return c.json({ message: "Internal Server Error" }, 500)
    }
})

router.get('/today', authMiddleware, async (c) => {
    try {

        const user = c.get('user')
        const today = new Date()
        today.setHours(0, 0, 0, 0) // midnight

        const expenses = await Expense.find({
            userId: user.id,
            createdAt: {
                $gte: today,
                $lte: new Date()
            }
        })

        if (expenses.length === 0) {
            return c.json({ message: "No Items are there" }, 404)
        }

        const totalSpend = expenses.reduce((sum, item) => sum + item.total, 0)

        return c.json({ message: 'Today Expenses retrieved Successfully', totalSpend }, 200)

    } catch (error) {
        return c.json({ message: "Internal Server Error" }, 500)
    }
})


router.get('/yesterday', authMiddleware, async (c) => {
    try {

        const user = c.get('user')
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        yesterday.setHours(0, 0, 0, 0) // start of the yesterday

        const yesterdayEnd = new Date()
        yesterdayEnd.setDate(yesterdayEnd.getDate() - 1)
        yesterdayEnd.setHours(23, 59, 59, 999) // end of the yesterday

        const Expenses = await Expense.find({
            userId: user.id,
            createdAt: {
                $gte: yesterday,
                $lte: yesterdayEnd
            }
        })

        if (Expenses.length === 0) {
            return c.json({ message: "No expenses are there" }, 404)
        }

        const totalExpense = Expenses.reduce((sum, item) => sum + item.total, 0)

        return c.json({ message: 'Yesterday Expenses Retrived', Expenses, totalExpense }, 200)

    } catch (error) {
        return c.json({ message: "Internal Server Error" }, 500)
    }
})


router.get('/weekly', authMiddleware, async (c) => {
    try {

        const user = c.get('user')
        const week = new Date()
        week.setDate(week.getDate() - 7)
        week.setHours(0, 0, 0, 0)

        const expenses = await Expense.find({
            userId: user.id,
            createdAt: {
                $gte: week,
                $lte: new Date()
            }
        })
        if (expenses.length === 0) {
            return c.json({ message: "No expenses are there" }, 404)
        }

        const totalExpense = expenses.reduce((sum, item) => sum + item.total, 0)

        return c.json({ message: 'Weekly Expenses Retrived', expenses, totalExpense }, 200)


    } catch (error) {

    }
})

router.put('/update/:id', authMiddleware, async (c) => {
    try {

        const { itemName, quantity, price, category } = await c.req.json();
        const { id } = c.req.param()


        if (!itemName || !quantity || !price || !category) {
            return c.json({ message: "All fields are required" }, 400)
        }

        const total = quantity * price

        const updateItem = await Expense.findByIdAndUpdate(id,
            { itemName, quantity, price, category, total },
            { new: true }
        )

        if (!updateItem) {
            return c.json({ message: "No items are there to be update" }, 404)
        }

        return c.json({ message: "Items are Updated" }, 200)

    } catch (error) {
        return c.json({ message: "Internal Server Error" }, 500)
    }
})

router.delete('/delete/:id', authMiddleware, async (c) => {
    try {

        const { id } = c.req.param()

        const deleteItem = await Expense.findByIdAndDelete(id)

        if (!deleteItem) {
            return c.json({ message: "No items were found" }, 404)
        }

        return c.json({ message: "Items were deleted" }, 200)

    } catch (error) {
        return c.json({ message: "Internal Server Error" }, 500)
    }
})



