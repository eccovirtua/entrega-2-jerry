import axios from './axios.js'; // Usa la instancia de axios existente

// Llama a: GET http://localhost:4000/api/reportes
export const getReportesRequest = () => axios.get('/reportes');

// Llama a: GET http://localhost:4000/api/reportes/ID_DE_MONGO/grafico

export const getGraficoRequest = (id) => axios.get(`/reportes/${id}/grafico`);