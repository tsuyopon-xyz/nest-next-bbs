import {
  createAsyncThunk,
  type ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import type { AuthState, SignoutResponse } from '../types';
import { signout as _signout } from '../api';

export const signout = createAsyncThunk<
  SignoutResponse,
  undefined,
  {
    state: {
      auth: AuthState;
    };
  }
>(`auth/signout`, async (_, thunkAPI) => {
  const refreshToken = thunkAPI.getState().auth.signin.refreshToken;
  if (!refreshToken) {
    throw new Error('ログインしていません');
  }

  return _signout({ refreshToken });
});

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
          accessToken: null,
          refreshToken: null,
          email: null,
          name: null,
        };
      }
      state.signout.inProgress = false;
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
    });
};
