import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TransactionInterface {
  id: number;
  creditedAccountId: number;
  debitedAccountId: number;
  createdAt: string;
  value: number;
}

const initialState: TransactionInterface[] = [
  {
    id: 0,
    creditedAccountId: 0,
    debitedAccountId: 0,
    createdAt: '',
    value: 0,
  }
];

export const transactionSlice = createSlice({
  name: 'Transaction',
  initialState,
  reducers: {
    alterTransaction: (state, action: PayloadAction<TransactionInterface[]>) => {
      state = action.payload;
    }
  }
});

export const { alterTransaction } = transactionSlice.actions;

export const selectTransaction = (state: RootState) => state.transaction;
console.log(selectTransaction);

export default transactionSlice.reducer;