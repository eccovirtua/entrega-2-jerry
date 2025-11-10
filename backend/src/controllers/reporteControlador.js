import Reporte from '../models/reporteModel.js';

/*
 * Función de "seeding" (semilla).
 * Se usa para poblar la base de datos si está vacía.
 * Así tendrás datos para mostrar en el frontend la primera vez.
 */
const seedDatosIniciales = async () => {
    try {
        const datosSemilla = [
            {
                nombre: "Semestre 2025-1",
                estudiantes: 120,
                notaPromedio: 5.1,
                datosGrafico: [70, 10, 20, 40]
            },
            {
                nombre: "Semestre 2025-2",
                estudiantes: 115,
                notaPromedio: 5.4,
                datosGrafico: [15, 55, 35, 75]
            },
            {
                nombre: "Semestre 2026-1",
                estudiantes: 130,
                notaPromedio: 5.3,
                datosGrafico: [5, 15, 75, 15]
            },
        ];

        // Inserta los datos semilla en la colección 'reportes'
        await Reporte.insertMany(datosSemilla);
        console.log(">>> Base de datos poblada con datos de reportes.");
    } catch (error) {
        console.error("Error poblando la base de datos:", error);
    }
};

/*
 * Controlador para OBTENER TODOS los reportes (para la tabla).
 * Se conectará a MongoDB y buscará los documentos.
 */
export const getReportes = async (req, res) => {
    try {
        // Usamos Mongoose (find()) para buscar TODOS los reportes
        let reportes = await Reporte.find().select('nombre estudiantes notaPromedio');

        // Si la base de datos está vacía, la poblamos por primera vez
        if (reportes.length === 0) {
            await seedDatosIniciales();
            // Volvemos a buscar los datos después de poblarlos
            reportes = await Reporte.find().select('nombre estudiantes notaPromedio');
        }

        res.json(reportes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener reportes de MongoDB", error });
    }
};

/*
 * Controlador para OBTENER LOS DATOS DE UN GRÁFICO (por ID).
 * Se conectará a MongoDB y buscará UN documento por su ID.
 */
export const getGraficoReporte = async (req, res) => {
    try {
        const { id } = req.params; // Obtenemos el ID de la URL

        // Usamos Mongoose (findById()) para buscar un reporte específico
        const reporte = await Reporte.findById(id).select('nombre datosGrafico labelsGrafico');

        if (!reporte) {
            return res.status(404).json({ message: "Reporte no encontrado" });
        }

        // Devolvemos solo los datos necesarios para el gráfico
        res.json({
            nombre: reporte.nombre,
            datosGrafico: reporte.datosGrafico,
            labelsGrafico: reporte.labelsGrafico
        });

    } catch (error) {
        res.status(500).json({ message: "Error al obtener datos del gráfico", error });
    }
};