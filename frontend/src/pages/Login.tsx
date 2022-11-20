import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Figure from 'react-bootstrap/Figure';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Logo from '../images/digital_wallet.png';
import { fetchLogin } from '../services/fetchApi';
import { useAppDispatch } from '../app/hooks';
import { alterToken } from '../features/token/tokenSlice';
import '../styles/login.css'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  // const [message, setMessage] = useState('');

  const isEmailValid = (userEmail: string) => {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexEmail.test(userEmail);
  };

  /* const checkError = (message: string) => {
    const validEmail = '"username" must be a valid email';
    const validPassword = '"password" must contain at least one number and one uppercase letter';
    const userRegistered = 'User already registered';
    if (message === validEmail) {
      return 'Username precisa ser um e-mail válido';
    }
    if (message === validPassword) {
      return 'A senha precisa conter pelo menos um número e uma letra maiúscula';
    }
    if (message === userRegistered) {
      return 'Usuário já registrado';
    }
  } */

  const handleClick = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const result = await fetchLogin(username, password);
    // const getResult = await result.json();
    const POST = 200;
    if (result.status === POST) {
      const body = await result.json();
      dispatch(alterToken(body?.token));
      localStorage.setItem('token', JSON.stringify(body?.token));
      localStorage.setItem('username', JSON.stringify(username));
      navigate('/account');
    }
    if (result.status !== POST) {
      setError(true);
      /* const messageError = checkError(getResult.message) || '';
      setMessage(messageError); */
    }
  };

  const UserIsOn = () => {
    const value = localStorage.getItem('token');
    if (typeof value === 'string') {
      const parse = JSON.parse(value);
      if (parse) {
        dispatch(alterToken(parse));
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(UserIsOn, []);

  const MIN_LENGTH = 8;
  const ALERT = (
    <Alert
      variant="danger"
      className="container-sm error text-center mt-1 w-50"
      data-testid="common_login__element-invalid-username"
    >
      <p>
        Username ou senha incorretos&nbsp;&nbsp;&nbsp;&nbsp;
        <Button onClick={() => setError(false)} variant="outline-danger">
          X
        </Button>
      </p>
    </Alert>
  );

  return (
    <Container className="container-form">
      <Figure className="container-sm text-center">
        <Figure.Image
          width={ 230 }
          alt="Logo"
          src={ Logo }
          className="rounded-3"
        />
      </Figure>
      <Form
        className="card mt-3 pb-3 pt-1 container-sm w-50"
        style={ { maxWidth: '400px', minWidth: '300px' } }
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="email"
            placeholder="joao@email.com.br"
            data-testid="common_login__input-username"
            onChange={ ({ target }) => setUsername(target.value) }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="**********"
            data-testid="common_login__input-password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          data-testid="common_login__button-login"
          disabled={ !(isEmailValid(username) && password.length >= MIN_LENGTH) }
          onClick={ handleClick }
        >
          Entrar
        </Button>
        <br/>
        <Button
          variant="outline-primary"
          type="submit"
          data-testid="common_login__button-register"
          onClick={ () => { navigate('/register'); } }
        >
          Ainda não possuo uma conta
        </Button>
      </Form>
      { error && ALERT }
    </Container>
  );
};

export default Login;
