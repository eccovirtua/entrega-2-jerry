import { Router } from "express";
import { crearRegistro, listarRegistros } from "../controllers/registroControlador.js";

const router = Router();

router.get("/", listarRegistros);
router.post("/", crearRegistro);

export default router;
