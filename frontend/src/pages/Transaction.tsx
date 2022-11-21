import { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectToken } from '../features/token/tokenSlice';
import { selectUser } from '../features/user/userSlice';
import { fetchTransaction } from '../services/fetchApi';
import '../styles/transaction.css';

const Transaction = () => {
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const [creditedAccount, setCreditedAccount] = useState('');
  const [value, setValue] = useState(0);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const checkError = (message: string) => {
    const tokenNotFound = 'Token not found';
    const invalidToken = 'Expired or invalid token';
    const usernameRequired = '"debitedUsername" and "creditedUsername" are required';
    const usernameEqual = '"debitedUsername" and "creditedUsername" cannot be equals';
    const userRegistered = 'All users must be registered';
    const valueBeyond = 'It is not possible to transfer beyond the balance';
    const valueRequired = '"value" is required';
    if (message === tokenNotFound) {
      return 'Token não encontrado!';
    }
    if (message === invalidToken) {
      return 'Token inválido!';
    }
    if (message === usernameRequired || message === usernameEqual) {
      return 'Username da conta recebedora está inválido!';
    }
    if (message === userRegistered) {
      return 'Usuário não registrado!';
    }
    if (message === valueBeyond) {
      return 'Não é possível transferir além do saldo!';
    }
    if (message === valueRequired) return 'O valor é obrigatório!';
  }

  const generateTransaction = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const result = await fetchTransaction(token, user.username, creditedAccount, value);
    const POST = 201;
    if (result.status === POST) {
      navigate('/account');
    }
    if (result.status !== POST) {
      setError(true);
      const getResult = await result.json();
      console.log(getResult);
      const messageError = checkError(getResult.message) || '';
      setMessage(messageError);
    }
  }

  const submit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h3>Confirme para realizar a transferência</h3>
            <p>Você tem certeza que deseja transferir R$ {value} para {creditedAccount}</p>
            <button
              className="btn btn-primary"
              onClick={ async () => {
                generateTransaction(event);
                onClose();
                }
              }
            >
              Sim
            </button>
            <button className="btn btn-primary" onClick={ onClose }>Não</button>
            <p>Caso a operação ocorra com sucesso você será redirecionado para a página principal</p>
          </div>
        );
      }
    });
  };

  const ALERT = (
    <Alert
      variant="danger"
      className="container-sm error text-center mt-1 w-50"
      data-testid="common_login__element-invalid-username"
    >
      <p>
        {message}&nbsp;&nbsp;&nbsp;&nbsp;
        <Button onClick={ () => setError(false) } variant="outline-danger">
          X
        </Button>
      </p>
    </Alert>
  );

  return(
    <Container className="transaction-form">
      <Form className="form">
        <Form.Group className="mb-3">
          <Form.Label>Username Conta Recebedora</Form.Label>
          <Form.Control
            type="email"
            placeholder="joao@email.com"
            onChange={ ({ target }) => setCreditedAccount(target.value) }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Valor Transferência</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            min="0"
            placeholder="Valor em reais (R$)"
            onChange={ ({ target }) => setValue(Number(target.value)) }
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={ submit }>
          Realizar transferência
        </Button>
      </Form>
      { error && ALERT }
    </Container>
  );
}

export default Transaction;