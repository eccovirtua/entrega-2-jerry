import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

// Interceptor para agregar el header de autenticación en cada request
instance.interceptors.request.use(
    (config) => {
        // Para la funcionalidad de documentos, usar un ID de usuario simulado
        // En una implementación real, esto vendría del token de autenticación
        const userId = localStorage.getItem('userId') || '507f1f77bcf86cd799439011'; // ID simulado
        if (userId) {
            config.headers['user-id'] = userId;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance
