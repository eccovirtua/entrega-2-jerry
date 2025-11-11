import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import styles from './Inicio.module.css';

function validarRut(rut) {
  return /^[0-9]{7,8}-[0-9kK]$/.test(rut);
}

function validarCorreo(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

const Registrar = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    rut: '',
    carrera: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setExito('');
    setCargando(true);

    // Validaciones
    if (!formData.nombre.trim()) {
      setError('El nombre es requerido');
      setCargando(false);
      return;
    }

    if (!validarRut(formData.rut)) {
      setError('RUT inválido. Formato: 12345678-9');
      setCargando(false);
      return;
    }

    if (!validarCorreo(formData.correo)) {
      setError('Correo inválido');
      setCargando(false);
      return;
    }

    if (!formData.carrera.trim()) {
      setError('La carrera es requerida');
      setCargando(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setCargando(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setCargando(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          correo: formData.correo,
          rut: formData.rut,
          carrera: formData.carrera,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al registrarse');
        return;
      }

      setExito('¡Registro exitoso! Redirigiendo al login...');
      setFormData({
        nombre: '',
        correo: '',
        rut: '',
        carrera: '',
        password: '',
        confirmPassword: '',
      });

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <div className={styles.loginBox}>
          <h2 className={styles.loginTitle}>
            Registrarse
          </h2>
          <form onSubmit={handleSubmit}>
            <label className={styles.loginLabel}>
              Nombre completo:
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Juan Pérez"
                className={styles.loginInput}
                disabled={cargando}
              />
            </label>

            <label className={styles.loginLabel}>
              RUT:
              <input
                type="text"
                name="rut"
                value={formData.rut}
                onChange={handleChange}
                placeholder="12345678-9"
                className={styles.loginInput}
                disabled={cargando}
              />
            </label>

            <label className={styles.loginLabel}>
              Correo:
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                className={styles.loginInput}
                disabled={cargando}
              />
            </label>

            <label className={styles.loginLabel}>
              Carrera:
              <input
                type="text"
                name="carrera"
                value={formData.carrera}
                onChange={handleChange}
                placeholder="ej: Ingeniería en Informática"
                className={styles.loginInput}
                disabled={cargando}
              />
            </label>

            <label className={styles.loginLabel}>
              Contraseña:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.loginInput}
                disabled={cargando}
              />
            </label>

            <label className={styles.loginLabel}>
              Confirmar contraseña:
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={styles.loginInput}
                disabled={cargando}
              />
            </label>

            {error && (
              <div className={styles.loginError}>
                {error}
              </div>
            )}

            {exito && (
              <div style={{ color: 'green', marginBottom: '1rem', textAlign: 'center' }}>
                {exito}
              </div>
            )}

            <button
              type="submit"
              className={styles.button}
              style={{ width: '100%', marginBottom: '1rem' }}
              disabled={cargando}
            >
              {cargando ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>

          <div className={styles.loginForgot}>
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className={styles.loginLink}>
              Inicia sesión aquí
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Registrar;