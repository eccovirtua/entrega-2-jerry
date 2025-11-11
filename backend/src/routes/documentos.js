import { Router } from 'express';
import { 
  getDocumentos, 
  subirDocumento, 
  descargarDocumento, 
  eliminarDocumento,
  upload 
} from '../controllers/documentoControlador.js';
import { authMiddleware } from '../controllers/authControlador.js';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Middleware para manejar errores de multer
const handleMulterError = (err, req, res, next) => {
  if (err) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'El archivo es demasiado grande. Máximo 10MB.' });
    }
    if (err.message === 'Solo se permiten archivos PDF') {
      return res.status(400).json({ message: 'Solo se permiten archivos PDF.' });
    }
    return res.status(400).json({ message: err.message });
  }
  next();
};

// GET /api/documentos - Obtener todos los documentos
router.get('/', getDocumentos);

// POST /api/documentos - Subir un nuevo documento
router.post('/', upload.single('documento'), handleMulterError, subirDocumento);

// GET /api/documentos/descargar/:id - Descargar un documento
router.get('/descargar/:id', descargarDocumento);

// DELETE /api/documentos/:id - Eliminar un documento
router.delete('/:id', eliminarDocumento);

export default router;
