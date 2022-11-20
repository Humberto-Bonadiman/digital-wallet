import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/user/userSlice';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || '';

  const getUsername = () => {
    if (user.username === '') {
      const parse = JSON.parse(username) || '';
      return parse;
    }
    return user.username;
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div>
      <Navbar expand="sm" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="#">Navbar</Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar expand="lg" bg="dark" variant="dark" className="pt-2 pb-2">
        <Container>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                  data-testid="customer_products__element-navbar-user-full-name"
                >
                  { getUsername() }
                </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link
                data-testid="customer_products__element-navbar-link-logout"
                onClick={ logout }
              >
                Sair
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
