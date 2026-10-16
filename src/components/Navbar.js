import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function LibraryNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Library App</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/upload">Author</Nav.Link>
          <Nav.Link as={Link} to="/reader">Reader</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default LibraryNavbar;