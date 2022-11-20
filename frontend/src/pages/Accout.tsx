import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Header from '../components/Header';
import TableTrasactions from '../components/TableTrasactions';
import { alterAccountBalance } from '../features/account/accountSlice';
import { selectToken } from '../features/token/tokenSlice';
import { alterAccountId } from '../features/user/userSlice';
import { fetchFindAccountById, fetchFindUserByUsername } from '../services/fetchApi';

const Account: React.FC = () => {
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
      <TableTrasactions />
    </div>
  );
}

export default Account;