import express from "express"
import cors from "cors"
import todosRouter from "./routers/todos.js"
import usersRouter from "./routers/users.js"
import fileUpload from "express-fileupload"

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload())

app.use(todosRouter)
app.use(usersRouter)

app.listen(4545,()=>console.log("Server is running"))