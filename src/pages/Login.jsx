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

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setError('');

    const esRut = validarRut(usuario);
    const esCorreo = validarCorreo(usuario);

    if (!esRut && !esCorreo) {
      setError('Ingrese un RUT o correo válido.');
      return;
    }
    if (!contrasena || contrasena.length < 6) {
      setError('Ingrese una contraseña válida (mínimo 6 caracteres).');
      return;
    }
    // Aquí iría la lógica de autenticación real
    alert('¡Inicio de sesión exitoso!');
  };

  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <div className={styles.loginBox}>
          <h2 className={styles.loginTitle}>
            Iniciar Sesión
          </h2>
          <form onSubmit={handleSubmit}>
            <label className={styles.loginLabel}>
              Usuario (RUT o correo):
              <input
                type="text"
                value={usuario}
                onChange={e => setUsuario(e.target.value)}
                placeholder="ej: 12345678-9 o correo@dominio.com"
                className={styles.loginInput}
              />
            </label>
            <label className={styles.loginLabel}>
              Contraseña:
              <input
                type="password"
                value={contrasena}
                onChange={e => setContrasena(e.target.value)}
                className={styles.loginInput}
              />
            </label>
            {error && (
              <div className={styles.loginError}>
                {error}
              </div>
            )}
            <button
              type="submit"
              className={styles.button}
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              Ingresar
            </button>
          </form>
          <div className={styles.loginForgot}>
            ¿Olvidaste tu contraseña?{' '}
            <a href="#" className={styles.loginLink}>
              Recupérala aquí
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;