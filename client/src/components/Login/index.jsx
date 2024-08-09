import {
  Button,
  Container,
  Nav,
  Navbar,
  Modal,
  Form,
  FormControl,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import "../../App.js";
import "../../index.js";

const Login = () => {
  const [show, setShow] = useState(true);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Stan dla wiadomości sukcesu
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = ({ currentTarget: input }) => {
    setLoginData({ ...loginData, [input.name]: input.value });
  };

  return (
    <div className="App">
      <>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
          <Container>
            <h3>
              <Nav.Link href="/main">
                <i>My Finances</i>
              </Nav.Link>
            </h3>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Link to="/signup">
                <Button variant="outline-success" size="lg">
                  ZAREJESTRUJ SIĘ
                </Button>
              </Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title-center">
              Zaloguj się
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="jankowalski@gmail.com"
                  onChange={handleChange}
                  value={loginData.email}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="********"
                  onChange={handleChange}
                  value={loginData.password}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3 w-100">
                ZALOGUJ
              </Button>
            </Form>

            <div className="horizontal-divider my-4"></div>

            <div className="text-center">
              <p>Nie masz konta?</p>
              <Link to="/signup">
                <Button variant="outline-primary" className="w-100">
                  REJESTRACJA
                </Button>
              </Link>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default Login;
