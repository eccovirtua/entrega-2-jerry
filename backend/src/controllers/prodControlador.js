import express from 'express';
import Practica from '../models/Practica.js';
import Usuario from '../models/Usuario.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, empresa, nombreJefe, telefonoEmpresa, correoEmpresa, tipoPractica, fechaInicio, fechaTermino } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'userId es requerido' });
    }

    const usuario = await Usuario.findById(userId);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const practica = new Practica({
      user: usuario._id,
      empresa,
      nombreJefe,
      telefonoEmpresa,
      correoEmpresa,
      tipoPractica,
      fechaInicio,
      fechaTermino,
    });

    await practica.save();
    res.status(201).json(practica);
  } catch (err) {
    console.error('Error:', err);
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
