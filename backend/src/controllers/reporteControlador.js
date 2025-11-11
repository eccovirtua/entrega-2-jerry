import Reporte from '../models/reporteModel.js';


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

        // Intentamos insertar los 3 documentos
        await Reporte.insertMany(datosSemilla);
        console.log(">>> Base de datos poblada con datos de reportes.");

    } catch (error) {

        // El código 11000 es "E11000 duplicate key error" (error de llave duplicada).
5
        if (error.code === 11000) {

            // Esto es un "error" esperado. Significa que los datos ya existen.
            // Lo ignoramos y continuamos con éxito.
            // console.log(">>> Los datos semilla ya existen.");
            
        } else {
            // Si es un error diferente, sí lo mostramos.
            console.error("Error poblando la base de datos:", error);
        }
    }
};

/*
 * Controlador para OBTENER TODOS los reportes (para la tabla).
 */
export const getReportes = async (req, res) => {
    try {
        // 1. Siempre llamamos a la función semilla.
        //    (Es segura, solo insertará si la BD está vacía).
        await seedDatosIniciales();

        // 2. Buscamos los reportes (ahora garantizado que solo hay 3).
        const reportes = await Reporte.find({}, 'nombre estudiantes notaPromedio');

        res.json(reportes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener reportes de MongoDB", error });
    }
};

/*
 * Controlador para OBTENER LOS DATOS DE UN GRÁFICO (por ID).
 * (Esta función no cambia)
 */
export const getGraficoReporte = async (req, res) => {
    try {
        const { id } = req.params;

        const reporte = await Reporte.findById(id, 'nombre datosGrafico labelsGrafico');

        if (!reporte) {
            return res.status(404).json({ message: "Reporte no encontrado" });
        }

        res.json({
            nombre: reporte.nombre,
            datosGrafico: reporte.datosGrafico,
            labelsGrafico: reporte.labelsGrafico
        });

    } catch (error) {
        res.status(500).json({ message: "Error al obtener datos del gráfico", error });
    }
};