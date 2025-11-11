import express from "express";
import morgan from "morgan";
import cors from 'cors';
import authRutas from './routes/auth.js';
import practicasRouter from './routes/practicas.js';
import reporteRutas from './routes/reporteRutas.js'; //importar rutas de reportes

const app = express();

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(morgan("dev"));
app.use(express.json()); // Permite a Express entender JSON

// Rutas del API
app.use('/api/auth', authRutas);
app.use('/api', reporteRutas);
app.use('/api/practicas', practicasRouter);

export default app;