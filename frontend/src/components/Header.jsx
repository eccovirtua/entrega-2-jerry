import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        // Verificar si hay usuario en localStorage
        const usuarioGuardado = localStorage.getItem('user');
        if (usuarioGuardado) {
            setUser(JSON.parse(usuarioGuardado));
        }
        setCargando(false);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/';
    };

    const navItems = [
        { name: 'Inicio', path: '/' },
        { name: 'Reportes', path: '/reportes' },
        { name: 'Documentos', path: '/documentos' },
    ];

    return (
        <header className="flex flex-wrap items-center justify-between bg-blue-900 p-4 shadow-md md:p-6">
            <div className="logo flex items-center gap-2">
                <img src="/public/assets/logo.png" alt="Logo" style={{ width: 200 }}/>
                <h1 className="text-xl font-bold text-white md:text-2xl">Reporte de Prácticas</h1>
            </div>

            <nav className="mt-2 w-full md:mt-0 md:w-auto">
                <ul className="flex flex-col items-center gap-3 list-none p-0 md:flex-row md:gap-5">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.path}
                                className={`font-semibold text-white no-underline transition duration-200 hover:underline 
                                            ${location.pathname === item.path ? 'underline font-extrabold' : ''}`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}

                    {!cargando && (
                        <>
                            {user ? (
                                <>
                                    <li>
                                        <span className="font-semibold text-white">
                                            👤 {user.nombre}
                                        </span>
                                    </li>
                                    <li>
                                        <Link
                                            to="/registro"
                                            className={`font-semibold text-white no-underline transition duration-200 hover:underline 
                                                        ${location.pathname === '/registro' ? 'underline font-extrabold' : ''}`}
                                        >
                                            + Registrar Práctica
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="font-semibold text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition duration-200"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            to="/registrar"
                                            className={`font-semibold text-white no-underline transition duration-200 hover:underline 
                                                        ${location.pathname === '/registrar' ? 'underline font-extrabold' : ''}`}
                                        >
                                            Registrarse
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/login"
                                            className={`font-semibold text-white no-underline transition duration-200 hover:underline 
                                                        ${location.pathname === '/login' ? 'underline font-extrabold' : ''}`}
                                        >
                                            Login
                                        </Link>
                                    </li>
                                </>
                            )}
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;