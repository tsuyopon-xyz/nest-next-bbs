import {
  createAsyncThunk,
  type ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import type { AuthState, SigninResponse, SigninInput } from '../types';
import { signin as _signin } from '../api';

export const signin = createAsyncThunk<SigninResponse, SigninInput>(
  `auth/signin`,
  async (input) => {
    return _signin(input);
  }
);

export const buildSigninExtraReducer = (
  builder: ActionReducerMapBuilder<AuthState>
) => {
  builder
    .addCase(signin.pending, (state) => {
      state.signin.inProgress = true;
    })
    .addCase(signin.fulfilled, (state, action) => {
      // 型ガードで SigninResponseSuccess / SigninResponseError を判断
      if ('accessToken' in action.payload) {
        state.signin = {
          error: null,
          inProgress: false,
          ...action.payload,
        };
      } else {
        state.signin = {
          error: action.payload,
          inProgress: false,
          accessToken: null,
          refreshToken: null,
          name: null,
          email: null,
        };
      }
    })
    .addCase(signin.rejected, (state, action) => {
      const { message, code } = action.error;
      state.signin = {
        error: {
          message: message ?? '例外エラー',
          statusCode: code ? parseInt(code) : 0,
        },
        inProgress: false,
        accessToken: null,
        refreshToken: null,
        name: null,
        email: null,
      };
    });
};
