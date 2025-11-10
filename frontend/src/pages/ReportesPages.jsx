import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import styles from './Inicio.module.css';

// 1. IMPORTAMOS LAS NUEVAS FUNCIONES DE API
import { getReportesRequest, getGraficoRequest } from '../api/reportes.js';

const ReportesPage = () => {

    const [semestreActivo, setSemestreActivo] = useState(null); // Guardará el _id de Mongo
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    // 2. Estado para guardar los datos que vienen de MongoDB
    const [datosTabla, setDatosTabla] = useState([]);
    const [error, setError] = useState(null); // Estado para manejar errores

    // 3. useEffect para cargar la TABLA (se ejecuta 1 vez al cargar la página)
    useEffect(() => {
        async function cargarReportes() {
            try {
                const res = await getReportesRequest(); // Llama a GET /api/reportes
                setDatosTabla(res.data); // Guarda los datos de Mongo en el estado
            } catch (error) {
                console.error("Error cargando reportes:", error);
                setError("No se pudieron cargar los datos de la tabla.");
            }
        }
        cargarReportes();
    }, []); // El [] vacío asegura que solo se ejecute al montar

    // 4. useEffect para cargar el GRÁFICO (se ejecuta CADA VEZ que 'semestreActivo' cambia)
    useEffect(() => {
        // Destruye el gráfico anterior
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        // Función asíncrona para buscar los datos del gráfico
        async function cargarGrafico() {
            // Solo se ejecuta si hay un ID de semestre activo
            if (semestreActivo && chartRef.current) {
                try {
                    // Llama a GET /api/reportes/ID_DE_MONGO/grafico
                    const res = await getGraficoRequest(semestreActivo);

                    const ctx = chartRef.current.getContext('2d');

                    // Crea el gráfico con los datos de la respuesta de MongoDB
                    chartInstanceRef.current = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: res.data.labelsGrafico, // <-- Dato de Mongo
                            datasets: [{
                                label: `Reporte ${res.data.nombre}`, // <-- Dato de Mongo
                                data: res.data.datosGrafico,       // <-- Dato de Mongo
                                backgroundColor: "rgba(54, 162, 235, 0.6)",
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                                legend: { display: true }
                            }
                        }
                    });

                } catch (error) {
                    console.error("Error cargando gráfico:", error);
                    setError("No se pudieron cargar los datos del gráfico.");
                }
            }
        }

        cargarGrafico(); // Llama a la función

        // Limpieza del efecto
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [semestreActivo]); // Depende de 'semestreActivo'

    // 5. El handler ahora guarda el _id de Mongo
    const handleClickSemestre = (id) => {
        setSemestreActivo(id);
    };


    return (
        <div className={styles.root}>
            <Header />
            <main className={styles.main}>
                <section className={styles.reportSection}>
                    {/* Mensaje de error si algo falla */}
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <table className={styles.reportTable}>
                        <thead>
                        <tr className={styles.reportTableHeadRow}>
                            <th className={styles.reportTableHead}>Semestre</th>
                            <th className={styles.reportTableHead}>Estudiantes</th>
                            <th className={styles.reportTableHead}>Notas promedio</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* 6. Renderizamos la tabla usando los datos del estado 'datosTabla' */}
                        {datosTabla.map((data, idx) => (
                            <tr
                                key={data._id} // <-- Usamos el _id de Mongo como key
                                className={[
                                    styles.reportTableRow,
                                    semestreActivo === data._id ? styles.reportTableRowActive : '', // <-- Comparamos con _id
                                    idx % 2 === 0 ? styles.reportTableRowOdd : styles.reportTableRowEven
                                ].join(' ')}
                            >
                                <td
                                    className={styles.reportTableLink}
                                    onClick={() => handleClickSemestre(data._id)} // <-- Pasamos el _id de Mongo
                                    data-semestre={data._id}
                                >
                                    {data.nombre}
                                </td>
                                <td className={styles.reportTableCell}>{data.estudiantes}</td>
                                <td className={styles.reportTableCell}>{data.notaPromedio}</td> {/* <-- Campo del modelo Mongo */}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>

                <section className={styles.reportChartSection}>
                    <h2 className={styles.reportChartTitle}>
                        {/* 7. El título es dinámico */}
                        Gráfico del Semestre {semestreActivo ? '' : '(Selecciona uno)'}
                    </h2>
                    <div className={styles.reportChartBox}>
                        <canvas id="reportChart" ref={chartRef}></canvas>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ReportesPage;