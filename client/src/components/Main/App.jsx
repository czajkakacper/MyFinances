import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import './App.css';
import '../../App.js';
import '../../index.js';

function App() {
    return (
        <div className="App">
            <>
                <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                    <Container>
                        <h3><i>My Finances</i></h3>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Link to="/">
                            <Button variant="outline-success">ZALOGUJ</Button>
                        </Link>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        </div>
    );
}

export default App;
