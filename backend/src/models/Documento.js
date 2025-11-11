import mongoose from 'mongoose';

const documentoSchema = new mongoose.Schema({
  alumno: { type: String, required: true, trim: true },
  nombreArchivo: { type: String, required: true, trim: true },
  rutaArchivo: { type: String, required: true },
  fechaSubida: { type: Date, default: Date.now },
  subidoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
}, { timestamps: true });

export default mongoose.model('Documento', documentoSchema);