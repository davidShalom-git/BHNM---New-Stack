import 'dotenv/config'

import { Hono } from 'hono'
import { cors } from 'hono/cors'

import connectDB from './config/db.js'

import todo from './routers/todo.js'

const app = new Hono()



app.use("*", cors())
connectDB();


app.route('/api/todo',todo)

console.log("Server Started")



export default app