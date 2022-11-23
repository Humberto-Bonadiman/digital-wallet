// @ts-check
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCreateUser } from '../services/fetchApi';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import '../styles/register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const isEmailValid = (userEmail: string) => {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexEmail.test(userEmail);
  };

  const checkError = (message: string) => {
    const validEmail = '"username" must be a valid email';
    const validPassword = '"password" must contain at least one number and one uppercase letter';
    const userRegistered = 'User already registered';
    if (message === validEmail) {
      return 'Username precisa ser um e-mail válido!';
    }
    if (message === validPassword) {
      return 'A senha precisa conter pelo menos um número e uma letra maiúscula!';
    }
    if (message === userRegistered) {
      return 'Usuário já registrado!';
    }
  }

  const handleClick = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const result = await fetchCreateUser(username, password);
    const getResult = await result.json();
    const STATUS_CODE_CREATED = 201;
    if (result.status === STATUS_CODE_CREATED) {
      setError(false);
      navigate('/login');
    }
    if (result.status !== STATUS_CODE_CREATED) {
      const messageError = checkError(getResult.message) || '';
      setMessage(messageError);
      setError(true);
    }
  };

  const MIN_LENGTH_PASSWORD = 8;
  const ALERT = (
    <Alert
      variant="danger"
      className="container-sm error text-center mt-1 w-50"
      data-testid="register__alert"
    >
      <p>
        {message}&nbsp;&nbsp;&nbsp;&nbsp;
        <Button onClick={ () => setError(false) } variant="outline-danger">
          X
        </Button>
      </p>
    </Alert>
  );

  return (
    <Container className="container-register">
      <Form
        className="card mt-3 pb-3 pt-1 container-sm w-50"
        style={ { maxWidth: '500px', minWidth: '300px' } }
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label data-testid="register__label-username">Username</Form.Label>
          <Form.Control
            type="email"
            placeholder="email@trybeer.com.br"
            data-testid="register__input-username"
            onChange={ ({ target }) => setUsername(target.value) }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label data-testid="register__label-password">Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="**********"
            data-testid="register__input-password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          data-testid="register__button-register"
          disabled={
            !(isEmailValid(username)
            && password.length >= MIN_LENGTH_PASSWORD)
          }
          className="mt-3"
          onClick={ handleClick }
        >
          Registrar
        </Button>
      </Form>
      <p className="paragraph-login">
        Já possui uma conta?&nbsp;
        <a data-testid="paragraph-login" href="/login">Entrar</a>
      </p>
      { error && ALERT }
    </Container>
  );
};

export default Register;
