import {
  createAsyncThunk,
  type ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import type { AuthState, SignoutResponse } from '../types';
import { signout as _signout } from '../api';
import { setHasTokensInCookie } from 'src/utils/localStorage';

export const signout = createAsyncThunk<SignoutResponse>(
  `auth/signout`,
  async () => {
    return _signout();
  }
);

export const buildSignoutExtraReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(signout.pending, (state) => {
      state.signout.inProgress = true;
    })
    .addCase(signout.fulfilled, (state, action) => {
      if (action.payload?.message) {
        state.signout.error = action.payload;
      } else {
        state.signin = {
          ...state.signin,
          id: null,
          email: null,
          name: null,
        };
      }
      state.signout.inProgress = false;
      setHasTokensInCookie(false);
    })
    .addCase(signout.rejected, (state, action) => {
      const { message, code } = action.error;
      state.signout = {
        inProgress: false,
        error: {
          message: message ?? '例外エラー',
          statusCode: code ? parseInt(code) : 0,
        },
      };
      setHasTokensInCookie(false);
    });
};
