import {Hono} from 'hono'
import {sign} from 'hono/jwt'

import User from '../models/Auth.js'
import bcrypt from 'bcryptjs'

const router = new Hono();



router.post('/register',async(c)=> {
    try {

        const {Name, Email, Password} = await c.req.json()

        if(!Name || !Email || !Password){
            return c.json({message: "All Fields are Required"},400)
        }
        
        const existingUser = await User.findOne({Email})
        if(existingUser){
            return c.json({message: "User Already Registered"},400)
        }

        const HashPassword = await bcrypt.hash(Password,10)

        const newUser = await User.create({
            Name,
            Email,
            Password: HashPassword
        })

        if(!newUser){
            return c.json({message: "User not created"},400)
        }

        const token = await sign({id: newUser._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7},process.env.JWT_SECRET)


        return c.json({message: "User created Successfully",token},201)
        
    } catch (error) {
        return c.json({message: "Internal Server Error"},500)
    }
})

router.post('/login',async(c)=> {
    try {

        const {Email,Password} = await c.req.json();

        if(!Email || !Password){
            return c.json({message: "All Fields are required"},400)
        }

        const user = await User.findOne({Email})
        if(!user){
            return c.json({message: "User doesn't Exist"},404)
        }

        const isMatchPassword = await bcrypt.compare(Password, user.Password)
        if(!isMatchPassword){
            return c.json({message: "Password doesn't Match"},401)
        }

        const token = await sign({id: user._id,  exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7},process.env.JWT_SECRET)

        return c.json({message: 'User logged Successfuly',token},200)  
        
    } catch (error) {
         return c.json({message: "Internal Server Error"},500)
    }
})

router.post('/logout',async(c)=> {
    try {

        return c.json({message: "User Logged Out Successfully"},200)
        
    } catch (error) {
        return c.json({message: "Internal Server Error"},500)
    }
})

export default router;