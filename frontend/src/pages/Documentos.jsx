import React, { useState, useEffect } from "react";
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import styles from './Inicio.module.css';
import { getDocumentos, subirDocumento, descargarDocumento, eliminarDocumento } from '../api/documentos.js';

/**
 * Página de administración de documentos de práctica
 */
const DocumentosPage = () => {
  // Estado para la lista de documentos
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados del formulario
  const [alumno, setAlumno] = useState("");
  const [file, setFile] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [uploading, setUploading] = useState(false);

  // Cargar documentos al montar el componente
  useEffect(() => {
    cargarDocumentos();
  }, []);

  const cargarDocumentos = async () => {
    try {
      setLoading(true);
      const docs = await getDocumentos();
      setDocumentos(docs);
    } catch (error) {
      setMensaje("Error al cargar documentos: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Maneja la subida de documentos
  const handleSubmit = async (e) => {
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

    try {
      setUploading(true);
      setMensaje("");
      
      // Subir documento al backend
      await subirDocumento(alumno, file);
      
      // Recargar la lista de documentos
      await cargarDocumentos();
      
      // Mensaje de éxito y limpieza
      setMensaje("Documento subido correctamente.");
      setAlumno("");
      setFile(null);
      
      // Limpiar input file
      const fileInput = document.getElementById("documento-input");
      if (fileInput) fileInput.value = "";
      
    } catch (error) {
      setMensaje("Error al subir documento: " + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  // Manejar descarga de documentos
  const handleDescargar = async (documento) => {
    try {
      await descargarDocumento(documento._id, documento.nombreArchivo);
    } catch (error) {
      setMensaje("Error al descargar documento: " + (error.response?.data?.message || error.message));
    }
  };

  // Manejar eliminación de documentos
  const handleEliminar = async (documento) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el documento "${documento.nombreArchivo}" de ${documento.alumno}?`)) {
      try {
        await eliminarDocumento(documento._id);
        setMensaje("Documento eliminado correctamente.");
        // Recargar la lista de documentos
        await cargarDocumentos();
      } catch (error) {
        setMensaje("Error al eliminar documento: " + (error.response?.data?.message || error.message));
      }
    }
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
            {loading ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                Cargando documentos...
              </div>
            ) : (
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
                    documentos.map((doc) => (
                      <tr key={doc._id} className={styles.docTableRow}>
                        <td>{doc.alumno}</td>
                        <td>
                          <span className={styles.docIcon}>📄</span>
                          <span>{doc.nombreArchivo}</span>
                        </td>
                        <td>{new Date(doc.fechaSubida).toLocaleDateString()}</td>
                        <td>
                          <button
                            onClick={() => handleDescargar(doc)}
                            className={styles.button}
                            style={{ marginRight: '8px' }}
                          >
                            Descargar
                          </button>
                          <button
                            onClick={() => handleEliminar(doc)}
                            className={styles.button}
                            style={{ 
                              backgroundColor: '#dc3545',
                              borderColor: '#dc3545'
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
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
                disabled={uploading}
              >
                {uploading ? 'Subiendo...' : 'Subir Documento'}
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
