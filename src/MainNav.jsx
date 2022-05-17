import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";

export default function MainNav() {

  // Detect React router change of location
  let { pathname: route } = useLocation();

  // Links
  let links = [
    ['Welcome', '/'],
    ['Product List', '/product-list'],
    ['Shopping-cart', '/shopping-cart']
  ];

  return <Navbar fixed="top" bg="dark" variant="dark" expand="lg" className="mb-4">
    <Container>
      <Link className="navbar-brand" to="/">My Shop</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {links.map(([label, to]) =>
            <Link
              key={to} to={to}
              className={`nav-link ${to === route ? 'active' : ''}`}
            >{label}</Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}