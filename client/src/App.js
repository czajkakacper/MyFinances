// import { Container, Nav, Navbar } from 'react-bootstrap';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Navigate replace to="/main" />} />
            <Route path="/main" element={<Main />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
    );
}

export default App;