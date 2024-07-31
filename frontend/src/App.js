// import { Container, Nav, Navbar } from 'react-bootstrap';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
 import Main from './components/Main/App.js';

function App() {
    return (
        <Routes>
            <Route path="/main" element={<Main />} />
            <Route path='/' element={<Navigate replace to="/Main/App.js" />} />
        </Routes>
    );
}

export default App;




// <Routes>
//   <Route path='/' element={<Navigate replace to="/main" />} />
//   <Route path="/signup" element={<Signup />} />
//   <Route path="/main" element={<Main />} />
//   <Route path="/login" element={<Login />} />
// </Routes>