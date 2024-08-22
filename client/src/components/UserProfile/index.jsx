import { Button, Container, Nav, Navbar, Modal, Form, FormControl, NavDropdown, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import "../../App.js";
import "../../index.js";
import { FaUserLarge } from "react-icons/fa6";

const UserProfile = () => {
    const [error, setError] = useState("")
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState("");
    const [mail, setMail] = useState("");
    const [name, setName] = useState("");
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

    //sprawdzamy autoryzacje
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios
            .get("http://localhost:3001/api/auth/userprofile")
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

    // wylogowanie
    const handleLogout = () => {
        axios
            .get("http://localhost:3001/api/auth/logout")
            .then((res) => {
                window.location.href = "/main";
            })
            .catch((err) => console.log(err));
    };

    // pobranie danych użytkownika
    useEffect(() => {
        axios.get(`http://localhost:3001/api/user/getUserData?email=${mail}`)
            .then(res => {
                if (res.data && res.data.length > 0) {
                    console.log(res.data[0])
                    setData({
                        firstName: res.data[0].name,
                        lastName: res.data[0].surname,
                        email: res.data[0].mail
                    });
                }
            })
            .catch(err => console.log(err));
    }, [mail]);

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    return (
        <>
            {isAuth ? (
                <>
                    <div className="AppAuthenticated">
                        <div className="background-blur"></div> {/* Rozmyte tło */}
                        <div className="overlay"></div> {/* Nakładka */}
                        
                        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar-custom"> {/* Navbar na wierzchu */}
                            <Container>
                                <h3>
                                    <Nav.Link href="/main">
                                        <i>My Finances</i>
                                    </Nav.Link>
                                </h3>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="me-auto"></Nav>
                                    <NavDropdown title={<><FaUserLarge /> Witaj {name}</>} id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#">
                                            Twój Profil
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleLogout}>
                                            <Button variant="danger">
                                                WYLOGUJ
                                            </Button>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>

                        <Container className="container-form">
                            <h1 className="text-center">PROFIL UŻYTKOWNIKA</h1>
                            <Form>
                                <Form.Group controlId="formBasicFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={data.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicLastName" className="mt-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={data.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail" className="mt-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </Form.Group>

                                <div className="horizontal-divider my-4"></div>
                                {error && <div className="alert alert-danger">{error}</div>}

                                <Button variant="success" type="submit" className="mt-3 w-100">
                                    Edytuj dane
                                </Button>
                            </Form>
                        </Container>
                    </div>
                </>
            ) : (
                <>
                </>
            )}
        </>
    );
};

export default UserProfile;
