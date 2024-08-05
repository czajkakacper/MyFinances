import { Button, Container, Nav, Navbar, Modal, Form, FormControl } from "react-bootstrap";
import { useState } from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import "./styles.css";
import "../../App.js";
import "../../index.js";

const Main = () => {
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Stan dla wiadomości sukcesu
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setError("");
    setSuccessMessage(""); // Resetowanie wiadomości przy zamknięciu modalu
  };

  const handleShow = () => {
    setIsLogin(true);
    setShow(true);
    setError(""); // Resetowanie błędów przy otwieraniu modalu
    setSuccessMessage(""); // Resetowanie wiadomości sukcesu przy otwieraniu modalu
  };

  const switchToRegister = () => {
    setIsLogin(false);
    setError(""); // Resetowanie błędów przy przełączaniu na rejestrację
    setSuccessMessage(""); // Resetowanie wiadomości sukcesu przy przełączaniu na rejestrację
  };

  const switchToLogin = () => {
    setIsLogin(true);
    setError(""); // Resetowanie błędów przy przełączaniu na logowanie
    setSuccessMessage(""); // Resetowanie wiadomości sukcesu przy przełączaniu na logowanie
  };

  const handleChange = ({ currentTarget: input }) => {
    setFormData({ ...formData, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:3001/api/auth/login' : 'http://localhost:3001/api/auth/register';
    const method = 'POST';
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = isLogin
      ? JSON.stringify({ email: formData.email, password: formData.password })
      : JSON.stringify({ firstName: formData.firstName, lastName: formData.lastName, email: formData.email, password: formData.password });

    try {
      const response = await fetch(url, { method, headers, body });
      const text = await response.text(); // Przeczytaj odpowiedź jako tekst

      console.log('Raw response:', text); // Wyświetl odpowiedź w konsoli

      // Spróbuj sparsować tekst, jeśli jest to JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Niepoprawny format odpowiedzi z serwera:', text);
        throw new Error('Niepoprawny format odpowiedzi z serwera');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Błąd podczas logowania');
      }

      if (data.error) {
        setError(data.error);
        setSuccessMessage(""); // Resetowanie wiadomości sukcesu w przypadku błędu
      } else if (data.Status === 'Success') {
        setSuccessMessage(isLogin ? "Pomyślnie zalogowano." : "Użytkownik został pomyślnie zarejestrowany.");
        setError(""); // Resetowanie błędów w przypadku sukcesu
        if (isLogin) {
          navigate('/main');
        }
      } else {
        console.error('Błąd logowania: Niepoprawna odpowiedź z serwera');
      }

      console.log(data);
    } catch (error) {
      setError(error.message);
      setSuccessMessage(""); // Resetowanie wiadomości sukcesu w przypadku błędu
      console.error('Błąd podczas logowania:', error.message);
    }
  };


  return (
    <div className="App">
      <>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
          <Container>
            <h3>
              <i>My Finances</i>
            </h3>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Link to="/login">
                <Button variant="outline-success" size="lg">ZALOGUJ SIĘ</Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline-success" size="lg">ZAREJESTRUJ SIĘ</Button>
              </Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title-center">
              {isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" placeholder="Jan" onChange={handleChange} value={formData.firstName} />
                  </Form.Group>

                  <Form.Group controlId="formBasicLastName" className="mt-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" placeholder="Kowalski" onChange={handleChange} value={formData.lastName} />
                  </Form.Group>
                </>
              )}

              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="jankowalski@gmail.com" onChange={handleChange} value={formData.email} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="********" onChange={handleChange} value={formData.password} />
              </Form.Group>

              <Button variant="success" type="submit" className="mt-3 w-100">
                {isLogin ? 'ZALOGUJ' : 'ZAREJESTRUJ SIĘ'}
              </Button>
            </Form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

            <div className="horizontal-divider my-4"></div>

            <div className="text-center">
              <p>{isLogin ? 'Nie masz konta?' : 'Masz już konto?'}</p>
              <Button variant="outline-primary" className="w-100" onClick={isLogin ? switchToRegister : switchToLogin}>
                {isLogin ? 'REJESTRACJA' : 'ZALOGUJ SIĘ'}
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default Main;
