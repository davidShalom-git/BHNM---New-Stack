import { Hono } from "hono";
import prisma from "../config/db.js";

const router = new Hono()


router.post('/', async (c) => {
    try {

        const { title, description, checked } = await c.req.json();

        if (!title || !description || !checked) {
            return c.json({ message: "All fields are required" }, 404)
        }


        const newTodo = await prisma.todoList.create({
            data: {
                title,
                description,
                checked
            }
        })

        if (!newTodo) {
            return c.json({ message: "Failed to create a new todo" }, 500)
        }


        return c.json({ message: "Todo created successfully", todo: newTodo }, 201)


    } catch (error) {
        return c.json({ message: "An error occurred while creating the todo" }, 500)
    }
})


router.get('/get', async (c) => {
    try {

    } catch (error) {

    }
})