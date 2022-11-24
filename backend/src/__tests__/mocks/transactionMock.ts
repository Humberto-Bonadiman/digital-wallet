import { Decimal } from "@prisma/client/runtime";
import {
  createdTransactionInterface,
  transactionInterface,
  transactionWithDate
} from "../../interfaces/transactionInterface";

const newTransactionController = {
  debitedUsername: 'alice@email.com',
  creditedUsername: 'bob@email.com',
  value: new Decimal(10.00)
};

const newTransaction: transactionInterface = {
  debitedAccountId: 1000000,
  creditedAccountId: 1000001,
  value: new Decimal(10.00)
};

const transactionWithDate: transactionWithDate = {
  debitedAccountId: 1000000,
  creditedAccountId: 1000001,
  value: new Decimal(10.00),
  createdAt: '31-05-2022'
};

const createdTransaction: createdTransactionInterface = {
  id: 1,
  debitedAccountId: 1000000,
  creditedAccountId: 1000001,
  value: new Decimal(10.00),
  createdAt: '31-05-2022'
}

const listTransactions: createdTransactionInterface[] = [
  {
    id: 1,
    debitedAccountId: 1000000,
    creditedAccountId: 1000001,
    value: new Decimal(10.00),
    createdAt: '31-05-2022',
  },
  {
    id: 2,
    debitedAccountId: 1000001,
    creditedAccountId: 1000000,
    value: new Decimal(10.00),
    createdAt: '06-06-2022',
  }
]

export default {
  newTransaction,
  newTransactionController,
  transactionWithDate,
  createdTransaction,
  listTransactions
};
