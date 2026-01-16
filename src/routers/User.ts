import {Hono} from 'hono'
import { login, logout, register } from '../controllers/User'



const router = new Hono()


router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)

export default router