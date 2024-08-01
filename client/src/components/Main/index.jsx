import { Button, Container, Nav, Navbar, Modal, Form } from "react-bootstrap";
import { useState } from "react";
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
  const [error, setError] = useState("")

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setIsLogin(true);
    setShow(true);
  };

  const switchToRegister = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.message) {
            alert(data.message);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName
        })
      })
        .then(response => {
          console.log('Raw response:', response);
          if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
          }
          return response.json();
        })
        .then(data => {
          console.log('Response JSON:', data);
          if (data.message) {
            alert(data.message);
          }
        })
        .catch(error => {
          console.error('Error:', error.message);
          alert(`Błąd: ${error.message}`);
        });
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
              <Button variant="outline-success" onClick={handleShow}>ZALOGUJ</Button>
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
              <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstName" placeholder="Jan" onChange={handleChange} value={formData.firstName} />
              </Form.Group>

              <Form.Group controlId="formBasicLastName" className="mt-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastName" placeholder="Kowalski" onChange={handleChange} value={formData.lastName} />
              </Form.Group>

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
