import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = (userEmail: string) => {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexEmail.test(userEmail);
  };

  const handleClick = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    /* const result = await fetchApiRegister(email, name, password);
    const ERROR = 401;
    if (result.status === ERROR) {
      setError(true);
    }
    const STATUS_CODE_OK = 200;
    if (result.status === STATUS_CODE_OK) {
      setError(false);
      navigate('/login');
    } */
  };

  const MIN_LENGTH_PASSWORD = 5;
  const ALERT = (
    <Alert
      key="danger"
      variant="danger"
      className="container-sm error text-center mt-3 w-50"
      data-testid="common_register__element-invalid_register"
      style={ { maxWidth: '400px', minWidth: '300px' } }
      onClose={ () => setError(false) }
      dismissible
    >
      Este e-mail já está em uso.
    </Alert>
  );

  return (
    <Container style={ { marginTop: '100px' } }>
      <Form
        className="card mt-3 pb-3 pt-1 container-sm w-50"
        style={ { maxWidth: '500px', minWidth: '300px' } }
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="email"
            placeholder="email@trybeer.com.br"
            data-testid="common_register__input-username"
            onChange={ ({ target }) => setUsername(target.value) }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="**********"
            data-testid="common_register__input-password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          data-testid="common_register__button-register"
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
      <p style={ { margin: 'auto', maxWidth: '240px' } }>
        Já possui uma conta?&nbsp;
        <a href="/login">Entrar</a>
      </p>
      { error && ALERT }
    </Container>
  );
};

export default Register;
