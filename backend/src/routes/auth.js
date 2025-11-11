import express from 'express';
import Usuario from '../models/Usuario.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { nombre, correo, rut, carrera, password } = req.body;

    const usuarioExistente = await Usuario.findOne({
      $or: [{ correo }, { rut }],
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo o RUT ya está registrado' });
    }

    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      rut,
      carrera,
      password,
    });

    await nuevoUsuario.save();

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        _id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        rut: nuevoUsuario.rut,
        carrera: nuevoUsuario.carrera,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await Usuario.findOne({
      $or: [{ correo: identifier }, { rut: identifier }],
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const esValida = await user.comparePassword(password);
    if (!esValida) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const userData = {
      _id: user._id,
      nombre: user.nombre,
      correo: user.correo,
      rut: user.rut,
      carrera: user.carrera,
    };

    res.json({
      token: 'tu-token-jwt-aqui',
      user: userData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
