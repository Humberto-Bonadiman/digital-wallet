import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface User {
  id: number;
  username: string;
  accountId: number;
}

const initialState: User = {
  id: 0,
  username: '',
  accountId: 0
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    alterId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    alterUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    alterAccountId: (state, action: PayloadAction<number>) => {
      state.accountId = action.payload;
    }
  }
});

export const { alterId, alterUsername, alterAccountId } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
