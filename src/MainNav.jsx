import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function MainNav() {

  // React Router DOM v6 got rid of the NavLink component
  // What is the smartest way to recreate that functionality
  // (adding an active CSS class to the active menu choice)

  return <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
    <Container>
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link className="nav-link" to="/">Welcome</Link>
          <Link className="nav-link" to="/product-list">Product list</Link>
          <Link className="nav-link" to="/shopping-cart">Shopping cart</Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}