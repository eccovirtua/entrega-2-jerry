import React from 'react';

const Header = () => {
    const activePath = 'reportes.html'; // Simulación de la ruta activa

    // Las clases de Tailwind reemplazan tu CSS original
    return (
        <header className="flex flex-wrap items-center justify-between bg-blue-900 p-4 shadow-md md:p-6">
            <div className="logo flex items-center gap-2">
                <h1 className="text-xl font-bold text-white md:text-2xl">Reporte de Prácticas</h1>
            </div>

            <nav className="mt-2 w-full md:mt-0 md:w-auto">
                <ul className="flex flex-col items-center gap-3 list-none p-0 md:flex-row md:gap-5">
                    {/* Reemplaza <a> con un componente de Link de tu router (ej: <Link> de react-router-dom) */}
                    {['index.html', 'login.html', 'registro.html', 'documentos.html', 'reportes.html'].map((link) => (
                        <li key={link}>
                            <a
                                href={link} // Esto debería ser un componente Link en una app con Router
                                className={`font-semibold text-white no-underline transition duration-200 hover:underline 
                                            ${link === activePath ? 'underline' : ''}`}
                            >
                                {link.replace('.html', '').charAt(0).toUpperCase() + link.replace('.html', '').slice(1)}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;