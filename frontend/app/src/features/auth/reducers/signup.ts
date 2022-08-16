import {
  createAsyncThunk,
  type ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import type { AuthState, SignupResponse, SignupInput } from '../types';
import { signup as _signup } from '../api';

export const signup = createAsyncThunk<SignupResponse, SignupInput>(
  `auth/signup`,
  async (input) => {
    return _signup(input);
  }
);

export const buildSignupExtraReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(signup.pending, (state) => {
      state.signup.inProgress = true;
    })
    .addCase(signup.fulfilled, (state, action) => {
      if (action.payload?.error) {
        state.signup.error = action.payload;
        state.signup.isSucceeded = false;
      } else {
        state.signup.error = null;
        state.signup.isSucceeded = true;
      }

      state.signup.inProgress = false;
    })
    .addCase(signup.rejected, (state, action) => {
      const { name, message, code } = action.error;
      state.signup.isSucceeded = true;
      state.signup.inProgress = false;
      state.signup.error = {
        error: name ?? '例外エラー',
        message: message ?? '例外エラー',
        statusCode: code ? parseInt(code) : 0,
      };
    });
};
