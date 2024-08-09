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

const Signup = () => {
  const [show, setShow] = useState(true);
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Stan dla wiadomości sukcesu
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = ({ currentTarget: input }) => {
    setSignupData({ ...signupData, [input.name]: input.value });
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
              <Button variant="outline-success" onClick={handleShow}>
                ZALOGUJ
              </Button>
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
              <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Jan"
                  onChange={handleChange}
                  value={signupData.firstName}
                />
              </Form.Group>

              <Form.Group controlId="formBasicLastName" className="mt-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Kowalski"
                  onChange={handleChange}
                  value={signupData.lastName}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="jankowalski@gmail.com"
                  onChange={handleChange}
                  value={signupData.email}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="********"
                  onChange={handleChange}
                  value={signupData.password}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3 w-100">
                REJESTRACJA
              </Button>
            </Form>

            <div className="horizontal-divider my-4"></div>

            <div className="text-center">
              <p>Masz już konto?</p>
              <Link to="/login">
                <Button variant="outline-primary" className="w-100">
                  ZALOGUJ
                </Button>
              </Link>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default Signup;
