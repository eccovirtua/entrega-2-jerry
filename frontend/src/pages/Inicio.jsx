import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import styles from './Inicio.module.css';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('user');
    if (usuarioGuardado) {
      setUser(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        {!cargando && (
          <>
            <h1 className={styles.title}>
              {user ? `Bienvenido, ${user.nombre}` : 'Bienvenido al Sistema de Gestión de Prácticas'}
            </h1>
            <p className={styles.subtitle}>
              Aquí podrás gestionar tus prácticas laborales y profesionales de forma ágil,
              organizada y accesible desde cualquier dispositivo.
            </p>
            <div className={styles.buttonGroup}>
              {!user && (
                <>
                  <button
                    className={styles.button}
                    onClick={() => navigate('/login')}
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => navigate('/registrar')}
                  >
                    Registrarse
                  </button>
                </>
              )}
              {user && (
                <button
                  className={styles.button}
                  onClick={() => navigate('/registro')}
                >
                  + Registrar Práctica
                </button>
              )}
            </div>
          </>
        )}
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2 className={styles.cardTitleRed}>
              <span>📌</span> Problema
            </h2>
            <p className={styles.cardText}>
              Actualmente, la gestión de prácticas se realiza con planillas manuales que generan duplicidad de datos y errores.
            </p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitleGreen}>
              <span>✅</span> Solución
            </h2>
            <p className={styles.cardText}>
              Con este sistema, centralizamos la información, permitimos registro en línea y evaluaciones digitales.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Inicio;