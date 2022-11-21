import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AccountInterface {
  id: number;
  balance: number;
}

const initialState: AccountInterface = {
  id: 0,
  balance: 0
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    alterAccountId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    alterAccountBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    }
  }
});

export const { alterAccountId, alterAccountBalance } = accountSlice.actions;

export const selectAccount = (state: RootState) => state.account;

export default accountSlice.reducer;