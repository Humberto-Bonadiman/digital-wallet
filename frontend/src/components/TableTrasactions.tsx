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
      }, index) => {
        return(
          <tr key={ id }>
            <td data-testid={`table-id-${index + 1}`}>{id}</td>
            <td data-testid={`table-created-at-${index + 1}`}>{createdAt}</td>
            <td data-testid={`table-debited-account-id-${index + 1}`}>{debitedAccountId}</td>
            <td data-testid={`table-credited-account-id-${index + 1}`}>{creditedAccountId}</td>
            <td data-testid={`table-value-${index + 1}`}>{ value }</td>
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
    <Table data-testid="account-transition-table" responsive="sm">
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