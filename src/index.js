import {Hono} from 'hono'
import prisma from './config/db.js'




const app = new Hono()

app.get('/',(c)=> {
    return c.text('Hello World')
})



prisma.$connect().then((res)=> {
    console.log("Connected to the database successfully")
}).catch((err)=>{
    console.error("Failed to connect to the database", err)
})


export default app


Bun.serve({
    fetch: app.fetch,
    port:1200
})