import express from "express";
import morgan from "morgan";
import cors from 'cors';
import authRutas from './routes/authRutas.js';
import reporteRutas from './routes/reporteRutas.js'; //importar rutas de reportes

const app = express();

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(morgan("dev"));
app.use(express.json()); // Permite a Express entender JSON

// Rutas del API
app.use('/api', authRutas);     // Rutas para /api/registro, /api/login
app.use('/api', reporteRutas);

export default app;