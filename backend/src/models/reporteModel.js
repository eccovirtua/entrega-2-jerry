import mongoose from 'mongoose';

const reporteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    estudiantes: {
        type: Number,
        required: true
    },
    notaPromedio: {
        type: Number,
        required: true
    },
    datosGrafico: {
        type: [Number],
        required: true
    },
    labelsGrafico: {
        type: [String],
        default: ["Enero", "Febrero", "Marzo", "Abril"]
    }
}, {
    timestamps: true
});

export default mongoose.model('Reporte', reporteSchema);