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
import checkErrors from '../services/checkErrors';
import '../styles/transaction.css';

const Transaction = () => {
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const [creditedAccount, setCreditedAccount] = useState('');
  const [value, setValue] = useState(0);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const generateTransaction = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const result = await fetchTransaction(token, user.username, creditedAccount, value);
    console.log(result);
    const POST = 201;
    const r = await result.json();
    console.log(r);
    if (result.status === POST) {
      navigate('/account');
    }
    if (result.status !== POST) {
      setError(true);
      const getResult = await result.json();
      console.log(getResult);
      const messageError = checkErrors(getResult.message) || '';
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
              data-testid="transaction-confirm"
            >
              Sim
            </button>
            <button
              data-testid="transaction-deny"
              className="btn btn-primary"
              onClick={ onClose }
            >
              Não
            </button>
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
      data-testid="transaction__error"
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
          <Form.Label
            data-testid="transaction__label-username"
          >
            Username Conta Recebedora
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="joao@email.com"
            data-testid="transaction__username"
            onChange={ ({ target }) => setCreditedAccount(target.value) }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label
            data-testid="transaction__label-value"
          >
            Valor Transferência
          </Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            min="0"
            data-testid="transaction__value"
            id="transaction__value"
            placeholder="Valor em reais (R$)"
            onChange={ ({ target }) => setValue(Number(target.value)) }
          />
        </Form.Group>
        <Button
          data-testid="transaction__button-tranfer"
          id="transaction__button-tranfer"
          variant="primary"
          type="submit"
          onClick={ submit }
        >
          Realizar transferência
        </Button>
        <Button
          variant="outline-primary"
          type="submit"
          className="button-account"
          data-testid="button-account"
          onClick={ () => { navigate('/account'); } }
        >
          Voltar
        </Button>
      </Form>
      { error && ALERT }
    </Container>
  );
}

export default Transaction;