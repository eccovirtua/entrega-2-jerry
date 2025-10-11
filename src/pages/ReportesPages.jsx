import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


// // Componentes de la estructura
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import styles from './Inicio.module.css';

// Datos de ejemplo
const datosSemestres = {
    1: [70, 10, 20, 40],
    2: [15, 55, 35, 75],
    3: [5, 15, 75, 15]
};

const ReportesPage = () => {
    // 1. Estado para el semestre activo
    const [semestreActivo, setSemestreActivo] = useState(null);
    // 2. Referencia para el elemento <canvas> y la instancia del gráfico
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    // Los datos de la tabla
    const datosTabla = [
        { id: 1, nombre: "Semestre 2025-1", estudiantes: 120, notas: 5.1 },
        { id: 2, nombre: "Semestre 2025-2", estudiantes: 115, notas: 5.4 },
        { id: 3, nombre: "Semestre 2026-1", estudiantes: 130, notas: 5.3 },
    ];

    // Lógica para inicializar y actualizar el gráfico
    useEffect(() => {
        // La primera vez que se carga, o si cambia semestreActivo

        if (chartInstanceRef.current) {
            // Destruye el gráfico anterior si existe
            chartInstanceRef.current.destroy();
        }

        if (semestreActivo && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            const datos = datosSemestres[semestreActivo];

            // Crea el nuevo gráfico y guarda la instancia en la referencia
            chartInstanceRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Enero", "Febrero", "Marzo", "Abril"],
                    datasets: [{
                        label: `Reporte Semestre ${semestreActivo}`,
                        data: datos,
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
        }

        // Función de limpieza de useEffect (destruye el gráfico al desmontar el componente)
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [semestreActivo]); // Se ejecuta cuando cambia el semestre activo

    const handleClickSemestre = (id) => {
        setSemestreActivo(id);
    };


    return (
        <div className={styles.root}>
            <Header />
            <main className={styles.main}>
                <section className={styles.reportSection}>
                    <table className={styles.reportTable}>
                        <thead>
                            <tr className={styles.reportTableHeadRow}>
                                <th className={styles.reportTableHead}>Semestre</th>
                                <th className={styles.reportTableHead}>Estudiantes</th>
                                <th className={styles.reportTableHead}>Notas promedio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datosTabla.map((data, idx) => (
                                <tr
                                    key={data.id}
                                    className={[
                                        styles.reportTableRow,
                                        semestreActivo === data.id ? styles.reportTableRowActive : '',
                                        idx % 2 === 0 ? styles.reportTableRowOdd : styles.reportTableRowEven
                                    ].join(' ')}
                                >
                                    <td
                                        className={styles.reportTableLink}
                                        onClick={() => handleClickSemestre(data.id)}
                                        data-semestre={data.id}
                                    >
                                        {data.nombre}
                                    </td>
                                    <td className={styles.reportTableCell}>{data.estudiantes}</td>
                                    <td className={styles.reportTableCell}>{data.notas}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className={styles.reportChartSection}>
                    <h2 className={styles.reportChartTitle}>
                        Gráfico del Semestre {semestreActivo || '(Selecciona uno)'}
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
