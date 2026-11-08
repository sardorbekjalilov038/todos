import fs from "fs"
import { join } from "path"

const getAllTodos = (req,res) =>{
    let todos = fs.readFileSync(join(process.cwd(), "src", "db", "todos.json"), "utf-8")
    todos = JSON.parse(todos)

    const { search, status } = req.query
    if(search){
        todos = todos.filter(todo => todo.title.includes(search))
    }

    if(status && status !="all"){
        todos = todos.filter(todo => todo.status == status)
    }
    return res.status(200).json({
        status:200,
        date:todos
    })
}

const createTodo = (req, res) => {
    const { title } = req.body

    let todos = fs.readFileSync(join(process.cwd(), "src", "db", "todos.json"), "utf-8")
    todos = JSON.parse(todos)

    const newTodo = {
        id: todos.length ? todos.at(- 1).id + 1 : 1,
        title,
        status: "active",
        created_at: new Date().toLocaleString()
    }

    todos.push(newTodo)

    fs.writeFileSync(join(process.cwd(), "src", "db", "todos.json"),JSON.stringify(todos, null, 4))

    res.status(201).json({
        status: 201,
        message: "Todo successfully created!",
        data: newTodo
    })
}

const updateStatus =(req, res) =>{
    const{ todoId } = req.params

    let todos = fs.readFileSync(join(process.cwd(), "src", "db", "todos.json"), "utf-8")
    todos = JSON.parse(todos)

    let todo = todos.find(todo => todo.id == todoId)
    
    todo.status = todo.status =="active" ? "comleted" : "active"

    fs.writeFileSync(join(process.cwd(), "src", "db", "todos.json"),JSON.stringify(todos,nul,4))

    return res.status(200).json({
        status:200,
        message:"Todo status successfull updated"
    })
}

const setAllCompleted =(req, res) =>{
    let todos = fs.readFileSync(join(process.cwd(), "src", "db", "todos.json"), "utf-8")
    todos = JSON.parse(todos)

    todos.map(todo => todo.status = "completed")

    fs.writeFileSync(join(process.cwd(), "src", "db", "todos.json"),JSON.stringify(todos, null, 4))

    return res.status(200).json({
        status:200,
        message:"Completed All Todos"
    })
}
export default {
    getAllTodos,
    createTodo,
    updateStatus,
    setAllCompleted

}