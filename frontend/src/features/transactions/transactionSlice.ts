import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Transaction {
  id: number;
  creditedAccountId: number;
  debitedAccountId: number;
  createdAt: string;
  value: number;
}

const initialState: Transaction[] = [];

/* const initialState: Transaction[] = [];
const user = (state = initialState, action) => {
  switch (action.type) {
  case 'SAVE_LOGIN_DATA':
    return { ...state, email: action.payload.email };
  default:
    return state;
  }
}; */

export const transactionSlice = createSlice({
  name: 'Transaction',
  initialState,
  reducers: {
    alterTransaction: (state, action: PayloadAction<Transaction[]>) => {
      state = action.payload;
    }
  }
});

export const { alterTransaction } = transactionSlice.actions;

export const selectTransaction = (state: RootState) => state.transaction;

export default transactionSlice.reducer;