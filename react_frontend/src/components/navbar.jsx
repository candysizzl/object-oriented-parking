import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";

const WebsiteNavbar = () => {
  return (
    <>
      <Navbar
        variant="dark"
        expand="lg"
        sticky="top"
        style={{ padding: "40px 100px 20px 40px", backgroundColor: "#5dacbd" }}
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <h3>OO Parking Mall</h3>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/admin">
                ADMIN |
              </Nav.Link>
              <Nav.Link as={Link} to="/user">
                USER
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default WebsiteNavbar;
