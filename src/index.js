import 'dotenv/config'

import { Hono } from 'hono'
import { cors } from 'hono/cors'

import connectDB from './config/db.js'
import auth from './routers/Auth.js'
import expense from './routers/Expense.js'

const app = new Hono()



app.use("*", cors())
connectDB();


app.route('/api/auth',auth)
app.route('/api/expense',expense)

console.log("Server Started")



export default app