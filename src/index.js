import 'dotenv/config'

import { Hono } from 'hono'
import { cors } from 'hono/cors'

import connectDB from './config/db.js'
import auth from './routers/Auth.js'

const app = new Hono()



app.use("*", cors())
connectDB();


app.route('/api/auth',auth)

console.log("Server Started")



export default app