import {Hono} from 'hono'
import { login, logout, register } from '../controllers/User'



const router = new Hono()


router.post('/register',async(c) => register(c))
router.post('/login',async(c) => login(c))
router.post('/logout',async(c) => logout(c))

export default router