import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const navItems = [
        { name: 'Inicio', path: '/' },
        { name: 'Reportes', path: '/reportes' },
        { name: 'Login', path: '/login' },
        { name: 'Registro', path: '/registro' },
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
                </ul>
            </nav>
        </header>
    );
};

export default Header;