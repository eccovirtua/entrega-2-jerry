import { Router } from 'express';
import { getReportes, getGraficoReporte } from '../controllers/reporteControlador.js';

const router = Router();

/*
 * Define las rutas del API para "reportes".
 * Usa Express para manejar las peticiones GET.
 */

// Ruta para la tabla: GET /api/reportes
router.get('/reportes', getReportes);

// Ruta para el gráfico: GET /api/reportes/1234abcd/grafico
router.get('/reportes/:id/grafico', getGraficoReporte);

export default router;