import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportesPage from './pages/ReportesPages.jsx';

function App() {
    return (
        <main>
        <Router>
            <Routes>
                <Route path="/" element={<ReportesPage />} />
            </Routes>
        </Router>
        </main>
    );
}

export default App;