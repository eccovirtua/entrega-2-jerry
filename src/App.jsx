import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportesPage from './pages/ReportesPages.jsx';
import Inicio from './pages/Inicio.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} /> {}
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