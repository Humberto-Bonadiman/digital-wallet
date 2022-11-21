import { useEffect } from "react";
import { Table } from "react-bootstrap";

interface TransactionI {
  id: number;
  creditedAccountId: number;
  debitedAccountId: number;
  createdAt: string;
  value: number;
}

interface IProps {
  transactions: TransactionI[];
}

const TableTrasactions: React.FC<IProps> = ({ transactions }) => {
  
  const allTransactions = () => {
    if (transactions.length > 0 && Array.isArray(transactions)) {
      const transactionsUser = transactions.map(({
        id,
        createdAt,
        debitedAccountId,
        creditedAccountId,
        value
      }) => {
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
    }
    return [];
  };

  useEffect(() => {
    allTransactions();
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