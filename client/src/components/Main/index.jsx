import {
  Button,
  Container,
  Nav,
  Navbar,
  Modal,
  Form,
  FormControl,
  NavDropdown 
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import "../../App.js";
import "../../index.js";
import { FaUserLarge } from "react-icons/fa6";

const Main = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");


  //sprawdzamy autoryzacje
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/main")
      .then((res) => {
        if (res.data.Status === "Success") {
          setIsAuth(true);
          setMail(res.data.mail); //email
          setName(res.data.name); //name
        } else {
          setIsAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:3001/api/auth/logout")
      .then((res) => {
        window.location.href = "/main";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <>
        {isAuth ? ( //zalogowany
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
                  <NavDropdown title={<><FaUserLarge /> Witaj {name}</>} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Ustawienia
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      <Button variant="danger">
                        WYLOGUJ
                      </Button>
                    </NavDropdown.Item>
                  </NavDropdown>
                  {/* <Button variant="danger" onClick={handleLogout}>
                    WYLOGUJ
                  </Button> */}
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </>
        ) : (
          // niezalogowany
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
        ;
      </>
    </div>
  );
};

export default Main;
