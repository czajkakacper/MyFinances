import {
  Button,
  Container,
  Nav,
  Navbar,
  Modal,
  Form,
  FormControl,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import "../../App.js";
import "../../index.js";

const Main = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [mail, setMail] = useState('');

  //sprawdzamy autoryzacje
  axios.defaults.withCredentials = true;
  useEffect(() => {
      axios.get('http://localhost:3001/api/auth/main')
          .then(res => {
              if (res.data.Status === "Success") {
                  setIsAuth(true);
                  setMail(res.data.mail);
              } else {
                  setIsAuth(false);
                  setMessage(res.data.Error);
              }
          })
          .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
      axios.get('http://localhost:3001/api/auth/logout')
          .then(res => {
              window.location.href = "/main";
          }).catch(err => console.log(err));
  }

  return (
    <div className="App">
      <>
      {isAuth ? (
        <>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
          <Container>
            <h3>
              <Nav.Link href="#">
                <i>My Finances</i>
              </Nav.Link>
            </h3>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
      ) : (
        <>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
          <Container>
            <h3>
              <Nav.Link href="#">
                <i>My Finances</i>
              </Nav.Link>
            </h3>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Link to="/login">
                <Button variant="outline-success" size="lg">
                  ZALOGUJ SIĘ
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline-success" size="lg">
                  ZAREJESTRUJ SIĘ
                </Button>
              </Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
      )}
      </>
    </div>
  );
};

export default Main;
