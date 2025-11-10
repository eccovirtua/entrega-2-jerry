import mongoose from 'mongoose';

/*
 * Esquema de Mongoose para los Reportes Semestrales.
 * Define la estructura de los documentos en la colección 'reportes'.
 */
const reporteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    estudiantes: {
        type: Number,
        required: true
    },
    notaPromedio: {
        type: Number,
        required: true
    },
    // Datos para el gráfico de barras
    datosGrafico: {
        type: [Number], // Un array de números
        required: true
    },
    // Etiquetas para ese gráfico
    labelsGrafico: {
        type: [String], // Un array de strings
        default: ["Enero", "Febrero", "Marzo", "Abril"] // Valor por defecto
    }
}, {
    timestamps: true // Crea campos createdAt y updatedAt automáticamente
});

// Exportamos el modelo para que el controlador pueda usarlo
export default mongoose.model('Reporte', reporteSchema);