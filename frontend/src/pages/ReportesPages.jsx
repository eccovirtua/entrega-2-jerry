import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


// // Componentes de la estructura
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import styles from './Inicio.module.css';

// Datos numericos tabla
const datosSemestres = {
    1: [70, 10, 20, 40],
    2: [15, 55, 35, 75],
    3: [5, 15, 75, 15]
};

const ReportesPage = () => {

    // inicializa toda la tabla y el semestre activo en null
    const [semestreActivo, setSemestreActivo] = useState(null);
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    // Los datos de la tabla
    const datosTabla = [
        { id: 1, nombre: "Semestre 2025-1", estudiantes: 120, notas: 5.1 },
        { id: 2, nombre: "Semestre 2025-2", estudiantes: 115, notas: 5.4 },
        { id: 3, nombre: "Semestre 2026-1", estudiantes: 130, notas: 5.3 },
    ];


    useEffect(() => {

        if (chartInstanceRef.current) {
            // Destruye el gráfico anterior si existe
            chartInstanceRef.current.destroy();
        }

        // si el grafico seleccionado conincide con semestreActivo
        if (semestreActivo && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            //le aplica los datos
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

        //limpieza de use effect garantizando que el grafico se destruya correctamente para evitar perdidas de memoria
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [semestreActivo]); //solo cuando el valor de semestreActivo cambia

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
                        <canvas id="reportChart" ref={chartRef}>
                            {/*llamada a la variable useRef para que lo guarde en chartRef.current*/}

                        </canvas>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ReportesPage;
