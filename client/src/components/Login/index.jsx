import { Button, Container, Nav, Navbar, Modal, Form, FormControl } from "react-bootstrap";
import { useState } from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import "./styles.css";
import "../../App.js";
import "../../index.js";


const Login = () => {
    const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <Modal.Title className="modal-title-center">Zaloguj się</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3 w-100">
                ZALOGUJ
              </Button>
            </Form>

            <div className="horizontal-divider my-4"></div>

            <div className="text-center">
              <p>Nie masz konta?</p>
              <Link to="/register">
                <Button variant="outline-primary" className="w-100">REJESTRACJA</Button>
              </Link>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
    )
};

export default Login;
