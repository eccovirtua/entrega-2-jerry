import mongoose from "mongoose";
import Practica from "../models/Practica.js";

// Crear un nuevo registro de práctica
export async function crearRegistro(req, res) {
  try {
    const {
      empresa,
      jefe,
      telefono,
      correo_empresa,
      tipo_practica,
      fecha_inicio,
      correo,     // correo del alumno (si no tienen auth)
      user,       // opcional si se pasa desde el frontend
      userId,     // alias opcional
    } = req.body;

    // Resolver usuario (por auth, id o correo)
    let userIdResuelto = req.user?._id || user || userId;

    if (!userIdResuelto && correo) {
      const Usuario = mongoose.model("User");
      const u = await Usuario.findOne({ correo }).select("_id").lean();
      if (u) userIdResuelto = u._id;
    }

    if (!userIdResuelto) {
      return res.status(400).json({ error: "Usuario no identificado." });
    }

    const nuevoRegistro = await Practica.create({
      user: userIdResuelto,
      empresa: empresa?.trim(),
      nombreJefe: jefe?.trim(),
      telefonoEmpresa: telefono?.trim(),
      correoEmpresa: correo_empresa?.trim(),
      tipoPractica: tipo_practica,
      fechaInicio: new Date(fecha_inicio),
    });

    res.status(201).json(nuevoRegistro);
  } catch (error) {
    console.error("Error al crear el registro:", error);
    res.status(500).json({ error: "No se pudo crear el registro." });
  }
}

// Listar todos los registros
export async function listarRegistros(_req, res) {
  try {
    const registros = await Practica.find().sort({ createdAt: -1 }).lean();
    res.json(registros);
  } catch (error) {
    console.error("Error al listar registros:", error);
    res.status(500).json({ error: "Error al listar registros." });
  }
}
