import mongoose from 'mongoose';

const practicaSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userSnapshot: {
    nombre: String,
    correo: String,
    rut: String,
    carrera: String,
  },
  empresa: { type: String, required: true, trim: true },
  nombreJefe: { type: String, required: true, trim: true },
  telefonoEmpresa: { type: String, required: true, trim: true },
  correoEmpresa: { type: String, required: true, trim: true },
  tipoPractica: { type: String, enum: ['laboral','profesional'], default: 'laboral' },
  fechaInicio: { type: Date, required: true },
}, { timestamps: true });

practicaSchema.pre('save', async function(next) {
  if (this.isModified('user') && !this.userSnapshot) {
    const User = mongoose.model('User');
    const u = await User.findById(this.user).select('nombre correo rut carrera').lean();
    if (u) {
      this.userSnapshot = { nombre: u.nombre, correo: u.correo, rut: u.rut, carrera: u.carrera };
    }
  }
  next();
});

export default mongoose.model('Practica', practicaSchema);