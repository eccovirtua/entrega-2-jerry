import React, { useState } from "react";
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

/**
 * Página de administración de documentos de práctica
 */
const DocumentosPage = () => {
  // Estado para la lista de documentos
  const [documentos, setDocumentos] = useState([
    // Documento de ejemplo inicial
    { alumno: "Juan Pérez", nombre: "Informe Práctica.pdf", fecha: "2025-09-01" },
  ]);

  // Estados del formulario
  const [alumno, setAlumno] = useState("");
  const [file, setFile] = useState(null);
  const [mensaje, setMensaje] = useState("");

  // Maneja la subida de documentos
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!alumno.trim()) {
      setMensaje("Por favor ingresa el nombre del alumno.");
      return;
    }
    
    if (!file || file.type !== "application/pdf") {
      setMensaje("Por favor selecciona un archivo PDF válido.");
      return;
    }

    // Agregar documento
    const fecha = new Date().toISOString().split("T")[0];
    const nuevoDoc = { alumno, nombre: file.name, fecha };
    setDocumentos(prev => [...prev, nuevoDoc]);
    
    // Mensaje de éxito y limpieza
    setMensaje("Documento subido correctamente (simulado, no se guarda en el servidor).");
    setAlumno("");
    setFile(null);
    // Limpiar input file
    const fileInput = document.getElementById("documento-input");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {/* Título y descripción */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Repositorio de Documentos de Práctica
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Descarga y carga de informes en PDF asociados a los alumnos. 
          Solo docentes y coordinadores pueden subir documentos.
        </p>

        {/* TABLA DE DOCUMENTOS */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <table className="min-w-full">
            <thead className="bg-blue-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alumno
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documento
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documentos.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-400">
                    No hay documentos subidos.
                  </td>
                </tr>
              ) : (
                documentos.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">
                      {doc.alumno}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      <div className="flex items-center space-x-2">
                        <span className="text-red-500">📄</span>
                        <span>{doc.nombre}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {doc.fecha}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium">
                      <a
                        href="#"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                        download
                      >
                        Descargar
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* FORMULARIO DE SUBIDA */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Subir nuevo informe (PDF)
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="alumno" className="block text-sm font-medium text-gray-700 mb-1">
                Alumno:
              </label>
              <input
                type="text"
                id="alumno"
                value={alumno}
                onChange={(e) => setAlumno(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nombre completo del alumno"
                required
              />
            </div>

            <div>
              <label htmlFor="documento-input" className="block text-sm font-medium text-gray-700 mb-1">
                Selecciona PDF:
              </label>
              <input
                type="file"
                id="documento-input"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Subir Documento
            </button>
          </form>

          {/* Mensaje de estado */}
          {mensaje && (
            <div className={`mt-4 p-3 rounded-md ${
              mensaje.includes("correctamente")
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {mensaje}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DocumentosPage;
