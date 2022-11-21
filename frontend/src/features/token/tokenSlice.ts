import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TokenInterface {
  token: string;
}

const initialState: TokenInterface = {
  token: '',
}

export const tokenSlice = createSlice({
  name: 'Token',
  initialState,
  reducers: {
    alterToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  }
});

export const { alterToken } = tokenSlice.actions;

export const selectToken = (state: RootState) => state.token.token;

export default tokenSlice.reducer;