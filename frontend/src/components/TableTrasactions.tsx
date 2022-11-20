import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectToken } from '../features/token/tokenSlice';
import { alterTransaction } from "../features/transactions/transactionSlice";
import { fetchAllUserTransactions } from "../services/fetchApi";

const TableTrasactions = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  // const transactions = (useAppSelector(selectTransaction));
  const [transactions, setTransactions] = useState([]);

  const getUserTransactions = async () => {
    let tokenValue: string;
    if (token === '') {
      tokenValue = localStorage.getItem('token') || '';
    } else {
      tokenValue = token;
    }
    const result = await fetchAllUserTransactions(tokenValue);
    const body = await result.json();
    // dispatch(alterAccountId(bodyAccount.id));
    dispatch(alterTransaction(body));
    setTransactions(body);
  };

  
  const allTransactions = () => {
    console.log(transactions);
    const transactionsUser = transactions.map(({id, createdAt, debitedAccountId, creditedAccountId, value}) => {
      return(
        <tr key={ id }>
          <td>{id}</td>
          <td>{createdAt}</td>
          <td>{debitedAccountId}</td>
          <td>{creditedAccountId}</td>
          <td>{ value }</td>
        </tr>
      );
    });
    return transactionsUser;
  };

  useEffect(() => {
    getUserTransactions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Table responsive="sm">
      <thead>
        <tr>
          <th>id</th>
          <th>Data Lançamento</th>
          <th>Id Conta Pagadora</th>
          <th>Id Conta Recebedora</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        { allTransactions() }
      </tbody>
    </Table>
  );
}

export default TableTrasactions;