import { Decimal } from "@prisma/client/runtime";
import {
  createdTransactionInterface,
  transactionInterface,
  transactionWithDate
} from "../../interfaces/transactionInterface";

const newTransaction: transactionInterface = {
  debitedAccountId: 1,
  creditedAccountId: 2,
  value: new Decimal(10.00)
};

const transactionWithDate: transactionWithDate = {
  debitedAccountId: 1,
  creditedAccountId: 2,
  value: new Decimal(10.00),
  createdAt: '31-05-2022'
};

const createdTransaction: createdTransactionInterface = {
  id: 1,
  debitedAccountId: 1,
  creditedAccountId: 2,
  value: new Decimal(10.00),
  createdAt: '31-05-2022'
}

export default { newTransaction, transactionWithDate, createdTransaction };
