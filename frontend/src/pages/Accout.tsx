// @ts-check
import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Header from '../components/Header';
import TableTrasactions from '../components/TableTrasactions';
import { alterAccountBalance, alterAccountId } from '../features/account/accountSlice';
import { selectToken } from '../features/token/tokenSlice';
import { alterTransaction } from '../features/transactions/transactionSlice';
import { alterUser, alterUserAccountId, alterUserId, alterUserUsername } from '../features/user/userSlice';
import {
  fetchAllUserTransactions,
  fetchFilterTransactions,
  fetchFindAccountById,
  fetchFindUserByUsername
} from '../services/fetchApi';
import '../styles/account.css';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const [checkDebited, setCheckDebited] = useState(false);
  const [checkCredited, setCheckCredited] = useState(false);
  const [date, setDate] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const alterDateFormat = () => {
    if (date === '') return undefined;
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    return `${day}-${month}-${year}`;
  }

  const getAllUserTransactions = async () => {
    let tokenValue: string;
    if (token === '') {
      tokenValue = localStorage.getItem('token') || '';
    } else {
      tokenValue = token;
    }
    const result = await fetchAllUserTransactions(tokenValue);
    const body = await result.json();
    setTransactions(body);
    dispatch(alterTransaction(body));
    localStorage.setItem('transactions', JSON.stringify(body));
  }

  const getFilterTransactions = async () => {
    let tokenValue: string;
    if (token === '') {
      tokenValue = localStorage.getItem('token') || '';
    } else {
      tokenValue = token;
    }
    const result = await fetchFilterTransactions(tokenValue, checkDebited, checkCredited, alterDateFormat());
    const body = await result.json();
    setTransactions(body);
    dispatch(alterTransaction(body));
    localStorage.setItem('transactions', JSON.stringify(body));
  };

  const filterTable = () => {
    if (!checkCredited && !checkDebited && date === '') {
      setError(true);
    } else {
      getFilterTransactions();
    }
  };

  const buttonAllTransactions = (
    <Button
      variant="outline-primary"
      type="submit"
      data-testid="account__button-transaction"
      onClick={ () => {
        getAllUserTransactions();
      } }
    >
      Todas as transferências
    </Button>
  );

  const buttonShowTable = (
    <Button
      variant="outline-primary"
      type="submit"
      data-testid="account__show-transactions"
      onClick={ () => {
        setTimeout(() => {
          setShowTable(true);
        }, 200);
      } }
    >
      Mostrar transferências
    </Button>
  );

  const buttonHideTable = (
    <Button
      variant="outline-primary"
      type="submit"
      data-testid="account__hide-transactions"
      onClick={ () => {
        setTimeout(() => {
          setShowTable(false);
        }, 200);
      } }
    >
      Ocultar transferências
    </Button>
  );

  const ALERT = (
    <Alert
      variant="danger"
      className="container-sm error text-center mt-1 w-50"
      data-testid="account__element-invalid-checkbox"
    >
      <p>
        Pelo menos um dos checkboxs deve estar marcado&nbsp;&nbsp;&nbsp;&nbsp;
        <Button onClick={() => setError(false)} variant="outline-danger">
          X
        </Button>
      </p>
    </Alert>
  );

  const filterContainer = (
    <Container className="filter-container">
      <Form.Check 
        type="checkbox"
        id="filter-debited-account"
        label="Filtrar pela conta debitada"
        onClick={ () => { setCheckDebited(!checkDebited); } }
      />
      <Form.Check 
        type="checkbox"
        id="filter-credited-account"
        label="Filtrar pela conta creditada"
        onClick={ () => { setCheckCredited(!checkCredited); } }
      />
      <Form.Group>
        <label
          id="filter-data-label"
          htmlFor="date"
        >
          Data:&nbsp;
        </label>
        <input
          type="date"
          id="date"
          data-testid="filter-data-transaction"
          name="date"
          onChange={ ({ target }) => setDate(target.value) }
        />
      </Form.Group>
      <Button
        variant="outline-primary"
        type="submit"
        data-testid="account__button-filter"
        onClick={ () => { filterTable(); } }
      >
        Filtrar dados
      </Button>
    </Container>
  );

  useEffect(() => {
    const getUser = async () => {
      const value = localStorage.getItem('username') || '';
      const substringValue = value.substring(1, value.length - 1);
      const result = await fetchFindUserByUsername(substringValue);
      setTimeout(() => {
        navigate('/account');
      }, 1000);
      const body = await result.json();
      if (body.accountId) {
        dispatch(alterUser(body));
        dispatch(alterUserId(body.id));
        dispatch(alterUserUsername(body.username));
        dispatch(alterUserAccountId(body.accountId));
        const resultAccount = await fetchFindAccountById(token, body.accountId);
        const bodyAccount = await resultAccount.json();
        if (bodyAccount.balance) {
          dispatch(alterAccountId(bodyAccount.id));
          dispatch(alterAccountBalance(bodyAccount.balance));
        }
      }
    };
    setTimeout(() => {
      getUser();
      getAllUserTransactions();
    }, 1000);
    // getUser();
    //getAllUserTransactions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token]);

  return(
    <div>
      <Header />
      <Container className="buttons-container">
        <Button
          variant="outline-primary"
          type="submit"
          data-testid="account__button-navigate"
          onClick={ () => { navigate('/transaction'); } }
        >
          Realizar Transferência
        </Button>
        { !showTable && buttonShowTable }
        { showTable && buttonHideTable }
        { showTable && buttonAllTransactions }
      </Container>
      { showTable && filterContainer }
      { error && ALERT }
      { showTable && <TableTrasactions transactions={ transactions } /> }
    </div>
  );
}

export default Account;