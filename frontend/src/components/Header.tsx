import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/user/userSlice';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { selectAccount } from '../features/account/accountSlice';
import '../styles/header.css';

const Header = () => {
  const user = useAppSelector(selectUser);
  // const dispatch = useAppDispatch();
  const account = useAppSelector(selectAccount);
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

  const convertBalance = () => {
    if (typeof account.balance === 'string') {
      return parseFloat(account.balance).toFixed(2);
    }
    return account.balance.toFixed(2);
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" >
      <Container>
        <Navbar.Brand href="#home">Digital-Wallet</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link data-testid="element-navbar-username">
              { getUsername() }
            </Nav.Link>
            <Nav.Link href="#pricing">R$ {convertBalance()}</Nav.Link>
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
  );
};

export default Header;
