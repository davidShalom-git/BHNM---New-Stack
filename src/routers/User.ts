import {Hono} from 'hono'
import { login, logout, register } from '../controllers/User'
import { authMiddleware } from '../middleware/auth'



const router = new Hono()


router.post('/register',register)
router.post('/login',login)
router.post('/logout',authMiddleware,logout)

export default router