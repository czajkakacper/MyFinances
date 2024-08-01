// import { Container, Nav, Navbar } from 'react-bootstrap';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Main from './components/Main';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Navigate replace to="/main" />} />
            <Route path="/main" element={<Main />} />
        </Routes>
    );
}

export default App;