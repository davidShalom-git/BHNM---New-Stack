import {Hono} from 'hono'
import Todo from '../models/Todo.js'


const router = new Hono()


router.post('/',async(c) => {
    try {

        const {title, description} = await c.req.json()
        
        if(!title || !description){
            return c.json({message: "All Fields are required"},404)
        }
        
        const newTodo = new Todo({
            title,
            description,
            completed: false
        })

        await newTodo.save()

        return c.json({message: "Todo Created Successfully", newTodo},201)
    } catch (error) {
        return c.json({message: "Failed to create Todo",error},500)
    }
})

router.get('/get', async(c) => {
    try {

        const getTodos = await Todo.find()
        if(!getTodos){
            return c.json({message: "No Todos Found"},404)
        }

        return c.json({message: 'Todos Retrieved Successfully', getTodos},200)
        
    } catch (error) {
        return c.json({message: "Failed to retrieve Todos",error},500)
    }
})


router.get('/get/:id',async(c) => {
  try {

      const {id} = c.req.param()
      const getTodo = await Todo.findById(id)
      if(!getTodo){
        return c.json({message: "Todo Not Found"},404)
      }
      
      return c.json({message: 'Todo Retrieved Successfully',getTodo},200)
  } catch (error) {
    return c.json({message: "Failed to retrieve Todo",error},500)
  }
})