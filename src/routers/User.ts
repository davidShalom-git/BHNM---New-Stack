import {Hono} from 'hono'
import { register } from '../controllers/User'

const router = new Hono()


router.post('/register',async(c) => register(c))

export default router