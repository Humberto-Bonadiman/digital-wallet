import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Header from '../components/Header';
import TableTrasactions from '../components/TableTrasactions';
import { alterAccountBalance, alterAccountId } from '../features/account/accountSlice';
import { selectToken } from '../features/token/tokenSlice';
import { alterUser, alterUserAccountId, alterUserId, alterUserUsername } from '../features/user/userSlice';
import { fetchFindAccountById, fetchFindUserByUsername } from '../services/fetchApi';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  // const user = useAppSelector(selectUser);
  // const [balance, setBalance] = useState(0);

  const getUser = async () => {
    const value = localStorage.getItem('username') || '';
    const substringValue = value.substring(1, value.length - 1);
    const result = await fetchFindUserByUsername(substringValue);
    const body = await result.json();
    if (body.accountId) {
      console.log(body);
      dispatch(alterUser(body));
      dispatch(alterUserId(body.id));
      dispatch(alterUserUsername(body.username));
      dispatch(alterUserAccountId(body.accountId));
      const resultAccount = await fetchFindAccountById(token, body.accountId);
      const bodyAccount = await resultAccount.json();
      if (bodyAccount.balance) {
        dispatch(alterAccountId(bodyAccount.id));
        dispatch(alterAccountBalance(bodyAccount.balance));
        // setBalance(bodyAccount.balance)
      }
    }
  };

  useEffect(() => {
    getUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <div>
      <Header />
      <Button
        variant="outline-primary"
        type="submit"
        data-testid="common_login__button-transaction"
        onClick={ () => { navigate('/transaction'); } }
      >
        Realizar Transferência
      </Button>
      <TableTrasactions />
    </div>
  );
}

export default Account;