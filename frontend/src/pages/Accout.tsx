import React from 'react';
import { useAppSelector } from '../app/hooks';
import { selectToken } from '../features/token/tokenSlice';
import { selectUser } from '../features/user/userSlice';

const Account: React.FC = () => {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  return(
    <div>
      <p>Mostra token: </p>
      <p>{token}</p>
      <p>{user.id}</p>
    </div>
  );
}

export default Account;