import { Decimal } from "@prisma/client/runtime";

export interface transactionInterface {
  debitedAccountId: number,
  creditedAccountId: number,
  value: Decimal
}

export interface transactionWithDate extends transactionInterface {
  createdAt: string
}

export interface createdTransactionInterface extends transactionInterface {
  id: number,
  createdAt: string
}