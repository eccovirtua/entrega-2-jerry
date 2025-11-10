//ejemplo del profe

import User from '../models/authModel.js'

export const registro = async (req,res) => {
    const {name, email,password} = req.body
    try {
        const nuevoUser = new User({
            name,
            email,
            password
        })
        console.log(nuevoUser)
        await nuevoUser.save()
        res.send("Registrado")
    } catch (error) {
        console.log(error)
    }
}

export const login = (req,res) => {
    res.send("Login")
}
