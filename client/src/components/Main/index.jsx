import { Button, Container, Nav, Navbar, Modal, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import "../../App.js";
import "../../index.js";

const Main = () => {
  const [show, setShow] = useState(false);

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
                <Form.Control type="email" name="email" placeholder="jankowalski@email.com" required/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="*******" required/>
              </Form.Group>

              <Button variant="success" type="submit" className="mt-3 w-100">
                LOG IN
              </Button>
            </Form>

            <div className="horizontal-divider my-4"></div>

            <div className="text-center">
              <p>Nie masz konta?</p>
              <Link to="/register">
                <Button variant="info" className="w-100">CREATE AN ACCOUNT</Button>
              </Link>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default Main;
