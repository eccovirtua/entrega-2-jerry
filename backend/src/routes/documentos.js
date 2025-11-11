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

// GET /api/documentos - Obtener todos los documentos
router.get('/', getDocumentos);

// POST /api/documentos - Subir un nuevo documento
router.post('/', upload.single('documento'), subirDocumento);

// GET /api/documentos/descargar/:id - Descargar un documento
router.get('/descargar/:id', descargarDocumento);

// DELETE /api/documentos/:id - Eliminar un documento
router.delete('/:id', eliminarDocumento);

export default router;