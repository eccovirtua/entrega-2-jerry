// src/api/registro.js
import axios from "./axios.js";

// Crear un nuevo registro de práctica
export const crearRegistro = (data) => axios.post("/registro", data);

// (opcional) Listar registros de práctica
export const obtenerRegistros = () => axios.get("/registro");