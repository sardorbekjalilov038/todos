import fs from "fs"
import { join } from "path"

const createUser = (req, res) => {
    const { username } = req.body
    
    if (!req.files || !req.files.avatar) {
        return res.status(400).json({ status: 400, message: "Avatar is required!" })
    }

    const { avatar } = req.files

    let fileData = fs.readFileSync(join(process.cwd(), "src", "db", "user.json"), "utf-8")
    let users = fileData ? JSON.parse(fileData) : []

    const filename = Date.now() + "." + avatar.mimetype.split("/")[1]
    
    const newUser = {
        id: users.length ? users.at(-1).id + 1 : 1,
        username,
        avatar: filename,
    }

    users.push(newUser)

    fs.writeFileSync(join(process.cwd(), "src", "db", "user.json"), JSON.stringify(users, null, 4))

    avatar.mv(join(process.cwd(), "src", "uploadsd", filename), err => {
        if (err) {
            console.log(err)
            return res.status(500).json({ status: 500, message: "Error uploading file" })
        }
    })

    res.status(201).json({
        status: 201,
        message: "User successfully created!",
        data: newUser
    })
}

export default {
    createUser
}