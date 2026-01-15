import 'dotenv/config'
import {Hono} from 'hono'
import {cors} from 'hono/cors'
import {PrismaClient} from '@prisma/client'
import auth from './routers/User'


const prisma = new PrismaClient()

prisma.$connect().then(()=> {
  console.log('Connected to the Database')
}).catch((err:any)=> {
  console.error('Failed to connect to the Database:', err)
})


const app = new Hono()

app.use('*',cors())

app.route('/api/auth',auth)

export default {
  port: 1700,
  fetch: app.fetch
}

