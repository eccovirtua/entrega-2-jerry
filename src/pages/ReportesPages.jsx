import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


// // Componentes de la estructura
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

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

        <div className="min-h-screen bg-gray-50 font-sans">
            <Header /> {

        }
            <main>
                <section className="mx-auto my-8 max-w-4xl p-4">
                    <table className="min-w-full border-collapse overflow-hidden rounded-lg shadow-lg">
                        <thead>
                        <tr className="bg-gray-700 text-white">
                            <th className="p-3 text-center">Semestre</th>
                            <th className="p-3 text-center">Estudiantes</th>
                            <th className="p-3 text-center">Notas promedio</th>
                        </tr>
                        </thead>
                        <tbody>
                        {datosTabla.map((data) => (
                            <tr
                                key={data.id}
                                className={`border-b border-gray-200 transition duration-150 ease-in-out
                                               ${semestreActivo === data.id ? 'bg-blue-100' : 'hover:bg-gray-100'}
                                               ${data.id % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                            >
                                <td
                                    className="cursor-pointer p-3 text-center font-bold text-blue-600 underline hover:text-blue-800"
                                    onClick={() => handleClickSemestre(data.id)}
                                    data-semestre={data.id}
                                >
                                    {data.nombre}
                                </td>
                                <td className="p-3 text-center">{data.estudiantes}</td>
                                <td className="p-3 text-center">{data.notas}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>

                <section className="mx-auto my-12 max-w-4xl p-4 text-center">
                    <h2 className="mb-4 text-xl font-semibold">Gráfico del Semestre {semestreActivo || '(Selecciona uno)'}</h2>
                    <div className="rounded-lg bg-white p-4 shadow-lg">
                        <canvas id="reportChart" ref={chartRef}></canvas>
                    </div>
                </section>
            </main>
            <Footer /> {
        }
        </div>
    );
};

export default ReportesPage;
