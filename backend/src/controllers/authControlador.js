//ejemplo del profe

import User from '../models/Usuario.js'

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

// Middleware de autenticación simple
export const authMiddleware = async (req, res, next) => {
    try {
        // Simulación simple de autenticación
        // En una implementación real, verificarías JWT o sesión
        const userId = req.headers['user-id'];
        
        if (!userId) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        // Para simplificar, aceptamos cualquier user-id válido de MongoDB
        // En una implementación real, verificarías que el usuario existe
        if (userId.length !== 24) {
            return res.status(401).json({ message: 'ID de usuario inválido' });
        }

        req.user = { id: userId };
        next();
    } catch (error) {
        res.status(401).json({ message: 'No autorizado' });
    }
};
