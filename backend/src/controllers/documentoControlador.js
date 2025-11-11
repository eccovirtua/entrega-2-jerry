import Documento from '../models/Documento.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar multer para subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos PDF'), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB máximo
});

// Obtener todos los documentos
export const getDocumentos = async (req, res) => {
  try {
    const documentos = await Documento.find().populate('subidoPor', 'nombre correo');
    res.json(documentos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Subir un documento
export const subirDocumento = async (req, res) => {
  try {
    const { alumno } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha subido ningún archivo' });
    }

    const nuevoDocumento = new Documento({
      alumno,
      nombreArchivo: req.file.originalname,
      rutaArchivo: req.file.path,
      subidoPor: req.user.id // Asumiendo que hay middleware de autenticación
    });

    const documentoGuardado = await nuevoDocumento.save();
    res.status(201).json(documentoGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Descargar un documento
export const descargarDocumento = async (req, res) => {
  try {
    const documento = await Documento.findById(req.params.id);
    
    if (!documento) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }

    if (!fs.existsSync(documento.rutaArchivo)) {
      return res.status(404).json({ message: 'Archivo no encontrado en el servidor' });
    }

    res.download(documento.rutaArchivo, documento.nombreArchivo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un documento
export const eliminarDocumento = async (req, res) => {
  try {
    const documento = await Documento.findById(req.params.id);
    
    if (!documento) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }

    // Eliminar archivo del sistema de archivos
    if (fs.existsSync(documento.rutaArchivo)) {
      fs.unlinkSync(documento.rutaArchivo);
    }

    await Documento.findByIdAndDelete(req.params.id);
    res.json({ message: 'Documento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { upload };