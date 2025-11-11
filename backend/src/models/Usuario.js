import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  correo: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  carrera: { type: String, required: true, trim: true },
  rut: { type: String, required: true, unique: true, trim: true },
}, { timestamps: true });

userSchema.methods.comparePassword = function(candidate) {
  return candidate === this.password;
};

export default mongoose.model('Usuario', userSchema);