import React from 'react';
import { useAppSelector } from '../app/hooks';
import Header from '../components/Header';
import { selectToken } from '../features/token/tokenSlice';
import { selectUser } from '../features/user/userSlice';

const Account: React.FC = () => {
  const token = useAppSelector(selectToken);
  console.log(token);
  const user = useAppSelector(selectUser);
  console.log(user);
  return(
    <div>
      <Header />
      <p>Mostra token: </p>
      <p>{token}</p>
    </div>
  );
}

export default Account;