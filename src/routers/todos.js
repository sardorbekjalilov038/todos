import express from "express"
import todosController from "../controllers/todos.js"
import middleware from "../middleware/validation.js"

const router = express.Router()

router
    .get("/todos",todosController.getAllTodos)
    .post("/todos",middleware.createTodo,todosController.createTodo)
    .put("/todos/setAllCompleted",todosController.setAllCompleted)
    .put("/todos/:todosId",todosController.updateStatus)

export default router