import React, { useState } from "react";
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import styles from './Inicio.module.css';

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
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <div className={styles.docContainer}>
          <h1 className={styles.docTitle}>
            Repositorio de Documentos de Práctica
          </h1>
          <p className={styles.docSubtitle}>
            Descarga y carga de informes en PDF asociados a los alumnos. 
            Solo docentes y coordinadores pueden subir documentos.
          </p>

          {/* TABLA DE DOCUMENTOS */}
          <div className={styles.docTableWrapper}>
            <table className={styles.docTable}>
              <thead>
                <tr>
                  <th>Alumno</th>
                  <th>Documento</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {documentos.length === 0 ? (
                  <tr>
                    <td colSpan="4" className={styles.docTableEmpty}>
                      No hay documentos subidos.
                    </td>
                  </tr>
                ) : (
                  documentos.map((doc, idx) => (
                    <tr key={idx} className={styles.docTableRow}>
                      <td>{doc.alumno}</td>
                      <td>
                        <span className={styles.docIcon}>📄</span>
                        <span>{doc.nombre}</span>
                      </td>
                      <td>{doc.fecha}</td>
                      <td>
                        <a
                          href="#"
                          className={styles.button}
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
          <div className={styles.docFormBox}>
            <h2 className={styles.docFormTitle}>
              Subir nuevo informe (PDF)
            </h2>
            <form onSubmit={handleSubmit} className={styles.docForm}>
              <div>
                <label htmlFor="alumno" className={styles.loginLabel}>
                  Alumno:
                </label>
                <input
                  type="text"
                  id="alumno"
                  value={alumno}
                  onChange={(e) => setAlumno(e.target.value)}
                  className={styles.loginInput}
                  placeholder="Nombre completo del alumno"
                  required
                />
              </div>
              <div>
                <label htmlFor="documento-input" className={styles.loginLabel}>
                  Selecciona PDF:
                </label>
                <input
                  type="file"
                  id="documento-input"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                  className={styles.loginInput}
                  required
                />
              </div>
              <button
                type="submit"
                className={styles.button}
                style={{ width: '100%' }}
              >
                Subir Documento
              </button>
            </form>
            {mensaje && (
              <div className={
                mensaje.includes("correctamente")
                  ? styles.successMsg
                  : styles.errorMsg
              }>
                {mensaje}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DocumentosPage;
