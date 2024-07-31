import { Container, Nav, Navbar } from 'react-bootstrap';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import Main from './components/Main';

function App() {
    return (
        <div className="App">
            <>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </>
        </div>
    );
}

export default App;




// <Routes>
//   <Route path='/' element={<Navigate replace to="/main" />} />
//   <Route path="/signup" element={<Signup />} />
//   <Route path="/main" element={<Main />} />
//   <Route path="/login" element={<Login />} />
// </Routes>