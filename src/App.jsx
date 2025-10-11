import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportesPage from './pages/ReportesPages.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <div className="text-center mt-20"><h1>Página de Inicio (Landing)</h1></div> /* texto por mientras de pagina inicial */
                } />

                <Route path="/reportes" element={<ReportesPage />} />

                <Route path="/login" element={<div>Página de Login</div>} />
                <Route path="/registro" element={<div>Página de Registro</div>} />
                <Route path="/documentos" element={<div>Página de Documentos</div>} />

                <Route path="*" element={<div>404 - No Encontrado</div>} />
            </Routes>
        </Router>
    );
}

export default App;