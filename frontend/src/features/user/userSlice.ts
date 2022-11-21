import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UserInterface {
  id: number;
  username: string;
  accountId: number;
}

const initialState: UserInterface = {
  id: 0,
  username: '',
  accountId: 0
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    alterUser: (state, action: PayloadAction<UserInterface>) => {
      state = action.payload;
    },
    alterUserId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    alterUserUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    alterUserAccountId: (state, action: PayloadAction<number>) => {
      state.accountId = action.payload;
    },
  }
});

export const {
  alterUser,
  alterUserId,
  alterUserUsername,
  alterUserAccountId
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
