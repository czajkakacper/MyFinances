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
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Stan dla wiadomości sukcesu
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/main");
  };
  const handleShow = () => setShow(true);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        data
      );
      if (response.data.error) {
        setError(response.data.error);
      } else if (response.data.Status === "Success") {
        navigate("/login");
      } else {
        console.error("Błąd rejestracji: Niepoprawna odpowiedź z serwera");
      }

      console.log(response.data);
    } catch (error) {
      console.error("Błąd podczas rejestracji: " + error.message);
    }
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
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Jan"
                  onChange={handleChange}
                  value={data.firstName}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicLastName" className="mt-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Kowalski"
                  onChange={handleChange}
                  value={data.lastName}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="jankowalski@gmail.com"
                  onChange={handleChange}
                  value={data.email}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="********"
                  onChange={handleChange}
                  value={data.password}
                  required
                />
              </Form.Group>

              <div className="horizontal-divider my-4"></div>
              {error && <div className="alert alert-danger">{error}</div>}

              <Button variant="primary" type="submit" className="mt-3 w-100">
                REJESTRACJA
              </Button>
            </Form>

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
