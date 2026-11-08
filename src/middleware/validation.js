import { todoSchema } from "../utils/validation.js"

export default {
    createTodo : (req, res, next) => {
        const { error } = todoSchema.validate(req.body)

        if(error){
            return res.status(400).json({
                status:400,
                message:error.message
            })
        }

        next()
    }
} 