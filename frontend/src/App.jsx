import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportesPage from './pages/ReportesPages.jsx';
import Inicio from './pages/Inicio.jsx';
import Documentos from './pages/Documentos.jsx';
import RegistroPracticas from './pages/RegistroPracticas.jsx';
import Login from './pages/Login.jsx';
import Registrar from './pages/Registrar.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/reportes" element={<ReportesPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registrar" element={<Registrar />} />
                <Route path="/registro" element={<RegistroPracticas />} /> 
                <Route path="/documentos" element={<Documentos/>} />
                <Route path="*" element={<div>404 - No Encontrado</div>} />
            </Routes>
        </Router>
    );
}

export default App;
