import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

import auth from "../services/token";

function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-body-black">
      <Container fluid className="NavBarHome">
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav className="me-auto me-lg-2">
              <Link
                to="/home"
                className="nav-link"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                Accueil
              </Link>
            </Nav>
            {auth.isLoggedIn && auth.getExpiryTime() && auth.loggedAdmin() && (
              <Nav className="me-auto">
                <Link
                  to="/admin"
                  className="nav-link"
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  Admin
                </Link>
              </Nav>
            )}
            <Nav className="me-auto">
              <Link
                to="/"
                onClick={handleLogout}
                className="nav-link"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                Se déconnecter
              </Link>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
