import express from 'express';
import Practica from '../models/Practica.js';
import User from '../models/Usuario.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, empresa, nombreJefe, telefonoEmpresa, correoEmpresa, tipoPractica, fechaInicio } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const practica = new Practica({
      user: user._id,
      empresa,
      nombreJefe,
      telefonoEmpresa,
      correoEmpresa,
      tipoPractica,
      fechaInicio,
    });

    await practica.save();
    res.status(201).json(practica);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const practicas = await Practica.find().populate('user');
    res.json(practicas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;