import axiosInstance from './axios.js';

// Obtener todos los documentos
export const getDocumentos = async () => {
  try {
    const response = await axiosInstance.get('/documentos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    throw error;
  }
};

// Subir un nuevo documento
export const subirDocumento = async (alumno, archivo) => {
  try {
    const formData = new FormData();
    formData.append('alumno', alumno);
    formData.append('documento', archivo);

    const response = await axiosInstance.post('/documentos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al subir documento:', error);
    throw error;
  }
};

// Descargar un documento
export const descargarDocumento = async (id, nombreArchivo) => {
  try {
    const response = await axiosInstance.get(`/documentos/descargar/${id}`, {
      responseType: 'blob',
    });
    
    // Crear un enlace temporal para descargar el archivo
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', nombreArchivo);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al descargar documento:', error);
    throw error;
  }
};

// Eliminar un documento
export const eliminarDocumento = async (id) => {
  try {
    const response = await axiosInstance.delete(`/documentos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar documento:', error);
    throw error;
  }
};