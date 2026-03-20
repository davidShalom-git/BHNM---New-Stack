import 'dotenv/config'

import {Hono} from 'hono'
import connectDB from './config/db.js'




const app = new Hono()

connectDB();



app.get('/',(c)=> {
    return c.text('Hello World')
})



export default app


Bun.serve({
    fetch: app.fetch,
    port:1200
})