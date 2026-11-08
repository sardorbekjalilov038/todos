import Joi from "joi"

export const todoSchema = Joi.object({
    title: Joi.string().min(3).required()
})
